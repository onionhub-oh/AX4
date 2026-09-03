"use client";

import type { RecommendedProduct } from "@ax4/contracts";
import { formatWon } from "@ax4/domain";
import { ArrowRight, Check, LoaderCircle, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";

const suggestions = ["첫 10km · 발볼 넓음 · 15만원 이하", "주 3회 출근 전 러닝 · 푹신한 착화감", "로드와 가벼운 트레일을 한 켤레로"];

export function AiShopper() {
  const [query, setQuery] = useState("10km를 처음 준비해요. 발볼이 넓고 쿠션 좋은 15만원 이하 러닝화를 찾아줘.");
  const [results, setResults] = useState<RecommendedProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event?: FormEvent) {
    event?.preventDefault();
    if (!query.trim()) return;
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/ai/recommend", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query }) });
      if (!response.ok) throw new Error("추천을 불러오지 못했습니다.");
      const data = await response.json() as { recommendations: RecommendedProduct[] };
      setResults(data.recommendations);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "잠시 후 다시 시도해 주세요."); }
    finally { setLoading(false); }
  }

  return (
    <section id="ai-shopper" className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow flex items-center gap-2"><Sparkles size={14} /> AX4 AI SHOPPER</p>
          <h2 className="mt-5 text-balance text-4xl font-black leading-[.98] tracking-[-.065em] md:text-6xl">조건은 말로.<br />비교는 AX4가.</h2>
          <p className="mt-6 max-w-md text-base leading-7 text-[var(--muted)]">목적, 예산, 발볼처럼 알고 있는 것만 말해 주세요. 상품 데이터에 근거해 최대 네 가지 후보와 주의점까지 함께 보여드립니다.</p>
          <ol className="mt-8 grid gap-3 text-sm font-semibold">
            {["요구 조건을 구조화해요", "재고가 있는 후보만 압축해요", "추천 이유와 아쉬운 점을 함께 말해요"].map((item, index) => <li key={item} className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-black text-[11px] text-white">{index + 1}</span>{item}</li>)}
          </ol>
        </div>
        <div className="overflow-hidden rounded-[32px] bg-[var(--ink)] p-4 text-white shadow-[0_28px_80px_rgba(20,20,18,.18)] md:p-7">
          <div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-bold">나의 러닝 파트너</p><p className="mt-1 text-xs text-white/55">샘플 상품 데이터 실시간 조회 · 의료 진단 아님</p></div><span className="flex items-center gap-1.5 text-xs text-[var(--lime)]"><span className="size-1.5 rounded-full bg-[var(--lime)]" /> MOCK ONLINE</span></div>
          <div className="rounded-[24px] bg-white/7 p-4 md:p-5">
            <p className="mb-3 text-xs font-bold text-white/55">이렇게 물어보세요</p>
            <div className="flex flex-wrap gap-2">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => setQuery(suggestion)} className="rounded-full border border-white/12 px-3 py-2 text-left text-xs text-white/75 transition hover:border-[var(--lime)] hover:text-white">{suggestion}</button>)}</div>
            <form onSubmit={submit} className="mt-4 flex items-end gap-2 rounded-[20px] bg-white p-2 pl-4 text-[var(--ink)]">
              <label htmlFor="ai-query" className="sr-only">찾고 싶은 러닝 상품 조건</label>
              <textarea id="ai-query" rows={3} value={query} onChange={(event) => setQuery(event.target.value)} className="min-h-20 flex-1 resize-none bg-transparent py-2 text-sm leading-6 outline-none placeholder:text-black/35" placeholder="예: 첫 하프마라톤용, 18만원 이하, 푹신한 러닝화" />
              <Button type="submit" variant="lime" size="icon" disabled={loading} aria-label="추천 받기">{loading ? <LoaderCircle className="animate-spin" size={18} /> : <Send size={18} />}</Button>
            </form>
            {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
          </div>
          <div aria-live="polite" className="mt-4 grid gap-2">
            {results.length === 0 ? (
              <button onClick={() => submit()} className="group flex w-full items-center justify-between rounded-[22px] border border-white/10 p-5 text-left transition hover:border-[var(--lime)]">
                <span><span className="block text-xs text-white/45">추천 준비 완료</span><span className="mt-1 block font-bold">내 조건으로 후보 압축하기</span></span><ArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            ) : results.map((result, index) => (
              <Link href={`/products/${result.product.slug}`} key={result.product.id} className="group grid grid-cols-[auto_1fr_auto] gap-3 rounded-[22px] border border-white/10 p-4 transition hover:border-[var(--lime)]">
                <span className="grid size-9 place-items-center rounded-full bg-[var(--lime)] text-xs font-black text-black">{result.score}</span>
                <span><span className="block text-[11px] font-bold text-white/45">{index === 0 ? "가장 잘 맞아요" : `대안 ${index}`}</span><span className="mt-0.5 block font-bold">{result.product.name} · {formatWon(result.product.price)}</span><span className="mt-2 flex items-start gap-1 text-xs leading-5 text-white/65"><Check className="mt-0.5 shrink-0 text-[var(--lime)]" size={13} />{result.reasons[0]}</span></span>
                <ArrowRight className="mt-2 transition-transform group-hover:translate-x-1" size={17} />
              </Link>
            ))}
          </div>
          {results.length > 1 && <Link href={`/compare?ids=${results.map((item) => item.product.id).join(",")}`} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-bold text-black">추천 후보 한눈에 비교하기 <ArrowRight size={16} /></Link>}
        </div>
      </div>
    </section>
  );
}
