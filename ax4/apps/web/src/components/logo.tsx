import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label="AX4 홈">
      <span className="grid size-9 place-items-center rounded-[12px] bg-[var(--ink)] text-sm font-black tracking-[-0.08em] text-[var(--lime)] transition-transform group-hover:-rotate-3">A4</span>
      <span className="text-lg font-black tracking-[-0.06em]">AX4</span>
    </Link>
  );
}
