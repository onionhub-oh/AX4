import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { productRepository } from "@ax4/db";

const schema = z.object({ productId: z.string(), paused: z.boolean() });

export async function PATCH(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  if (!(await productRepository.findByIds([parsed.data.productId])).length) return NextResponse.json({ error: "상품을 찾을 수 없습니다." }, { status: 404 });
  let pausedIds: string[] = [];
  try { pausedIds = JSON.parse(request.cookies.get("ax4_admin_paused")?.value ?? "[]"); } catch {}
  pausedIds = parsed.data.paused ? Array.from(new Set([...pausedIds, parsed.data.productId])) : pausedIds.filter((id) => id !== parsed.data.productId);
  const response = NextResponse.json({ ok: true, paused: parsed.data.paused });
  response.cookies.set("ax4_admin_paused", JSON.stringify(pausedIds), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30, path: "/" });
  return response;
}
