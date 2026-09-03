import "jsr:@supabase/functions-js/edge-runtime.d.ts";

type CommerceJob = { type: "send_order_notification" | "sync_inventory" | "refresh_embedding"; payload: Record<string, unknown>; version: 1 };

Deno.serve(async (request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token || token !== Deno.env.get("WORKER_SECRET")) return new Response("Unauthorized", { status: 401 });
  const job = await request.json() as CommerceJob;
  if (job.version !== 1 || !["send_order_notification", "sync_inventory", "refresh_embedding"].includes(job.type)) return Response.json({ error: "Unsupported job" }, { status: 400 });
  // 외부 알림·공급사·OpenAI 계정 연결 후 각 adapter를 호출한다. 재시도와 DLQ는 pgmq 메타데이터로 관리한다.
  return Response.json({ ok: true, type: job.type, provider: "mock" });
});
