"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminProductToggle({ productId, paused }: { productId: string; paused: boolean }) {
  const [busy, setBusy] = useState(false); const router = useRouter();
  return <button disabled={busy} onClick={async () => { setBusy(true); await fetch("/api/admin/products/status", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ productId, paused: !paused }) }); router.refresh(); setBusy(false); }} className="rounded-full border border-black/15 px-3 py-2 text-xs font-bold">{busy ? "처리 중" : paused ? "판매 재개" : "판매 중지"}</button>;
}
