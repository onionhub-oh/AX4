import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-black/10 bg-[#efeee7]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div><Logo /><p className="mt-4 max-w-sm text-sm leading-6 text-[var(--muted)]">목적만 말하면, AX4가 선택 기준을 정리하고 믿을 수 있는 후보를 좁혀드려요.</p></div>
        <div><p className="eyebrow">SHOP</p><div className="mt-4 grid gap-2 text-sm"><Link href="/shop">전체 상품</Link><Link href="/compare">상품 비교</Link><Link href="/account">주문 조회</Link></div></div>
        <div><p className="eyebrow">NOTICE</p><p className="mt-4 text-sm leading-6 text-[var(--muted)]">현재는 구축 검증용 환경입니다. 표시 상품·재고·결제·배송 정보는 샘플 데이터입니다.</p></div>
      </div>
      <div className="border-t border-black/8 px-5 py-5 text-center text-xs text-[var(--muted)]">© 2026 AX4. Run with clarity.</div>
    </footer>
  );
}
