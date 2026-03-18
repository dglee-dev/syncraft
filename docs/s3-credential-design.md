# S3 Credential 저장 설계

## 목표

S3 연결 정보(Access Key, Secret Key, Region, Bucket, Prefix)를 암호화하여 PostgreSQL에 저장하고,
앱 시작 시 불러와 파일 리스트를 렌더링한다.

---

## 디렉터리 구성

```
syncraft/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── lib/
│   │   └── encryption.ts
│   └── features/
│       └── source-repository/
│           ├── actions/
│           │   ├── fetch-s3-files.ts   # 기존
│           │   └── credential.ts       # 신규: save / load
│           └── store/
│               └── atoms.ts            # 기존
```

---

## DB 스키마

테이블명: `s3_credential`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Int (PK) | 자동 증가 |
| bucket | String | 버킷 이름 (평문) |
| region | String | 리전 (평문) |
| prefix | String | 폴더 경로 (평문) |
| access_key_id | String | 암호화된 Access Key |
| secret_access_key | String | 암호화된 Secret Key |
| created_at | DateTime | 생성 시각 |
| updated_at | DateTime | 수정 시각 |

bucket, region, prefix는 민감 정보가 아니므로 평문 저장.
access_key_id, secret_access_key만 암호화.

레코드는 단일 행으로 관리 (설정 저장이므로 upsert 사용).

---

## 암호화 전략

- 알고리즘: AES-256-GCM
- 키: 환경변수 `ENCRYPTION_KEY` (32바이트 hex, 64자)
- 방식: 암호화할 때마다 랜덤 IV(12바이트) 생성
- 저장 포맷: `iv:authTag:encryptedData` (colon 구분 base64 문자열)
- Node.js 내장 `crypto` 모듈 사용 (별도 패키지 불필요)

```
ENCRYPTION_KEY=your-32-byte-hex-key-here  # .env에 추가
```

---

## Server Actions

### `saveS3Credential(settings)`

1. accessKeyId, secretAccessKey 각각 암호화
2. DB에 upsert (id=1 고정)
3. 저장 완료 후 `fetchS3Files` 호출
4. 결과를 클라이언트에 반환

### `loadS3Credential()`

1. DB에서 레코드 조회
2. accessKeyId, secretAccessKey 복호화
3. 복호화된 settings 반환
4. 없으면 null 반환

---

## 데이터 흐름

```
[S3SettingsForm submit]
        ↓
[saveS3Credential] → 암호화 → DB upsert
        ↓
[fetchS3Files] → S3 ListObjectsV2
        ↓
[s3FileListAtom 업데이트]  +  [s3ConnectionAtom 업데이트]
        ↓
[SourceList 리렌더링]      [SourceDisplay 헤더 업데이트]
```

앱 최초 로드 시:

```
[page.tsx 렌더링]
        ↓
[loadS3Credential] → DB 조회 → 복호화
        ↓
저장된 credentials 있으면 → [fetchS3Files] → 파일 리스트 렌더링
없으면 → 빈 리스트 또는 안내 메시지
```

---

## 구현 순서

1. Prisma 설치 및 schema.prisma 작성
2. `prisma migrate dev` 실행
3. `src/lib/encryption.ts` 작성
4. `src/features/source-repository/actions/credential.ts` 작성
5. `source-display.tsx` — submit 핸들러 연결
6. `SourceList` — atom 구독으로 변경
7. `SourceDisplay` 헤더 — atom에서 bucket/region 표시
8. `page.tsx` — 초기 로드 시 credential 불러와 파일 리스트 패치
