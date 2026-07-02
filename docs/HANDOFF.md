# Handoff: 펜타시큐리티 웹사이트/CMS 데모

이 문서는 새 채팅에서 바로 이어서 작업하기 위한 인수인계 문서입니다.

## 현재 상태

- 프로젝트 경로: `/Users/n22309002/Desktop/Cursor/penta-cms`
- 현재 프로젝트는 데모/실제 프로젝트를 같은 폴더에서 이어갈 계획입니다.
- `docs` 폴더에 기획/설계 문서가 작성되어 있습니다.
- 1단계 JSON 기반 데모 스캐폴딩은 완료되었습니다.
- Next.js, Tailwind CSS, `shadcn/ui` 호환 구조, `lucide-react`, Pretendard 로컬 폰트 연결이 구성되어 있습니다.
- `src/content/demo-site.json`과 `src/lib/content` JSON 로더를 기준으로 공개 페이지와 관리자 데모가 같은 콘텐츠 스키마를 사용합니다.
- 공개 메인 페이지 `/`와 관리자 데모 `/admin-demo`가 생성되어 있습니다.
- 현재 2단계 공개 페이지 데모 구현을 진행 중입니다.
- 2단계는 한 차례 ref-image 비교 피드백을 반영해 타이포, Hero 도형, ProductTabs, Stats, Awards, Footer 구조를 조정했습니다.
- 아직 ref-image와 완전히 동일하지는 않으므로 다음 작업은 섹션별 정밀 보정으로 진행합니다.
- 현재 기준 디자인은 `ref-image` 이미지 4개와 Figma 파일입니다.

## 기준 문서

먼저 아래 문서를 읽고 작업을 이어가면 됩니다.

- `docs/README.md`: 문서 인덱스와 전체 방향
- `docs/PROJECT_PLAN.md`: 데모부터 실제 프로젝트까지의 단계별 계획
- `docs/DEMO_SCOPE.md`: 데모 구현 범위와 제외 범위
- `docs/DESIGN_SYSTEM.md`: Figma/ref-image 기반 디자인 시스템 초안
- `docs/typography-guide.md`: Figma `C type_01` 텍스트 크기, 굵기, 색상 기준
- `docs/CMS_CONTENT_MODEL.md`: JSON 기반 콘텐츠 모델과 Payload 전환 방향
- `docs/LOCAL_AND_DOCKER.md`: 로컬 개발과 Docker 운영 전환 기준
- `docs/REQUIREMENTS_WORKSHOP.md`: 데모 미팅 질문과 체크리스트

## Figma 정보

- Figma URL: `https://www.figma.com/design/s10NvmcaLP3ytq56jH9zyd/Temp?node-id=135-2&t=VWVZC31NxYacVUH0-1`
- 파일/노드 정보:
  - file key: `s10NvmcaLP3ytq56jH9zyd`
  - node id: `135:2`
  - canvas name: `penta website demo`
- Figma 내부 주요 프레임:
  - `C type_01`: D.AMO / 데이터 보안
  - `C type_02`: WAPPLES / 웹 보안
  - `C type_03`: iSIGN / 인증 보안
  - `C type_04`: Cloudbric / 클라우드 보안

참고: Figma 변수 정의는 현재 비어 있는 것으로 확인되었습니다. 디자인 시스템은 레이어 구조와 시안 값을 기반으로 한 초안입니다.

## 참고 이미지

`ref-image` 폴더에 4개 이미지가 있습니다.

- `ref-image/main_01.png`
- `ref-image/main_02.png`
- `ref-image/main_03.png`
- `ref-image/main_04.png`

이 이미지는 Figma 4개 프레임의 시각 기준으로 사용합니다.

## 확정된 구현 방향

데모 단계:

- Next.js 기반으로 구현합니다.
- 데이터는 DB 없이 JSON을 사용합니다.
- 데모 관리자 화면은 `/admin-demo`로 만듭니다.
- 공개 페이지와 관리자 데모는 같은 JSON 스키마를 공유합니다.
- 실제 Payload CMS, PostgreSQL, MinIO는 데모 이후 요구사항 확정 단계에서 도입합니다.

실제 프로젝트 단계:

- Payload CMS + PostgreSQL + MinIO + Docker Compose 구조를 우선 후보로 둡니다.
- 사내 내부망 Docker 운영을 전제로 합니다.
- 데모 JSON 모델은 Payload Blocks 모델로 전환할 수 있게 설계합니다.

## UI/아이콘/폰트 결정사항

데모 구현 시 다음을 사용합니다.

- UI 라이브러리: `shadcn/ui` 호환 구성
- 기반 UI: Radix UI + Tailwind CSS
- 아이콘: `lucide-react`
- 폰트: Pretendard

사용 원칙:

- `/admin-demo`에는 `shadcn/ui`를 적극 사용합니다.
- 공개 메인 페이지는 Figma 시안 재현이 중요하므로 Tailwind 기반 커스텀 섹션 컴포넌트로 구현합니다.
- 단순 아이콘과 관리자 UI 아이콘은 `lucide-react`를 사용합니다.
- 로고, 제품 로고, 수상 로고, 제품 그래픽은 사용자가 준비한 에셋 경로를 참조합니다.
- Hero의 원/사각형/삼각형 같은 단순 도형은 가능하면 CSS로 구현합니다.

## 사용자가 준비할 에셋 경로

사용자가 아래 경로와 파일명으로 assets과 폰트를 준비할 예정입니다.

```txt
public/
  assets/
    logos/
      penta-security.svg
      damo.svg
      wapples.svg
      isign.svg
      cloudbric.svg
    awards/
      frost-sullivan.svg
      gartner.svg
      globee.svg
    products/
      damo-visual.svg
      wapples-visual.svg
      isign-visual.svg
      cloudbric-visual.svg
  fonts/
    pretendard/
      PretendardVariable.woff2
```

