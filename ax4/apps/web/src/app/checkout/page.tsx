import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { productRepository } from "@ax4/db";
import { calculateOrder, formatWon } from "@ax4/domain";
import { cartDetails, parseCart } from "@/lib/cart";
import { PageHeading } from "@/components/page-heading";
import { CreditCard, LockKeyhole } from "lucide-react";

export default async function CheckoutPage() {
  const store = await cookies();
  const details = cartDetails(parseCart(store.get("ax4_cart")?.value), await productRepository.list());
  if (details.length === 0) redirect("/cart");
  const total = calculateOrder(details.map((item) => ({ product: item.product, quantity: item.quantity })));
  return (
    <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
      <PageHeading eyebrow="CHECKOUT" title="최종 주문 확인" description="현재 결제는 mock 모드입니다. 실제 PG 연결 전까지 카드나 계좌 정보는 수집하지 않습니다." />
      <form action="/api/orders" method="post" className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          <section className="rounded-[26px] bg-white p-6 md:p-8"><h2 className="text-xl font-black">받는 분</h2><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-xs font-bold">이름<input required name="name" defaultValue="김러너" className="h-12 rounded-xl border border-black/15 px-4 text-sm font-normal" /></label><label className="grid gap-2 text-xs font-bold">휴대전화<input required name="phone" inputMode="tel" defaultValue="010-1234-5678" className="h-12 rounded-xl border border-black/15 px-4 text-sm font-normal" /></label><label className="grid gap-2 text-xs font-bold sm:col-span-2">주소<input required name="address" defaultValue="서울특별시 성동구 러너로 4" className="h-12 rounded-xl border border-black/15 px-4 text-sm font-normal" /></label><label className="grid gap-2 text-xs font-bold sm:col-span-2">배송 메모<select name="memo" className="h-12 rounded-xl border border-black/15 bg-white px-4 text-sm font-normal"><option>문 앞에 놓아주세요</option><option>배송 전 연락해주세요</option><option>경비실에 맡겨주세요</option></select></label></div></section>
          <section className="rounded-[26px] bg-white p-6 md:p-8"><h2 className="text-xl font-black">결제수단</h2><label className="mt-5 flex items-center gap-3 rounded-2xl border-2 border-black p-4 text-sm font-bold"><input type="radio" name="paymentMethod" value="mock-card" defaultChecked /><CreditCard size={19} /> 테스트 카드 결제 <span className="ml-auto rounded-full bg-[var(--lime)] px-2 py-1 text-[10px]">MOCK</span></label><p className="mt-4 text-xs leading-5 text-[var(--muted)]">PortOne과 PG 가입 후 실제 카드·간편결제 창으로 교체됩니다.</p></section>
        </div>
        <aside className="h-fit rounded-[26px] bg-[#e9e7df] p-6 lg:sticky lg:top-24"><p className="eyebrow">PAYMENT</p><div className="mt-5 grid gap-3 text-sm">{details.map((item) => <div key={`${item.productId}-${item.size}`} className="flex justify-between gap-4"><span>{item.product.name} × {item.quantity}</span><span className="font-bold">{formatWon(item.product.price * item.quantity)}</span></div>)}</div><dl className="mt-6 grid gap-3 border-t border-black/10 pt-5 text-sm"><div className="flex justify-between"><dt>배송비</dt><dd>{total.deliveryFee ? formatWon(total.deliveryFee) : "무료"}</dd></div><div className="flex justify-between text-xl font-black"><dt>총 결제금액</dt><dd>{formatWon(total.total)}</dd></div></dl><label className="mt-5 flex items-start gap-2 text-xs leading-5"><input required type="checkbox" className="mt-1" /> 상품, 가격, 배송 정보와 주문 내용을 확인했습니다.</label><button className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black text-sm font-black text-white"><LockKeyhole size={16} /> {formatWon(total.total)} 결제 승인</button><p className="mt-3 text-center text-[10px] text-[var(--muted)]">mock 환경에서는 실제 금액이 청구되지 않습니다.</p></aside>
      </form>
    </div>
  );
}
