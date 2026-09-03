import { cn } from "@/lib/utils";

const positions: Record<string, string> = {
  "shoe-aurora": "20% 48%", "shoe-cloud": "20% 48%", "shoe-axis": "46% 55%", "shoe-pulse": "69% 50%", "shoe-sprint": "69% 50%", "shoe-ridge": "91% 62%",
};

export function ProductImage({ id, alt, className, priority = false }: { id: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div role="img" aria-label={alt} className={cn("product-image", className)} style={{ backgroundPosition: positions[id] ?? "center" }} data-priority={priority || undefined} />
  );
}
