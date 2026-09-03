import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { parseOrders } from "@/lib/orders";

const schema = z.object({ action: z.enum(["cancel", "return"]) });

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "지원하지 않는 요청입니다." }, { status: 400 });
  const orders = parseOrders(request.cookies.get("ax4_orders")?.value);
  const { id } = await params;
  const order = orders.find((candidate) => candidate.id === id);
  if (!order) return NextResponse.json({ error: "주문을 찾을 수 없습니다." }, { status: 404 });
  if (parsed.data.action === "cancel" && ["shipped", "delivered", "return_requested"].includes(order.status)) return NextResponse.json({ error: "배송 시작 후에는 반품으로 접수해 주세요." }, { status: 409 });
  order.status = parsed.data.action === "cancel" ? "cancelled" : "return_requested";
  const response = NextResponse.json({ ok: true, status: order.status });
  response.cookies.set("ax4_orders", JSON.stringify(orders), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30, path: "/" });
  return response;
}
