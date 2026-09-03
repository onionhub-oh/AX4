"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Tool = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
  execute(input: unknown): Promise<unknown>;
};

declare global {
  interface Document {
    readonly modelContext?: { registerTool(tool: Tool, options?: { signal?: AbortSignal }): void | Promise<void> };
  }
}

export function WebMcpTools() {
  const router = useRouter();
  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();

    const register = async () => {
      await context.registerTool({
        name: "find_running_products",
        title: "러닝 상품 찾기",
        description: "목적, 예산, 발볼 같은 조건으로 AX4의 재고 상품을 검색하고 최대 네 개 후보를 반환합니다.",
        inputSchema: { type: "object", properties: { query: { type: "string", minLength: 3, maxLength: 500 } }, required: ["query"], additionalProperties: false },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
        async execute(input) {
          const query = typeof input === "object" && input && "query" in input ? String(input.query) : "";
          if (query.trim().length < 3) throw new Error("query는 3자 이상이어야 합니다.");
          const response = await fetch("/api/ai/recommend", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query }) });
          if (!response.ok) throw new Error("상품 검색에 실패했습니다.");
          const data = await response.json();
          return { recommendations: data.recommendations.map((item: { product: { id: string; name: string; price: number }; score: number; reasons: string[] }) => ({ id: item.product.id, name: item.product.name, price: item.product.price, score: item.score, reason: item.reasons[0] })) };
        },
      }, { signal: lifecycle.signal });

      await context.registerTool({
        name: "stage_cart_item",
        title: "장바구니에 상품 담기",
        description: "상품과 사이즈, 수량을 장바구니에 담아 사용자의 최종 주문 검토를 준비합니다. 결제는 실행하지 않습니다.",
        inputSchema: { type: "object", properties: { productId: { type: "string" }, size: { type: "number", minimum: 220, maximum: 320 }, quantity: { type: "integer", minimum: 1, maximum: 5 } }, required: ["productId", "size", "quantity"], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        async execute(input) {
          const body = input as { productId?: unknown; size?: unknown; quantity?: unknown };
          if (typeof body.productId !== "string" || typeof body.size !== "number" || !Number.isInteger(body.quantity) || Number(body.quantity) < 1 || Number(body.quantity) > 5) throw new Error("상품, 사이즈, 수량을 올바르게 입력해 주세요.");
          const response = await fetch("/api/cart", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
          if (!response.ok) throw new Error("장바구니 저장에 실패했습니다.");
          router.refresh();
          return { staged: true, productId: body.productId, size: body.size, quantity: body.quantity, next: "/cart", requiresUserApproval: true };
        },
      }, { signal: lifecycle.signal });
    };
    void register().catch(() => undefined);
    return () => lifecycle.abort();
  }, [router]);
  return null;
}
