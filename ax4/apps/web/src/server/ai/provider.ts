import OpenAI from "openai";
import type { Product, RecommendedProduct } from "@ax4/contracts";
import { recommendProducts } from "@ax4/domain";

export interface RecommendationProvider {
  recommend(query: string, products: Product[]): Promise<RecommendedProduct[]>;
}

class RuleBasedRecommendationProvider implements RecommendationProvider {
  async recommend(query: string, products: Product[]) { return recommendProducts(products, { query }); }
}

class OpenAIRecommendationProvider implements RecommendationProvider {
  private client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  async recommend(query: string, products: Product[]) {
    const fallback = recommendProducts(products, { query });
    const response = await this.client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-5.4-mini-2026-08-04",
      input: [
        { role: "system", content: "당신은 AX4 러닝 상품 큐레이터입니다. 제공된 상품 사실만 사용하세요. 질환을 진단하거나 치료 효과를 말하지 마세요. 각 후보의 상품 id를 적합도 순서로 한 줄에 하나씩 출력하세요." },
        { role: "user", content: `요청: ${query}\n상품:\n${products.map((p) => `${p.id} | ${p.name} | ${p.price}원 | ${p.width} | 쿠션 ${p.cushion} | ${p.uses.join(",")}`).join("\n")}` },
      ],
      max_output_tokens: 200,
    });
    const ids = response.output_text.split(/\s+/).filter((token) => products.some((product) => product.id === token));
    if (ids.length === 0) return fallback;
    return [...fallback].sort((a, b) => {
      const aiA = ids.indexOf(a.product.id); const aiB = ids.indexOf(b.product.id);
      return (aiA < 0 ? 99 : aiA) - (aiB < 0 ? 99 : aiB);
    });
  }
}

export function getRecommendationProvider(): RecommendationProvider {
  if (process.env.AX4_AI_PROVIDER === "openai" && process.env.OPENAI_API_KEY) return new OpenAIRecommendationProvider();
  return new RuleBasedRecommendationProvider();
}
