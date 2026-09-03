import { productRepository } from "@ax4/db";
import { ProductCard } from "@/components/product-card";
import { PageHeading } from "@/components/page-heading";
import { Search, SlidersHorizontal } from "lucide-react";

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string; surface?: string; width?: string }> }) {
  const params = await searchParams;
  const allProducts = await productRepository.list();
  const query = params.q?.toLowerCase().trim();
  const products = allProducts.filter((product) => (!query || `${product.brand} ${product.name} ${product.uses.join(" ")}`.toLowerCase().includes(query)) && (!params.surface || product.surfaces.some((surface) => surface.toLowerCase().includes(params.surface!))) && (!params.width || product.width === params.width));
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
      <PageHeading eyebrow="SHOP ALL" title="러닝화" description="기준이 분명한 상품만 선별했습니다. 필터로 직접 찾거나 AI에게 목적을 설명해 보세요." />
      <form className="my-8 grid gap-3 rounded-[22px] border border-black/10 bg-white p-3 md:grid-cols-[1fr_auto_auto]">
        <label className="flex items-center gap-3 rounded-full bg-[#f2f1ec] px-4"><Search size={17} /><span className="sr-only">상품 검색</span><input name="q" defaultValue={params.q} placeholder="브랜드, 상품명, 용도 검색" className="h-11 w-full bg-transparent text-sm outline-none" /></label>
        <select name="width" defaultValue={params.width ?? ""} aria-label="발볼 선택" className="h-11 rounded-full border border-black/10 bg-white px-4 text-sm font-semibold"><option value="">모든 발볼</option><option>슬림</option><option>표준</option><option>와이드</option></select>
        <button className="flex h-11 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-bold text-white"><SlidersHorizontal size={16} /> 적용</button>
      </form>
      <div className="mb-6 flex items-center justify-between"><p className="text-sm font-bold">{products.length}개 상품</p><p className="text-xs text-[var(--muted)]">추천순 · 재고 갱신 2026.09.03</p></div>
      {products.length > 0 ? <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-[28px] border border-dashed border-black/20 py-24 text-center"><p className="text-xl font-bold">조건에 맞는 상품이 없어요.</p><p className="mt-2 text-sm text-[var(--muted)]">검색어 또는 필터를 하나 줄여보세요.</p></div>}
    </div>
  );
}
