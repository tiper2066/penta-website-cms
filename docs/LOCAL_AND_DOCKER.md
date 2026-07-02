# 로컬 개발 및 Docker 운영 전환 기준

## 기본 전략

데모 단계와 실제 운영 단계의 실행 방식은 다르게 가져갑니다.

- 데모 개발: 로컬 `npm run dev` 중심
- 데모 검증: Dockerfile/Compose로 컨테이너 실행 가능성 확인
- 실제 운영: 사내 내부망 Docker Compose 기반

이 전략은 개발 속도와 운영 전환 안정성을 동시에 확보하기 위한 것입니다.

## 데모 단계

데모는 JSON 기반이므로 PostgreSQL, MinIO, Payload CMS가 아직 필요하지 않습니다.

권장:

- 앱은 노트북에서 직접 실행합니다.
- 데이터는 `src/content/demo-site.json`에서 읽습니다.
- 이미지/아이콘은 우선 `public` 또는 기존 `ref-image` 기반으로 둡니다.
- Docker는 데모 후반에 "컨테이너에서도 뜨는지" 확인하는 수준으로 사용합니다.

초기 개발 명령 예시:

```bash
npm run dev
```

데모 단계에서 Docker를 처음부터 강제하지 않는 이유:

- macOS에서 Docker 파일 감시가 느릴 수 있습니다.
- DB/Storage가 없는 단계에서는 Docker의 이점이 작습니다.
- 데모의 핵심은 인프라가 아니라 편집 경험 검증입니다.

## 데모 후반 Docker 검증

데모가 어느 정도 완성되면 아래 항목을 확인합니다.

- 앱이 Docker 이미지로 빌드되는가
- 컨테이너에서 정적 에셋 경로가 깨지지 않는가
- 환경변수 없이도 데모 모드가 실행되는가
- Node.js 버전과 패키지 매니저가 고정되어 있는가

데모용 Compose는 앱 컨테이너 하나만 있어도 충분합니다.

```mermaid
flowchart LR
  browser["Browser"] --> app["Demo App Container"]
  app --> json["Bundled JSON Content"]
```

## 실제 프로젝트 단계

실제 CMS 구축 단계에서는 다음 구성을 목표로 합니다.

```mermaid
flowchart TD
  user["Internal Network User"] --> proxy["Nginx or Caddy"]
  proxy --> app["Next.js + Payload CMS"]
  app --> postgres["PostgreSQL"]
  app --> minio["MinIO"]
  postgres --> pgVolume["postgres_data"]
  minio --> minioVolume["minio_data"]
```

권장 서비스:

- `app`: Next.js + Payload CMS
- `postgres`: PostgreSQL
- `minio`: S3 호환 내부 Storage
- `proxy`: Nginx 또는 Caddy
- `backup`: DB/Storage 백업 작업용 컨테이너

## 환경변수 원칙

로컬 개발과 Docker 내부 실행은 호스트명이 다릅니다. 이 차이를 코드에 하드코딩하면 안 됩니다.

### 로컬 앱 + Docker DB/Storage

앱을 노트북에서 `npm run dev`로 실행하고 DB/Storage만 Docker로 띄우는 경우:

```env
DATABASE_URL=postgres://penta:penta@localhost:5432/penta_cms
S3_ENDPOINT=http://localhost:9000
S3_PUBLIC_URL=http://localhost:9000
```

### 앱도 Docker 내부 실행

앱, DB, Storage가 모두 Compose 네트워크 안에 있는 경우:

```env
DATABASE_URL=postgres://penta:penta@postgres:5432/penta_cms
S3_ENDPOINT=http://minio:9000
S3_PUBLIC_URL=https://cms-assets.internal.example.com
```

핵심:

- 서버 내부 통신용 endpoint와 브라우저 공개 URL을 분리합니다.
- `localhost`는 컨테이너 안에서 자기 자신을 의미하므로 운영 Compose에서는 사용하지 않습니다.

## MinIO 주의사항

MinIO는 S3 호환 API를 제공하므로 자체 운영에 적합합니다. 다만 다음을 주의합니다.

- `S3_ENDPOINT`: 앱 서버가 MinIO에 접근할 내부 주소
- `S3_PUBLIC_URL`: 브라우저가 이미지에 접근할 공개 주소
- `forcePathStyle: true`: 로컬/내부망 MinIO에서 안정적인 S3 경로 처리에 필요
- 버킷 정책: 공개 이미지와 비공개 파일을 분리
- 업로드 제한: 확장자, MIME, 용량 제한 필요

가장 흔한 문제:

- 컨테이너 내부에서 발급한 이미지 URL이 `http://minio:9000/...`로 노출되어 브라우저에서 열리지 않는 문제

해결:

- 내부 endpoint와 public URL을 반드시 분리합니다.

## PostgreSQL 주의사항

운영 기준:

- 데이터 볼륨은 named volume 사용
- DB 계정과 비밀번호는 기본값 사용 금지
- timezone은 `Asia/Seoul` 기준 검토
- 인코딩은 UTF-8
- 마이그레이션은 코드로 관리

금지:

- 운영 DB를 직접 손으로 수정
- `docker compose down -v` 습관적 사용
- `.env` 파일 Git 커밋

## 백업과 복구

실제 운영 전 반드시 설계해야 합니다.

PostgreSQL:

- 정기 `pg_dump`
- 보관 주기 정의
- 복구 리허설

MinIO:

- 버킷 데이터 백업
- 첨부파일/이미지 복구 테스트
- 파일 메타데이터와 실제 파일 간 정합성 확인

백업은 "파일이 있다"가 아니라 "복구해서 서비스가 뜬다"까지 확인해야 합니다.

## 내부망 보안

관리자 페이지는 내부망이라고 해서 열어두면 안 됩니다.

권장:

- `/admin` 경로 IP 제한
- 강력한 관리자 비밀번호 정책
- 가능하면 사내 SSO 연동 검토
- 관리자 액션 감사 로그
- 업로드 파일 검증
- 보안 헤더 설정

프록시에서 고려할 헤더:

- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`

## 데모에서 실제 운영으로 넘어갈 때 체크리스트

- JSON 모델이 Payload Blocks로 자연스럽게 매핑되는가
- 이미지 필드가 MinIO Upload 모델로 바뀌어도 컴포넌트 props가 유지되는가
- 링크/메뉴 모델이 Global로 분리되어도 Header/Footer 컴포넌트를 재사용할 수 있는가
- 환경변수가 `local`, `docker-dev`, `internal-prod`로 분리되어 있는가
- 관리자 접근 경로와 보안 정책이 확정되었는가
- 백업/복구 방식이 문서화되었는가

## 권장 진행 순서

1. 데모는 로컬 실행으로 빠르게 만든다.
2. 데모가 미팅 가능한 수준이 되면 앱 컨테이너 빌드를 검증한다.
3. 요구사항 확정 후 PostgreSQL과 MinIO를 Compose에 추가한다.
4. Payload CMS를 도입하고 JSON 모델을 CMS 스키마로 전환한다.
5. 사내망 운영과 같은 방식으로 staging Compose 환경을 만든다.
6. 백업/복구, 보안, 배포 절차를 확인한 뒤 운영 전환한다.
