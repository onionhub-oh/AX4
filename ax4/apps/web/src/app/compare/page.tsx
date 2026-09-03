import Link from "next/link";
import { productRepository } from "@ax4/db";
import { formatWon } from "@ax4/domain";
import { PageHeading } from "@/components/page-heading";
import { ProductImage } from "@/components/product-image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ ids?: string }> }) {
  const ids = (await searchParams).ids?.split(",").filter(Boolean).slice(0, 4) ?? ["shoe-aurora", "shoe-axis", "shoe-pulse"];
  const products = await productRepository.findByIds(ids);
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
      <PageHeading eyebrow="COMPARE" title="차이만 선명하게" description="내 목적에 중요한 기준을 먼저 비교합니다. 최대 네 개 후보까지 나란히 볼 수 있어요." action={<Link href="/shop" className="text-sm font-bold">다른 상품 찾기 →</Link>} />
      {products.length === 0 ? <div className="py-24 text-center"><p className="text-xl font-bold">비교할 상품을 선택해 주세요.</p><Link href="/shop" className="mt-5 inline-block underline">상품 둘러보기</Link></div> : (
        <div className="mt-10 overflow-x-auto pb-3"><div className="grid min-w-[800px] gap-px overflow-hidden rounded-[26px] border border-black/10 bg-black/10" style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(200px, 1fr))` }}>
          <div className="bg-[#efeee8] p-5"><p className="eyebrow">CANDIDATES</p></div>{products.map((product, index) => <div key={product.id} className="bg-white p-4"><ProductImage id={product.id} alt={product.imageAlt} className="aspect-[4/3] rounded-2xl" /><p className="mt-4 text-[11px] font-black text-[#2255d8]">{index === 0 ? "AX4 PICK" : `OPTION ${index + 1}`}</p><h2 className="mt-1 text-lg font-black">{product.name}</h2><p className="mt-2 text-sm font-bold">{formatWon(product.price)}</p></div>)}
          {[["추천 용도", (p: typeof products[number]) => p.uses.join(" · ")],["쿠션", (p: typeof products[number]) => p.cushion],["안정성", (p: typeof products[number]) => p.stability],["발볼", (p: typeof products[number]) => p.width],["무게", (p: typeof products[number]) => `${p.weightGrams}g`],["배송", (p: typeof products[number]) => `${p.deliveryDays}일 내 출고`],["반품", (p: typeof products[number]) => `${p.returnDays}일 이내`]].flatMap(([label, getter]) => [<div key={`${label}-h`} className="bg-[#efeee8] p-5 text-sm font-bold">{label as string}</div>, ...products.map((product) => <div key={`${label}-${product.id}`} className="bg-white p-5 text-sm leading-6">{(getter as (p: typeof product) => string)(product)}</div>)])}
          <div className="bg-[#efeee8] p-5 text-sm font-bold">다음 단계</div>{products.map((product, index) => <div key={`action-${product.id}`} className="bg-white p-5">{index === 0 && <p className="mb-3 flex items-center gap-1.5 text-xs font-bold text-[#2255d8]"><CheckCircle2 size={14} />균형이 가장 좋아요</p>}<Link href={`/products/${product.slug}`} className="flex items-center justify-between rounded-full bg-black px-4 py-3 text-xs font-bold text-white">상품 보기 <ArrowRight size={15} /></Link></div>)}
        </div></div>
      )}
    </div>
  );
}
