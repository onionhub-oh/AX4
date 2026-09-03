import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WebMcpTools } from "@/components/webmcp-tools";

export const metadata: Metadata = {
  metadataBase: new URL("https://ax4.kr"),
  title: { default: "AX4 — 고민은 줄이고, 선택은 정확하게", template: "%s | AX4" },
  description: "목적과 조건을 말하면 러닝 상품을 비교하고 선택 이유까지 설명하는 AI 퍼스널 바이어.",
  openGraph: { title: "AX4 — Run with clarity", description: "AI가 러닝 상품 후보를 압축하고 선택 이유까지 설명해요.", images: ["/images/ax4-running-lineup.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><WebMcpTools /><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
