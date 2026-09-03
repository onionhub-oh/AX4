import { cookies } from "next/headers";
import Link from "next/link";
import { formatWon } from "@ax4/domain";
import { parseOrders } from "@/lib/orders";
import { PageHeading } from "@/components/page-heading";
import { OrderActionButton } from "@/components/order-action-button";
import { ChevronRight, Heart, MapPin, Settings2 } from "lucide-react";

const statusLabel = { payment_pending: "결제 대기", paid: "결제 완료", preparing: "상품 준비", shipped: "배송 중", delivered: "배송 완료", cancelled: "취소 완료", return_requested: "반품 접수" };

export default async function AccountPage() {
  const store = await cookies();
  const orders = parseOrders(store.get("ax4_orders")?.value);
  const isSignedIn = Boolean(store.get("ax4_session"));
  return (
    <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
      <PageHeading eyebrow="MY AX4" title={isSignedIn ? "안녕하세요, 러너님." : "나의 러닝 기록"} description={isSignedIn ? "주문과 배송, 반품 상태를 한곳에서 확인하세요." : "현재는 게스트 모드입니다. Supabase Auth 연결 전에도 구매 흐름을 검증할 수 있어요."} action={!isSignedIn && <Link href="/login" className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white">로그인 데모</Link>} />
      <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
        <nav className="h-fit rounded-[24px] bg-white p-3 text-sm font-bold"><Link className="flex items-center justify-between rounded-2xl bg-[#efeee8] p-4" href="/account">주문 내역 <ChevronRight size={15} /></Link><span className="mt-1 flex items-center gap-3 p-4 text-black/45"><Heart size={17} />찜 목록 <small className="ml-auto">P1</small></span><span className="flex items-center gap-3 p-4 text-black/45"><MapPin size={17} />배송지 관리 <small className="ml-auto">연동 후</small></span><span className="flex items-center gap-3 p-4 text-black/45"><Settings2 size={17} />계정 설정 <small className="ml-auto">연동 후</small></span></nav>
        <section><div className="flex items-center justify-between"><h2 className="text-2xl font-black">최근 주문</h2><span className="text-xs text-[var(--muted)]">{orders.length}건</span></div>{orders.length === 0 ? <div className="mt-5 rounded-[26px] border border-dashed border-black/15 py-20 text-center"><p className="font-bold">최근 주문이 없어요.</p><Link href="/shop" className="mt-4 inline-block text-sm underline">첫 상품 둘러보기</Link></div> : <div className="mt-5 grid gap-4">{orders.map((order) => <article key={order.id} className="rounded-[24px] bg-white p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs text-[var(--muted)]">{new Date(order.createdAt).toLocaleDateString("ko-KR")} · {order.number}</p><p className="mt-2 text-lg font-black">{statusLabel[order.status]}</p></div><strong>{formatWon(order.draft.total)}</strong></div><div className="mt-5 flex flex-wrap gap-2 border-t border-black/10 pt-4"><Link href={`/orders/${order.id}`} className="rounded-full bg-black px-4 py-2 text-xs font-bold text-white">상세 보기</Link>{["paid", "preparing"].includes(order.status) && <OrderActionButton orderId={order.id} action="cancel">주문 취소</OrderActionButton>}{["shipped", "delivered"].includes(order.status) && <OrderActionButton orderId={order.id} action="return">반품 신청</OrderActionButton>}</div></article>)}</div>}</section>
      </div>
    </div>
  );
}
