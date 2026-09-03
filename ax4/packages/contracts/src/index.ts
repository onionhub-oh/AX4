export type ProductCategory = "running-shoes" | "apparel" | "accessories";
export type CushionLevel = "낮음" | "보통" | "높음" | "최상";
export type StabilityLevel = "중립" | "가이드" | "안정";
export type FitWidth = "슬림" | "표준" | "와이드";

export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  imageAlt: string;
  accent: string;
  surfaces: string[];
  uses: string[];
  cushion: CushionLevel;
  stability: StabilityLevel;
  width: FitWidth;
  weightGrams: number;
  heelDropMm: number;
  sizes: number[];
  stock: number;
  deliveryDays: number;
  returnDays: number;
  badges: string[];
  pros: string[];
  cons: string[];
  reviewSummary: string;
  updatedAt: string;
}

export interface RecommendationRequest {
  query: string;
  budget?: number;
  width?: FitWidth;
  use?: string;
}

export interface RecommendedProduct {
  product: Product;
  score: number;
  reasons: string[];
  caution?: string;
}

export interface CartLine {
  productId: string;
  size: number;
  quantity: number;
}

export interface OrderDraft {
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export type OrderStatus = "payment_pending" | "paid" | "preparing" | "shipped" | "delivered" | "cancelled" | "return_requested";

export interface Order {
  id: string;
  number: string;
  status: OrderStatus;
  createdAt: string;
  draft: OrderDraft;
  tracking?: { carrier: string; number: string; eta: string };
}
