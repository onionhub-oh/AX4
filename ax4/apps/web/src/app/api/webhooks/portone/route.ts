import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.PORTONE_WEBHOOK_SECRET || !process.env.PORTONE_API_SECRET) return NextResponse.json({ error: "PortOne 연동 전입니다." }, { status: 503 });
  // 실제 활성화 시 PortOne V2의 검증 라이브러리/공식 예제로 서명을 검증하고,
  // 결제 단건 조회 금액과 AX4 주문 금액을 대조한 뒤 멱등하게 상태를 전이한다.
  const event = await request.json().catch(() => null);
  if (!event) return NextResponse.json({ error: "잘못된 payload입니다." }, { status: 400 });
  return NextResponse.json({ accepted: true, processing: "queue" }, { status: 202 });
}
