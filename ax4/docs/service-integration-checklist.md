# AX4 서비스 연동 체크리스트

코드 구축과 로컬 mock 검증이 끝난 뒤 아래 순서로 한 번에 처리합니다. 비밀값은 GitHub에 커밋하지 않고 Vercel 또는 Supabase secret에만 저장합니다.

## 1. GitHub

- GitHub Organization과 private repository 생성
- 현재 저장소를 remote에 연결하고 기본 브랜치를 `main`으로 지정
- `@onionhub`가 실제 GitHub 사용자 또는 팀인지 확인해 `.github/CODEOWNERS` 수정
- Branch protection: PR 필수, CI 필수, force push 금지
- Secret scanning, Push protection, Dependabot 활성화
- 환경 `preview`, `staging`, `production` 생성 및 승인 규칙 설정

## 2. Supabase

- 개발·스테이징·운영 프로젝트를 각각 서울 `ap-northeast-2`에 생성
- 각 환경의 URL, publishable key, service role key, direct/pooler DB URL 발급
- `supabase/migrations`를 개발 환경부터 적용하고 RLS 테스트
- Storage에 `product-images` private 원본 bucket과 공개 파생 이미지 정책 구성
- Kakao OAuth 앱을 만들고 Supabase Auth redirect URL 등록
- SMTP provider 연결, 관리자 MFA, SSL enforcement와 Network Restrictions 검토
- Queue `commerce_jobs`, Cron, `commerce-worker` secret 설정

## 3. Vercel

- GitHub 저장소 Import 후 Root Directory를 `ax4/apps/web`으로 지정
- Node.js 24와 Functions region `icn1` 확인
- preview에는 개발/브랜치 Supabase만 연결하고 운영 DB 접근 금지
- `.env.example`의 환경변수를 환경별로 등록
- custom domain과 DNS, HTTPS 확인

## 4. OpenAI

- 전용 API Project와 제한된 API key 생성
- 월 예산·사용량 알림 설정
- `OPENAI_API_KEY`, `OPENAI_MODEL`, `AX4_AI_PROVIDER=openai` 등록
- 추천 평가 세트로 mock 대비 품질·지연·비용 확인 후 트래픽 전환
- 개인정보 제거, 30일 abuse log, ZDR 필요성을 법무·보안과 검토

## 5. PortOne 및 국내 PG

- PortOne V2 계정과 단일 PG 계약
- 테스트 store ID, channel key, API secret, webhook secret 발급
- `AX4_PAYMENT_PROVIDER=portone`과 PortOne 환경변수 등록
- 결제창 client SDK 연결, 서버 금액 재검증과 웹훅 공식 서명 검증 구현 완료
- 중복 웹훅, 결제 성공/실패, 전액·부분 취소, 망분리/모바일 복귀 시나리오 검증
- 운영 전 카드사·간편결제 심사와 통신판매업·전자상거래 고지 검토

## 6. 알림·배송·관측

- 이메일: Resend 또는 국내 SMTP provider 결정 및 발신 도메인 인증
- 알림톡: 카카오 비즈니스 채널, 발신 프로필, 템플릿 심사
- 배송: 택배 조회 API 또는 공급사 송장 feed 계약
- Sentry 프로젝트와 release/source map 업로드 설정
- 개인정보·전자상거래·환불 정책과 CS 연락처를 실제 사업 정보로 교체

## 출시 차단 조건

- mock 배지가 남은 결제·배송 정보를 실제 서비스로 오인할 수 있는 상태
- RLS 및 결제 금액 재검증 통합 테스트 미통과
- 운영 관리자 MFA·감사 로그·백업 복구 점검 미완료
- 실제 상품 이미지, 공급사 재고 갱신, 반품 정책 데이터 미입력
