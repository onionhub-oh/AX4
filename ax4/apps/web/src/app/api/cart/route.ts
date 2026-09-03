import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { productRepository } from "@ax4/db";
import { parseCart } from "@/lib/cart";

const schema = z.object({ productId: z.string().min(1), size: z.coerce.number().int().min(220).max(320), quantity: z.coerce.number().int().min(1).max(5) });

export async function POST(request: NextRequest) {
  const isJson = request.headers.get("content-type")?.includes("application/json");
  const input = isJson ? await request.json().catch(() => null) : Object.fromEntries(await request.formData());
  const parsed = schema.safeParse(input);
  if (!parsed.success) return NextResponse.json({ error: "상품 옵션이 올바르지 않습니다." }, { status: 400 });
  const product = (await productRepository.findByIds([parsed.data.productId]))[0];
  if (!product || !product.sizes.includes(parsed.data.size) || product.stock < parsed.data.quantity) return NextResponse.json({ error: "선택한 상품 또는 재고를 확인해 주세요." }, { status: 409 });
  const cart = parseCart(request.cookies.get("ax4_cart")?.value);
  const existing = cart.find((line) => line.productId === parsed.data.productId && line.size === parsed.data.size);
  if (existing) existing.quantity = Math.min(existing.quantity + parsed.data.quantity, 5);
  else cart.push(parsed.data);
  const response = isJson ? NextResponse.json({ ok: true, lines: cart.length, requiresUserApproval: true }) : NextResponse.redirect(new URL("/cart", request.url), 303);
  response.cookies.set("ax4_cart", JSON.stringify(cart), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30, path: "/" });
  return response;
}

export async function DELETE(request: NextRequest) {
  const { productId, size } = await request.json().catch(() => ({}));
  const cart = parseCart(request.cookies.get("ax4_cart")?.value).filter((line) => !(line.productId === productId && line.size === Number(size)));
  const response = NextResponse.json({ ok: true, lines: cart.length });
  response.cookies.set("ax4_cart", JSON.stringify(cart), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30, path: "/" });
  return response;
}
