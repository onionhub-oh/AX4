import type { Product } from "@ax4/contracts";
import { formatWon } from "@ax4/domain";
import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ProductImage } from "./product-image";

export function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  return (
    <article className="group min-w-0">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden rounded-[26px] bg-[#e9e7df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">
        <div className="relative aspect-[4/3] overflow-hidden">
          <ProductImage id={product.id} alt={product.imageAlt} className="h-full transition-transform duration-500 group-hover:scale-[1.04]" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            {rank && <Badge className="bg-[var(--lime)]">0{rank}</Badge>}
            {product.badges.slice(0, 1).map((badge) => <Badge key={badge}>{badge}</Badge>)}
          </div>
          <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-white transition-transform group-hover:rotate-45"><ArrowUpRight size={18} /></span>
        </div>
      </Link>
      <div className="px-1 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-xs font-bold tracking-[.08em] text-[var(--muted)]">{product.brand}</p><Link href={`/products/${product.slug}`} className="mt-1 block text-lg font-bold tracking-[-.03em]">{product.name}</Link></div>
          <span className="flex items-center gap-1 pt-1 text-xs font-bold"><Star size={13} fill="currentColor" />{product.rating}</span>
        </div>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[var(--muted)]">{product.tagline}</p>
        <div className="mt-3 flex items-baseline gap-2"><strong className="text-lg tracking-[-.03em]">{formatWon(product.price)}</strong>{product.originalPrice && <del className="text-xs text-black/40">{formatWon(product.originalPrice)}</del>}</div>
      </div>
    </article>
  );
}
