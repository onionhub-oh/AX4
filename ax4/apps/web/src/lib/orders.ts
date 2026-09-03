import type { Order } from "@ax4/contracts";

export function parseOrders(raw?: string): Order[] {
  if (!raw) return [];
  try { const value = JSON.parse(raw) as unknown; return Array.isArray(value) ? value as Order[] : []; } catch { return []; }
}
