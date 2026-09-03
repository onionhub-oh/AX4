"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function OrderActionButton({ orderId, action, children }: { orderId: string; action: "cancel" | "return"; children: React.ReactNode }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return <button disabled={busy} onClick={async () => { if (!window.confirm(action === "cancel" ? "주문 취소를 요청할까요?" : "반품을 요청할까요?")) return; setBusy(true); const response = await fetch(`/api/orders/${orderId}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ action }) }); if (response.ok) router.refresh(); setBusy(false); }} className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold disabled:opacity-50">{busy ? "처리 중" : children}</button>;
}
