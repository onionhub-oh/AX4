import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";

async function mockSignIn(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "").trim();
  if (!email.includes("@")) redirect("/login?error=1");
  const store = await cookies();
  store.set("ax4_session", JSON.stringify({ email, provider: "mock" }), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 12, path: "/" });
  redirect("/account");
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <div className="mx-auto flex min-h-[70vh] max-w-[440px] items-center px-5 py-16"><div className="w-full rounded-[30px] bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,.08)] md:p-9"><Logo /><p className="eyebrow mt-10">WELCOME BACK</p><h1 className="mt-3 text-4xl font-black tracking-[-.06em]">내 선택을 이어가세요.</h1><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Supabase Auth 연결 전 사용하는 테스트 로그인입니다.</p><form action={mockSignIn} className="mt-8 grid gap-4"><label className="grid gap-2 text-xs font-bold">이메일<input name="email" type="email" required defaultValue="runner@example.com" className="h-12 rounded-xl border border-black/15 px-4 text-sm font-normal" /></label>{error && <p className="text-xs text-red-600">올바른 이메일을 입력해 주세요.</p>}<button className="h-13 rounded-full bg-black text-sm font-black text-white">이메일로 계속하기</button><button type="button" disabled className="h-13 rounded-full bg-[#fee500] text-sm font-black text-black opacity-55">카카오 로그인 · 연결 후 활성화</button></form><p className="mt-6 text-center text-[10px] leading-4 text-[var(--muted)]">계속하면 서비스 이용약관과 개인정보 처리방침에 동의하게 됩니다.</p></div></div>;
}
