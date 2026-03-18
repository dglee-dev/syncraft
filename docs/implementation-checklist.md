# 구현 체크리스트

## 커밋 1 — Prisma 설정 및 DB 마이그레이션
- [x] Prisma 설치 및 schema.prisma 작성
- [x] `prisma migrate dev` 실행

## 커밋 2 — 암호화 및 credential 저장/불러오기
- [ ] `src/lib/encryption.ts` 작성
- [ ] `src/features/source-repository/actions/credential.ts` 작성

## 커밋 3 — UI 연결
- [ ] `source-display.tsx` — submit 핸들러 연결
- [ ] `SourceList` — atom 구독으로 변경
- [ ] `SourceDisplay` 헤더 — atom에서 bucket/region 표시

## 커밋 4 — 초기 로드
- [ ] `page.tsx` — 초기 로드 시 credential 불러와 파일 리스트 패치
