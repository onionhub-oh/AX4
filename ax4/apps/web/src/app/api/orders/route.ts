import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { Order } from "@ax4/contracts";
import { productRepository } from "@ax4/db";
import { calculateOrder } from "@ax4/domain";
import { cartDetails, parseCart } from "@/lib/cart";
import { parseOrders } from "@/lib/orders";

const schema = z.object({ name: z.string().min(2).max(40), phone: z.string().min(9).max(20), address: z.string().min(5).max(200), paymentMethod: z.literal("mock-card") });

export async function POST(request: NextRequest) {
  const form = Object.fromEntries(await request.formData());
  const parsed = schema.safeParse(form);
  if (!parsed.success) return NextResponse.json({ error: "주문자와 배송지 정보를 확인해 주세요." }, { status: 400 });
  const lines = parseCart(request.cookies.get("ax4_cart")?.value);
  const details = cartDetails(lines, await productRepository.list());
  if (details.length === 0) return NextResponse.redirect(new URL("/cart", request.url), 303);
  const totals = calculateOrder(details.map((item) => ({ product: item.product, quantity: item.quantity })));
  const id = crypto.randomUUID();
  const koreaDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul", year: "2-digit", month: "2-digit", day: "2-digit" }).format(new Date()).replaceAll("-", "");
  const order: Order = { id, number: `AX4-${koreaDate}-${id.slice(0,4).toUpperCase()}`, status: "paid", createdAt: new Date().toISOString(), draft: { ...totals, lines }, tracking: { carrier: "CJ대한통운 (샘플)", number: "123456789012", eta: "2026-09-06" } };
  const orders = [order, ...parseOrders(request.cookies.get("ax4_orders")?.value)].slice(0, 10);
  const response = NextResponse.redirect(new URL(`/orders/${id}`, request.url), 303);
  response.cookies.set("ax4_orders", JSON.stringify(orders), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30, path: "/" });
  response.cookies.set("ax4_cart", "[]", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30, path: "/" });
  return response;
}
