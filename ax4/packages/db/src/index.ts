import type { Product } from "@ax4/contracts";

export const products: Product[] = [
  {
    id: "shoe-aurora", slug: "aurora-flow-4", brand: "NORTHLINE", name: "오로라 플로우 4", category: "running-shoes",
    tagline: "첫 10km를 편안하게 만드는 균형형 데일리 러너", description: "폭신한 이중 밀도 폼과 넉넉한 앞코를 조합한 데일리 러닝화입니다. 천천히 거리를 늘리는 입문 러너에게 안정적인 착화감을 제공합니다.",
    price: 139000, originalPrice: 159000, rating: 4.8, reviewCount: 318, image: "/images/ax4-running-lineup.png", imageAlt: "파란색 쿠션 러닝화", accent: "#2255d8",
    surfaces: ["로드", "트레드밀"], uses: ["데일리", "10km", "장거리"], cushion: "최상", stability: "가이드", width: "와이드", weightGrams: 268, heelDropMm: 8, sizes: [240,245,250,255,260,265,270,275,280,285], stock: 37, deliveryDays: 2, returnDays: 14,
    badges: ["AI 베스트", "무료배송"], pros: ["넉넉한 앞코", "부드러운 착지", "장거리에도 편안함"], cons: ["스피드 훈련에는 다소 묵직함"], reviewSummary: "발볼 압박이 적고 오래 달려도 편안하다는 평가가 반복됩니다. 다만 빠른 페이스에서는 반응성이 아쉽다는 의견이 있습니다.", updatedAt: "2026-09-03T09:00:00+09:00",
  },
  {
    id: "shoe-axis", slug: "axis-guard-2", brand: "MOTION LAB", name: "액시스 가드 2", category: "running-shoes",
    tagline: "흔들림을 줄이고 꾸준한 페이스를 지키는 안정화", description: "뒤꿈치에서 중족부까지 이어지는 가이드 구조가 착지 시 좌우 흔들림을 줄여 줍니다. 안정감을 선호하는 러너에게 적합합니다.",
    price: 149000, originalPrice: 179000, rating: 4.7, reviewCount: 204, image: "/images/ax4-running-lineup.png", imageAlt: "검은색 안정형 러닝화", accent: "#32302e",
    surfaces: ["로드", "트레드밀"], uses: ["데일리", "회복주", "장거리"], cushion: "높음", stability: "안정", width: "표준", weightGrams: 282, heelDropMm: 10, sizes: [245,250,255,260,265,270,275,280,285,290], stock: 21, deliveryDays: 1, returnDays: 14,
    badges: ["안정성 추천", "오늘 출발"], pros: ["뒤꿈치 고정감", "안정적인 가이드", "내구성 좋은 아웃솔"], cons: ["중립화보다 무게감이 있음"], reviewSummary: "발목 주변 고정과 안정성에 높은 평가가 많습니다. 발등이 높은 사용자는 끈 조절이 필요하다는 후기가 있습니다.", updatedAt: "2026-09-03T09:05:00+09:00",
  },
  {
    id: "shoe-pulse", slug: "pulse-tempo-x", brand: "KILO", name: "펄스 템포 X", category: "running-shoes",
    tagline: "훈련의 리듬을 한 단계 끌어올리는 경량 템포화", description: "탄성 높은 폼과 유연한 플레이트를 적용해 템포런과 10km 레이스에서 경쾌한 전환을 돕습니다.",
    price: 169000, originalPrice: 189000, rating: 4.9, reviewCount: 167, image: "/images/ax4-running-lineup.png", imageAlt: "주황색 경량 템포 러닝화", accent: "#ff5a1f",
    surfaces: ["로드", "트랙"], uses: ["템포", "10km 레이스", "인터벌"], cushion: "높음", stability: "중립", width: "표준", weightGrams: 224, heelDropMm: 6, sizes: [240,245,250,255,260,265,270,275,280], stock: 14, deliveryDays: 2, returnDays: 7,
    badges: ["기록 도전", "인기 급상승"], pros: ["가벼운 무게", "빠른 발 구름", "선명한 반발감"], cons: ["느린 회복주에는 단단하게 느껴질 수 있음"], reviewSummary: "템포를 올릴 때 추진력이 좋고 무게가 가볍다는 평가가 많습니다. 천천히 달릴 때는 폼이 다소 단단하다는 의견도 있습니다.", updatedAt: "2026-09-03T09:10:00+09:00",
  },
  {
    id: "shoe-ridge", slug: "ridge-path-3", brand: "ROAM", name: "리지 패스 3", category: "running-shoes",
    tagline: "도심과 가벼운 트레일을 자연스럽게 잇는 올라운더", description: "젖은 노면에서도 접지력을 확보하는 러그 아웃솔과 발가락 보호 구조를 적용한 도어 투 트레일 러닝화입니다.",
    price: 154000, originalPrice: 174000, rating: 4.6, reviewCount: 96, image: "/images/ax4-running-lineup.png", imageAlt: "올리브색 트레일 러닝화", accent: "#857d58",
    surfaces: ["로드", "트레일"], uses: ["트레일", "하이킹", "데일리"], cushion: "보통", stability: "가이드", width: "와이드", weightGrams: 294, heelDropMm: 7, sizes: [245,250,255,260,265,270,275,280,285], stock: 18, deliveryDays: 3, returnDays: 14,
    badges: ["트레일 입문"], pros: ["젖은 길 접지력", "발가락 보호", "넉넉한 앞코"], cons: ["로드 전용화보다 소음이 있음"], reviewSummary: "가벼운 산길과 공원 비포장길에서 접지가 믿음직하다는 평가입니다. 아스팔트만 달릴 때는 아웃솔 소음이 느껴질 수 있습니다.", updatedAt: "2026-09-03T09:15:00+09:00",
  },
  {
    id: "shoe-cloud", slug: "cloud-mile-7", brand: "NORTHLINE", name: "클라우드 마일 7", category: "running-shoes",
    tagline: "주말 장거리를 위한 맥시멈 쿠션", description: "넓은 베이스와 높은 스택의 폼으로 오래 달릴수록 편안한 착화감을 제공합니다.",
    price: 159000, rating: 4.7, reviewCount: 142, image: "/images/ax4-running-lineup.png", imageAlt: "파란색 장거리 러닝화", accent: "#5c7cd8",
    surfaces: ["로드"], uses: ["장거리", "회복주"], cushion: "최상", stability: "가이드", width: "표준", weightGrams: 276, heelDropMm: 8, sizes: [250,255,260,265,270,275,280], stock: 9, deliveryDays: 2, returnDays: 14,
    badges: ["장거리 추천"], pros: ["풍부한 쿠션", "넓은 착지 면적"], cons: ["민첩한 코너링에는 둔하게 느껴질 수 있음"], reviewSummary: "15km 이상 달릴 때 발바닥 피로가 덜하다는 의견이 많습니다.", updatedAt: "2026-09-03T09:20:00+09:00",
  },
  {
    id: "shoe-sprint", slug: "sprint-core", brand: "KILO", name: "스프린트 코어", category: "running-shoes",
    tagline: "짧고 빠른 훈련에 집중한 미니멀 스피드화", description: "낮은 무게 중심과 얇은 러버를 적용해 트랙 인터벌에 집중한 훈련화입니다.",
    price: 119000, rating: 4.5, reviewCount: 88, image: "/images/ax4-running-lineup.png", imageAlt: "주황색 스피드 러닝화", accent: "#f97316",
    surfaces: ["트랙", "로드"], uses: ["인터벌", "템포"], cushion: "낮음", stability: "중립", width: "슬림", weightGrams: 198, heelDropMm: 4, sizes: [245,250,255,260,265,270,275], stock: 11, deliveryDays: 1, returnDays: 7,
    badges: ["초경량"], pros: ["빠른 전환", "가벼운 무게"], cons: ["발볼이 넓거나 쿠션을 선호하면 맞지 않음"], reviewSummary: "짧은 인터벌에서 발이 가볍다는 평가가 많지만 착화감이 슬림하다는 의견이 반복됩니다.", updatedAt: "2026-09-03T09:25:00+09:00",
  },
];

export interface ProductRepository {
  list(): Promise<Product[]>;
  findBySlug(slug: string): Promise<Product | null>;
  findByIds(ids: string[]): Promise<Product[]>;
}

class MockProductRepository implements ProductRepository {
  async list() { return products; }
  async findBySlug(slug: string) { return products.find((product) => product.slug === slug) ?? null; }
  async findByIds(ids: string[]) { return products.filter((product) => ids.includes(product.id)); }
}

export const productRepository: ProductRepository = new MockProductRepository();
