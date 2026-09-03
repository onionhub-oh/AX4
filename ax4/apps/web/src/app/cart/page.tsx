import { cookies } from "next/headers";
import Link from "next/link";
import { productRepository } from "@ax4/db";
import { calculateOrder, formatWon } from "@ax4/domain";
import { parseCart, cartDetails } from "@/lib/cart";
import { PageHeading } from "@/components/page-heading";
import { ProductImage } from "@/components/product-image";
import { RemoveCartButton } from "@/components/remove-cart-button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default async function CartPage() {
  const store = await cookies();
  const products = await productRepository.list();
  const details = cartDetails(parseCart(store.get("ax4_cart")?.value), products);
  const total = calculateOrder(details.map((item) => ({ product: item.product, quantity: item.quantity })));
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
      <PageHeading eyebrow="CART" title="장바구니" description="결제 전 상품, 옵션, 수량과 최종 금액을 다시 확인해 주세요." />
      {details.length === 0 ? <div className="py-28 text-center"><p className="text-2xl font-black">아직 담긴 상품이 없어요.</p><p className="mt-3 text-sm text-[var(--muted)]">AI 추천을 받거나 상품을 직접 둘러보세요.</p><Link href="/shop" className="mt-7 inline-flex h-12 items-center rounded-full bg-black px-6 text-sm font-bold text-white">상품 보러 가기</Link></div> : <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-3">{details.map((item) => <article key={`${item.productId}-${item.size}`} className="grid grid-cols-[112px_1fr] gap-5 rounded-[24px] bg-white p-4 md:grid-cols-[140px_1fr_auto]"><ProductImage id={item.product.id} alt={item.product.imageAlt} className="aspect-square rounded-2xl" /><div className="py-2"><p className="text-[11px] font-bold text-[var(--muted)]">{item.product.brand}</p><h2 className="mt-1 font-black">{item.product.name}</h2><p className="mt-2 text-xs text-[var(--muted)]">{item.size}mm · 수량 {item.quantity}</p><div className="mt-4"><RemoveCartButton productId={item.productId} size={item.size} /></div></div><strong className="col-start-2 text-right md:col-auto md:py-2">{formatWon(item.product.price * item.quantity)}</strong></article>)}</div>
        <aside className="h-fit rounded-[26px] bg-[var(--ink)] p-6 text-white lg:sticky lg:top-24"><p className="eyebrow text-[var(--lime)]">ORDER SUMMARY</p><dl className="mt-6 grid gap-3 text-sm"><div className="flex justify-between"><dt>상품 금액</dt><dd>{formatWon(total.subtotal)}</dd></div><div className="flex justify-between"><dt>배송비</dt><dd>{total.deliveryFee === 0 ? "무료" : formatWon(total.deliveryFee)}</dd></div><div className="mt-3 flex justify-between border-t border-white/15 pt-5 text-lg font-black"><dt>결제 예정</dt><dd>{formatWon(total.total)}</dd></div></dl><Link href="/checkout" className="mt-6 flex h-13 items-center justify-center gap-2 rounded-full bg-[var(--lime)] text-sm font-black text-black">주문서 확인 <ArrowRight size={16} /></Link><p className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-white/55"><ShieldCheck className="mt-0.5 shrink-0" size={14} />이 단계에서는 결제가 실행되지 않습니다. 주문서에서 배송지와 결제수단을 확인한 뒤 최종 승인합니다.</p></aside>
      </div>}
    </div>
  );
}
