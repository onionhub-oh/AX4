import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "ok", service: "ax4-web", integrations: { data: process.env.AX4_DATA_PROVIDER ?? "mock", ai: process.env.AX4_AI_PROVIDER ?? "mock", payment: process.env.AX4_PAYMENT_PROVIDER ?? "mock" } });
}
