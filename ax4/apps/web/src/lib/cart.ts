import type { CartLine, Product } from "@ax4/contracts";

export function parseCart(raw?: string): CartLine[] {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw) as unknown;
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is CartLine => Boolean(item && typeof item === "object" && "productId" in item && "size" in item && "quantity" in item));
  } catch { return []; }
}

export function cartDetails(lines: CartLine[], products: Product[]) {
  return lines.flatMap((line) => {
    const product = products.find((candidate) => candidate.id === line.productId);
    return product ? [{ ...line, product }] : [];
  });
}
