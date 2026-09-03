import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { preparePayment } from "@/server/payments/portone";

const schema = z.object({ orderId: z.string().uuid() });

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "유효한 주문 ID가 필요합니다." }, { status: 400 });
  try { return NextResponse.json(preparePayment(parsed.data.orderId)); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "결제 준비에 실패했습니다." }, { status: 503 }); }
}
