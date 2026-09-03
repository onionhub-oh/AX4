import { describe, expect, it } from "vitest";
import { calculateOrder, recommendProducts } from "./index";
import type { Product } from "@ax4/contracts";

const product = (overrides: Partial<Product>): Product => ({
  id: "p1", slug: "shoe", brand: "AX4", name: "테스트 러너", category: "running-shoes", tagline: "테스트", description: "테스트 상품", price: 120000,
  rating: 4.8, reviewCount: 10, image: "/products/shoe.svg", imageAlt: "테스트 러닝화", accent: "#d6ff43", surfaces: ["로드"], uses: ["데일리"], cushion: "높음", stability: "중립", width: "와이드", weightGrams: 260, heelDropMm: 8, sizes: [260], stock: 5, deliveryDays: 2, returnDays: 7, badges: [], pros: ["편안함"], cons: ["조금 무거움"], reviewSummary: "편안해요", updatedAt: "2026-09-03T00:00:00Z", ...overrides,
});

describe("recommendProducts", () => {
  it("넓은 발볼과 쿠션 요구를 우선한다", () => {
    const results = recommendProducts([product({ id: "wide" }), product({ id: "slim", width: "슬림", cushion: "보통" })], { query: "발볼이 넓고 쿠션 좋은 15만원 이하" });
    expect(results[0].product.id).toBe("wide");
  });
});

describe("calculateOrder", () => {
  it("7만원 이상이면 무료 배송이다", () => {
    expect(calculateOrder([{ product: product({ price: 80000 }), quantity: 1 }]).deliveryFee).toBe(0);
  });
});
