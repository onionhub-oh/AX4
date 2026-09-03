"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function RemoveCartButton({ productId, size }: { productId: string; size: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return <button disabled={busy} onClick={async () => { setBusy(true); await fetch("/api/cart", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ productId, size }) }); router.refresh(); }} className="text-xs font-semibold text-[var(--muted)] underline disabled:opacity-50">{busy ? "삭제 중" : "삭제"}</button>;
}
