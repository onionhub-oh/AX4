export interface PaymentPreparation {
  paymentId: string;
  storeId?: string;
  channelKey?: string;
  mock: boolean;
}

export function preparePayment(orderId: string): PaymentPreparation {
  const live = process.env.AX4_PAYMENT_PROVIDER === "portone";
  if (live && (!process.env.NEXT_PUBLIC_PORTONE_STORE_ID || !process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY || !process.env.PORTONE_API_SECRET)) throw new Error("PortOne 필수 환경변수가 누락되었습니다.");
  return { paymentId: `ax4_${orderId}_${crypto.randomUUID()}`, storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID, channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY, mock: !live };
}
