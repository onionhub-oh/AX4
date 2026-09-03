import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "AX4 — AI Running Curator", short_name: "AX4", description: "목적부터 물어보는 AI 러닝 스토어", start_url: "/", display: "standalone", background_color: "#f7f6f1", theme_color: "#171715", lang: "ko-KR" };
}
