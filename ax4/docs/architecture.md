# AX4 아키텍처

```text
Browser / PWA
  └─ Vercel icn1 · Next.js App Router
      ├─ Server Components · catalog SEO
      ├─ Client Components · AI, cart actions
      └─ Route Handlers · REST, order, payment webhook
          ├─ Supabase Auth / PostgreSQL / Storage
          ├─ Prisma server repository
          ├─ OpenAI Responses provider
          └─ PortOne V2 provider

Supabase Queues (pgmq)
  └─ Edge Function worker
      ├─ notifications
      ├─ inventory sync
      └─ embedding refresh
```

핵심 도메인 규칙은 `packages/domain`에 두며 Supabase SDK, Prisma, OpenAI 또는 PortOne을 직접 참조하지 않습니다. 외부 provider가 없거나 실패해도 catalog·장바구니·주문 검토는 계속 사용할 수 있습니다.

## 현재 구현 모드

| 경계 | 기본 | 실서비스 전환 |
|---|---|---|
| 상품 repository | 메모리 seed | Prisma + Supabase PostgreSQL |
| 로그인 | HTTP-only mock session | Supabase Auth Kakao/이메일 |
| 장바구니·주문 | HTTP-only cookie | PostgreSQL + 인증 사용자/guest token |
| AI | 결정적 rule-based ranking | OpenAI Responses + 동일 repository tools |
| 결제 | mock 승인 | PortOne V2 + 서버 검증 + webhook |
| 알림·배송 | 화면 mock | Queue worker + 공급 provider |

## 안정 버전 결정

기술 결정안의 Prisma 8은 구축일 기준 `8.0.0-rc.12`만 제공되어 운영 후보로 사용하지 않았습니다. 현재 stable인 Prisma `7.10.0`을 고정하고, 8.x stable 출시 후 migration guide와 회귀 테스트를 통과할 때 승격합니다.
