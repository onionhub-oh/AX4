import { NextResponse } from "next/server";
import { z } from "zod";

const eventNames = ["search_submitted", "ai_session_started", "ai_requirement_confirmed", "ai_recommendation_viewed", "recommendation_reason_opened", "ai_recommendation_refined", "product_viewed", "product_compared", "add_to_cart", "checkout_started", "payment_completed", "payment_failed", "order_cancelled", "return_requested", "ai_feedback_submitted"] as const;
const schema = z.object({ name: z.enum(eventNames), properties: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).default({}) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "허용되지 않은 분석 이벤트입니다." }, { status: 400 });
  // Supabase 연결 후 동의 범위에 따라 익명 세션 기반 analytics_events에 기록한다.
  return NextResponse.json({ accepted: true, provider: process.env.AX4_DATA_PROVIDER ?? "mock" }, { status: 202 });
}
