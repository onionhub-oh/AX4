import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, PackageCheck, Truck } from "lucide-react";
import { productRepository } from "@ax4/db";
import { formatWon } from "@ax4/domain";
import { parseOrders } from "@/lib/orders";
import { cartDetails } from "@/lib/cart";
import { ProductImage } from "@/components/product-image";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const order = parseOrders((await cookies()).get("ax4_orders")?.value).find((item) => item.id === id);
  if (!order) notFound();
  const details = cartDetails(order.draft.lines, await productRepository.list());
  return (
    <div className="mx-auto max-w-[980px] px-5 py-12 md:px-8 md:py-16">
      <div className="rounded-[32px] bg-[#2255d8] p-8 text-white md:p-12"><span className="grid size-12 place-items-center rounded-full bg-[var(--lime)] text-black"><Check /></span><p className="eyebrow mt-8 text-[var(--lime)]">ORDER COMPLETE</p><h1 className="mt-3 text-4xl font-black tracking-[-.06em] md:text-6xl">주문이 완료됐어요.</h1><p className="mt-4 text-sm text-white/65">주문번호 {order.number} · mock 결제 승인</p></div>
      <section className="mt-6 rounded-[28px] bg-white p-6 md:p-8"><div className="flex items-center justify-between"><h2 className="text-xl font-black">배송 준비 중</h2><span className="rounded-full bg-[#eef0ff] px-3 py-1.5 text-xs font-bold text-[#2255d8]">결제 완료</span></div><div className="mt-7 grid grid-cols-3 text-center text-xs font-bold"><div><Check className="mx-auto mb-2 rounded-full bg-black p-1 text-white" />주문 완료</div><div><PackageCheck className="mx-auto mb-2 text-[#2255d8]" />상품 준비</div><div className="text-black/35"><Truck className="mx-auto mb-2" />배송 시작</div></div>{order.tracking && <p className="mt-7 rounded-2xl bg-[#f5f4ef] p-4 text-sm">예상 도착일 <strong>{order.tracking.eta}</strong> · {order.tracking.carrier}</p>}</section>
      <section className="mt-6 rounded-[28px] bg-white p-6 md:p-8"><h2 className="text-xl font-black">주문 상품</h2><div className="mt-5 grid gap-4">{details.map((item) => <div key={`${item.productId}-${item.size}`} className="grid grid-cols-[84px_1fr_auto] items-center gap-4"><ProductImage id={item.product.id} alt={item.product.imageAlt} className="aspect-square rounded-xl" /><div><p className="font-bold">{item.product.name}</p><p className="mt-1 text-xs text-[var(--muted)]">{item.size}mm · {item.quantity}개</p></div><strong>{formatWon(item.product.price * item.quantity)}</strong></div>)}</div><div className="mt-6 flex justify-between border-t border-black/10 pt-5 text-lg font-black"><span>결제 금액</span><span>{formatWon(order.draft.total)}</span></div></section>
      <div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/account" className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-bold">주문 내역 보기</Link><Link href="/shop" className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white">쇼핑 계속하기</Link></div>
    </div>
  );
}
