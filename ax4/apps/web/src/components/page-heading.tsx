import type { ReactNode } from "react";

export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end">
      <div><p className="eyebrow">{eyebrow}</p><h1 className="mt-3 text-4xl font-black tracking-[-.06em] md:text-6xl">{title}</h1>{description && <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)] md:text-base">{description}</p>}</div>{action}
    </div>
  );
}
