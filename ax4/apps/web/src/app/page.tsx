import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, CircleCheck, MoveRight, Sparkles } from "lucide-react";
import { productRepository } from "@ax4/db";
import { ProductCard } from "@/components/product-card";
import { AiShopper } from "@/components/ai-shopper";
import { buttonVariants } from "@/components/ui/button";

export default async function HomePage() {
  const products = await productRepository.list();
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pt-7 md:px-8 md:pt-10">
        <div className="relative min-h-[670px] overflow-hidden rounded-[32px] bg-[#ebe7dc] md:min-h-[720px]">
          <Image src="/images/ax4-running-lineup.png" alt="파란색, 검은색, 주황색, 올리브색 러닝화 네 켤레" fill priority className="object-cover object-center" sizes="(max-width: 768px) 150vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f2efe6] via-[#f2efe6]/85 to-transparent md:via-[#f2efe6]/25" />
          <div className="relative flex min-h-[670px] max-w-3xl flex-col justify-between p-6 md:min-h-[720px] md:p-12 lg:p-16">
            <div className="flex items-center gap-2"><span className="rounded-full bg-[var(--lime)] px-3 py-1.5 text-[10px] font-black tracking-[.14em]">AI RUNNING CURATOR</span><span className="text-xs font-bold text-black/55">상품 데이터 기반 추천</span></div>
            <div>
              <p className="mb-5 flex items-center gap-2 text-xs font-black tracking-[.16em]"><Sparkles size={14} /> 목적부터 물어보는 러닝 스토어</p>
              <h1 className="max-w-3xl text-[clamp(3.2rem,8vw,7.6rem)] font-black leading-[.83] tracking-[-.085em]">RUN<br />WITH<br /><span className="text-[#2255d8]">CLARITY.</span></h1>
              <p className="mt-7 max-w-md text-base font-medium leading-7 text-black/65 md:text-lg">수백 개를 보여주는 대신, 당신에게 맞는 네 가지를 고릅니다. 이유와 아쉬운 점까지 솔직하게.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#ai-shopper" className={buttonVariants({ variant: "default", size: "lg" })}>AI에게 물어보기 <ArrowDown size={17} /></Link>
                <Link href="/shop" className={buttonVariants({ variant: "outline", size: "lg" })}>직접 둘러보기 <ArrowRight size={17} /></Link>
              </div>
            </div>
            <div className="grid max-w-xl grid-cols-3 gap-3 border-t border-black/15 pt-5 text-xs font-bold md:text-sm">
              <span><b className="block text-xl">3—4</b>압축 후보</span><span><b className="block text-xl">100%</b>재고 기반</span><span><b className="block text-xl">0</b>몰래 결제</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-5"><div><p className="eyebrow">CURATED THIS WEEK</p><h2 className="mt-3 text-3xl font-black tracking-[-.055em] md:text-5xl">지금 달리기 좋은 네 켤레</h2></div><Link href="/shop" className="hidden items-center gap-2 text-sm font-bold md:flex">전체 보기 <MoveRight size={18} /></Link></div>
        <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0, 4).map((product, index) => <ProductCard key={product.id} product={product} rank={index + 1} />)}</div>
      </section>

      <AiShopper />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 md:px-8">
        <div className="grid overflow-hidden rounded-[32px] bg-[#2255d8] text-white md:grid-cols-2">
          <div className="p-8 md:p-14"><p className="eyebrow text-[var(--lime)]">WHY AX4</p><h2 className="mt-5 text-4xl font-black leading-none tracking-[-.06em] md:text-6xl">많이 보여주는 것보다,<br />잘 고르는 것.</h2></div>
          <div className="grid gap-5 border-white/15 p-8 md:border-l md:p-14">
            {["가격·재고·배송은 상품 시스템 데이터를 기준으로 확인", "추천 근거와 맞지 않을 수 있는 조건을 함께 표시", "장바구니·결제·취소는 언제나 사용자가 최종 승인"].map((item) => <div key={item} className="flex items-start gap-3 border-b border-white/15 pb-5 text-sm font-semibold leading-6 last:border-0"><CircleCheck className="mt-0.5 shrink-0 text-[var(--lime)]" size={19} />{item}</div>)}
          </div>
        </div>
      </section>
    </>
  );
}
