import type { OrderDraft, Product, RecommendationRequest, RecommendedProduct } from "@ax4/contracts";

export function formatWon(value: number) {
  return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(value);
}

export function calculateOrder(lines: Array<{ product: Product; quantity: number }>): OrderDraft {
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const deliveryFee = subtotal >= 70_000 || subtotal === 0 ? 0 : 3_000;
  return {
    lines: [],
    subtotal,
    deliveryFee,
    discount: 0,
    total: subtotal + deliveryFee,
  };
}

function parseBudget(query: string) {
  const match = query.match(/(\d{1,3})\s*만\s*원/);
  return match ? Number(match[1]) * 10_000 : undefined;
}

export function recommendProducts(products: Product[], request: RecommendationRequest): RecommendedProduct[] {
  const normalized = request.query.toLowerCase();
  const budget = request.budget ?? parseBudget(normalized);
  const wantsWide = request.width === "와이드" || /발볼|넓|와이드/.test(normalized);
  const wantsCushion = /쿠션|무릎|편안|충격/.test(normalized);
  const wantsRace = /대회|레이싱|기록|빠르|10km|하프/.test(normalized);
  const wantsTrail = /트레일|산|비포장/.test(normalized);

  return products
    .filter((product) => product.stock > 0 && (!budget || product.price <= budget * 1.15))
    .map((product) => {
      let score = 60;
      const reasons: string[] = [];
      if (!budget || product.price <= budget) { score += 10; reasons.push("예산 범위 안에서 선택할 수 있어요"); }
      if (wantsWide && product.width === "와이드") { score += 14; reasons.push("발볼이 넉넉한 와이드 핏이에요"); }
      if (wantsCushion && ["높음", "최상"].includes(product.cushion)) { score += 14; reasons.push("충격을 부드럽게 받아주는 쿠션이 강점이에요"); }
      if (wantsRace && product.uses.some((use) => /템포|레이스|10km/.test(use))) { score += 12; reasons.push("10km 훈련과 기록 도전에 모두 활용하기 좋아요"); }
      if (wantsTrail && product.surfaces.includes("트레일")) { score += 18; reasons.push("비포장 노면에 맞는 접지력을 갖췄어요"); }
      if (reasons.length === 0) reasons.push(product.tagline);
      const caution = wantsWide && product.width === "슬림" ? "발볼이 넓다면 반 사이즈 업 또는 다른 후보를 권해요." : product.cons[0];
      return { product, score: Math.min(score, 98), reasons: reasons.slice(0, 3), caution };
    })
    .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating)
    .slice(0, 4);
}
