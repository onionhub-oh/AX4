# AX4

AX4는 목적과 조건을 대화로 이해하고 러닝 상품 후보를 압축해 비교·구매까지 돕는 AI 커머스 MVP입니다. 현재 기본 설정은 외부 계정이 없어도 핵심 여정을 실행할 수 있는 `mock` 모드입니다.

## 포함된 기능

- 모바일 우선 홈, 상품 검색·필터, 상세, 비교
- 조건 분석 기반 AI 추천과 OpenAI 교체형 provider
- HTTP-only 쿠키 기반 데모 장바구니
- 주문서, 사용자 최종 승인, mock 결제, 주문·배송 조회
- 주문 취소·반품 상태 전이
- mock 로그인 및 마이페이지
- 운영자 상품 상태 관리와 운영 지표 화면
- Supabase PostgreSQL 초기 migration, RLS, pgvector, Queue worker 골격
- Prisma 서버 스키마와 Supabase SSR client 골격
- PortOne 준비·웹훅 adapter 경계
- Vercel 서울 리전 설정, GitHub Actions CI와 Dependabot
- WebMCP 상품 검색·장바구니 준비 도구(지원 브라우저에서만 등록)

## 로컬 실행

Node.js 24 LTS와 pnpm 11을 권장합니다.

```bash
corepack enable
pnpm install
cp .env.example apps/web/.env.local
pnpm dev
```

브라우저에서 `http://localhost:3000`을 엽니다. 외부 키가 없을 때는 `.env.example` 기본값대로 mock 데이터·추천·결제를 사용합니다.

## 검증

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Supabase 로컬 스택은 Docker와 Supabase CLI 설치 후 실행합니다.

```bash
supabase start
supabase db reset
```

## 프로젝트 구조

```text
apps/web              Next.js App Router 고객·운영자 웹과 REST API
packages/contracts    도메인·API 공유 타입
packages/domain       추천·가격 계산 등 순수 비즈니스 규칙
packages/db           repository, mock catalog, Prisma schema
supabase/migrations   운영 스키마의 단일 변경 이력
supabase/functions    Queue/비동기 작업 Edge Function
docs                  연동·운영 문서와 결정 기록
```

가입과 실제 키 발급이 필요한 작업은 [서비스 연동 체크리스트](docs/service-integration-checklist.md)를 따릅니다.
