import { cookies } from "next/headers";
import Link from "next/link";
import { Search, ShoppingBag, UserRound } from "lucide-react";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export async function SiteHeader() {
  const store = await cookies();
  const raw = store.get("ax4_cart")?.value;
  let count = 0;
  try { count = raw ? (JSON.parse(raw) as Array<{ quantity: number }>).reduce((sum, item) => sum + item.quantity, 0) : 0; } catch {}

  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-[rgba(247,246,241,.88)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center px-5 md:px-8">
        <Logo />
        <nav className="ml-10 hidden items-center gap-7 text-sm font-semibold md:flex" aria-label="주요 메뉴">
          <Link href="/shop" className="nav-link">러닝화</Link>
          <Link href="/shop?surface=trail" className="nav-link">트레일</Link>
          <Link href="/#ai-shopper" className="nav-link">AI 쇼퍼</Link>
          <Link href="/compare" className="nav-link">비교하기</Link>
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Link href="/shop" className="header-icon" aria-label="검색"><Search size={19} /></Link>
          <Link href="/account" className="header-icon hidden sm:grid" aria-label="마이페이지"><UserRound size={19} /></Link>
          <Link href="/cart" className="header-icon relative" aria-label={`장바구니 ${count}개`}>
            <ShoppingBag size={19} />
            {count > 0 && <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-[var(--lime)] text-[9px] font-black text-black">{count}</span>}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
