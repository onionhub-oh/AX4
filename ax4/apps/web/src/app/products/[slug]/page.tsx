import { notFound } from "next/navigation";
import Link from "next/link";
import { productRepository } from "@ax4/db";
import { formatWon } from "@ax4/domain";
import { ProductImage } from "@/components/product-image";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, RefreshCcw, ShieldCheck, Star, Truck } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = await productRepository.findBySlug((await params).slug);
  return { title: product?.name ?? "상품" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = await productRepository.findBySlug((await params).slug);
  if (!product) notFound();
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-8 md:py-14">
      <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-[var(--muted)]"><Link href="/shop">러닝화</Link><ChevronRight size={13} /><span>{product.brand}</span></div>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <div className="overflow-hidden rounded-[32px] bg-[#e9e7df]"><ProductImage id={product.id} alt={product.imageAlt} priority className="aspect-square" /></div>
        <div className="lg:py-3">
          <div className="flex flex-wrap gap-2">{product.badges.map((badge) => <Badge key={badge} className={badge.includes("AI") ? "bg-[var(--lime)]" : ""}>{badge}</Badge>)}</div>
          <p className="mt-7 text-xs font-black tracking-[.12em] text-[var(--muted)]">{product.brand}</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-.06em] md:text-6xl">{product.name}</h1>
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">{product.tagline}</p>
          <div className="mt-5 flex items-center gap-2 text-sm font-bold"><Star size={16} fill="currentColor" /> {product.rating} <span className="font-normal text-[var(--muted)]">리뷰 {product.reviewCount}개</span></div>
          <div className="mt-8 flex items-baseline gap-3"><strong className="text-3xl tracking-[-.04em]">{formatWon(product.price)}</strong>{product.originalPrice && <del className="text-sm text-black/35">{formatWon(product.originalPrice)}</del>}</div>
          <form action="/api/cart" method="post" className="mt-8 border-y border-black/10 py-7">
            <input type="hidden" name="productId" value={product.id} />
            <label htmlFor="size" className="text-sm font-bold">사이즈 선택</label>
            <div className="mt-3 flex gap-2"><select id="size" name="size" className="h-12 min-w-40 rounded-full border border-black/15 bg-white px-4 text-sm font-semibold">{product.sizes.map((size) => <option key={size} value={size}>{size} mm</option>)}</select><input type="number" name="quantity" defaultValue={1} min={1} max={5} aria-label="수량" className="h-12 w-20 rounded-full border border-black/15 bg-white px-4 text-center" /></div>
            <button className="mt-4 h-14 w-full rounded-full bg-[var(--ink)] text-base font-bold text-white transition hover:-translate-y-0.5">장바구니에 담고 최종 확인</button>
          </form>
          <div className="grid grid-cols-3 divide-x divide-black/10 py-6 text-center text-xs font-bold"><span><Truck className="mx-auto mb-2" size={19} />{product.deliveryDays}일 내 출고</span><span><RefreshCcw className="mx-auto mb-2" size={19} />{product.returnDays}일 반품</span><span><ShieldCheck className="mx-auto mb-2" size={19} />재고 {product.stock}개</span></div>
        </div>
      </div>
      <div className="mt-16 grid gap-10 border-t border-black/10 pt-12 lg:grid-cols-[1fr_1fr]">
        <div><p className="eyebrow">PRODUCT NOTES</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em]">어떤 러닝에 맞을까요?</h2><p className="mt-5 max-w-xl leading-7 text-[var(--muted)]">{product.description}</p><dl className="mt-8 grid grid-cols-2 gap-3 text-sm">{[["쿠션", product.cushion],["안정성",product.stability],["발볼",product.width],["무게",`${product.weightGrams}g`],["힐드롭",`${product.heelDropMm}mm`],["노면",product.surfaces.join(" · ")]].map(([term, value]) => <div key={term} className="rounded-2xl bg-white p-4"><dt className="text-xs text-[var(--muted)]">{term}</dt><dd className="mt-1 font-bold">{value}</dd></div>)}</dl></div>
        <div className="rounded-[28px] bg-[#ebe7dc] p-7 md:p-9"><p className="eyebrow">AI REVIEW SUMMARY</p><p className="mt-5 text-lg font-semibold leading-8">“{product.reviewSummary}”</p><div className="mt-7 grid gap-3">{product.pros.map((pro) => <p key={pro} className="flex items-center gap-2 text-sm font-semibold"><Check className="text-[#2255d8]" size={17} />{pro}</p>)}</div><p className="mt-7 border-t border-black/10 pt-5 text-sm leading-6 text-[var(--muted)]"><strong className="text-[var(--ink)]">고려할 점:</strong> {product.cons[0]}</p><p className="mt-4 text-[11px] text-[var(--muted)]">샘플 리뷰 {product.reviewCount}건의 반복 표현을 요약했습니다. 개인의 착화감은 다를 수 있습니다.</p></div>
      </div>
    </div>
  );
}
