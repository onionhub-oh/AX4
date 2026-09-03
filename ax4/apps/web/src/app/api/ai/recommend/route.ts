import { NextResponse } from "next/server";
import { z } from "zod";
import { productRepository } from "@ax4/db";
import { getRecommendationProvider } from "@/server/ai/provider";

const schema = z.object({ query: z.string().trim().min(3).max(500) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "검색 조건을 3자 이상 입력해 주세요." }, { status: 400 });
  const products = await productRepository.list();
  const recommendations = await getRecommendationProvider().recommend(parsed.data.query, products);
  return NextResponse.json({ provider: process.env.AX4_AI_PROVIDER ?? "mock", promptVersion: "ax4-recommend-v1", recommendations, generatedAt: new Date().toISOString() });
}