에셋 준비 전에도 개발을 시작할 수 있습니다. 이 경우 placeholder 또는 CSS 도형으로 먼저 구현하고, 파일이 준비되면 해당 경로를 연결하면 됩니다.

## 권장 프로젝트 구조

구현 시작 시 권장 구조입니다.

```txt
penta-cms/
  docs/
  ref-image/
  public/
    assets/
    fonts/
  src/
    app/
      page.tsx
      admin-demo/
        page.tsx
    components/
      layout/
      sections/
      ui/
    content/
      demo-site.json
    lib/
      content/
```

## 1단계 구현 시작점

완료된 작업입니다.

1. Next.js 프로젝트 초기화
2. Tailwind CSS 설정
3. shadcn/ui 초기화
4. lucide-react 설치
5. Pretendard 로컬 폰트 연결
6. `src/content/demo-site.json` 작성
7. `src/lib/content`에 JSON 로더 작성
8. `src/components/sections`에 섹션 컴포넌트 골격 작성
9. `src/app/page.tsx`에서 공개 메인 페이지 렌더링
10. `src/app/admin-demo/page.tsx`에서 관리자 데모 화면 시작

## 1단계 검증 기준

1단계 완료 후 다음을 확인했습니다.

- `npm run dev`로 앱이 실행됩니다. 샌드박스 환경에서는 `npm run dev -- --hostname 127.0.0.1`로 검증했습니다.
- 메인 페이지 `/`가 열립니다.
- `demo-site.json` 데이터를 읽어 화면에 표시합니다.
- `shadcn/ui` 기반 관리자 데모 라우트 `/admin-demo`가 열립니다.
- Pretendard 폰트가 `public/fonts/pretendard/PretendardVariable.woff2`에서 적용됩니다.
- 정적 에셋 경로 `/assets/...`와 폰트 경로 `/fonts/...`가 200 응답을 반환합니다.
- `npm run lint`, `npm run build`가 통과합니다.

## 2단계 구현 기준

현재 진행 중인 공개 메인 페이지 구현 기준입니다.

- Header
- Hero
- News
- Subscribe
- ProductTabs
- Stats
- Awards
- FooterNavigation
- FooterLegal

제품 탭은 하나의 `ProductTabs` 컴포넌트에서 D.AMO, WAPPLES, iSIGN, Cloudbric 데이터를 전환합니다.

현재까지 반영한 내용:

- `docs/typography-guide.md`의 텍스트 크기, 굵기, 색상 기준을 우선 적용합니다.
- Hero 헤드라인은 문서 기준 `Gotham Black`이지만 현재 프로젝트에는 Gotham 폰트 파일이 없어 `Gotham Black → Pretendard` fallback으로 처리되어 있습니다.
- News 더보기 링크에 우측 화살표를 추가했습니다.
- Subscribe 카드와 버튼의 radius, 버튼 텍스트 색상을 조정했습니다.
- ProductTabs 외곽 pill 컨테이너를 제거하고 개별 탭 버튼 구조로 조정했습니다.
- 제품 이미지는 감싸는 카드 없이 이미지만 보이도록 조정했습니다.
- Stats 구분선을 제거하고 수치 크기를 `24px` 기준으로 낮췄습니다.
- Awards 카드를 제거하고 중앙 정렬 구조로 조정했습니다.
- FooterNavigation/FooterLegal은 회색 배경과 FooterLegal 로고 좌측 배치로 조정했습니다.

남은 정밀 보정 순서:

1. Hero
2. News / Subscribe
3. ProductTabs / Product
4. Stats / Awards
5. Footer

다음 작업에서는 각 섹션을 ref-image와 직접 비교하면서 한 섹션씩 수정하고 검증합니다.

## 관리자 데모 편집 항목

`/admin-demo`에서 보여줄 편집 항목입니다.

- 상단 메뉴 텍스트와 링크
- Hero 문구
- 뉴스 항목 추가/수정/삭제/정렬
- 구독 영역 문구, 입력 placeholder, 버튼 텍스트/링크
- 구독 영역 내부 요소 순서 변경 (`text`, `input`, `button`)
- 제품 탭별 라벨, 제목, 설명, 버튼 링크, 에셋 경로
- 통계 항목
- 수상 로고, 제목, 설명
- Footer 메뉴와 회사 정보
- 메인 섹션 순서 변경

데모 단계에서는 실제 DB 저장, 인증, 권한, 이메일 발송, MinIO 업로드는 제외합니다.

## 구현 시 주의사항

- 공개 페이지 컴포넌트가 JSON 파일을 직접 import하지 않게 합니다.
- 데이터 접근은 `src/lib/content`로 분리합니다.
- 섹션 컴포넌트는 props만 받아 렌더링합니다.
- 콘텐츠 데이터에는 픽셀 좌표나 스타일 값을 넣지 않습니다.
- 색상, 간격, 타이포그래피는 Tailwind theme 또는 CSS 변수로 관리합니다.
- 자유형 페이지 빌더가 아니라 "통제된 테마 빌더"로 범위를 유지합니다.
- 데모 구현 후 각 단계별로 검증하고 다음 단계로 넘어갑니다.

## 다음 채팅에서 요청하면 좋은 문장

새 채팅에서는 아래처럼 시작하면 됩니다.

```txt
docs/HANDOFF.md와 docs/PROJECT_PLAN.md를 기준으로 1단계 JSON 기반 데모 스캐폴딩을 시작해주세요.
각 단계 완료 후 실행/구조 검증을 하고 다음 단계로 넘어가 주세요.
```
