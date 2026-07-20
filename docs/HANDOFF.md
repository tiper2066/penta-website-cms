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
- 2단계 공개 페이지 데모 구현은 완료되었습니다.
- 데모용 D.AMO 개요 페이지 `/products/data-security`와 라인업 상세 페이지 `/products/data-security/on-application`, `/products/data-security/on-db`, `/products/data-security/on-os`가 추가되었습니다.
- `ref-image/main_01.png`와 `ref-image/main_01.html`을 기준으로 Header, Hero, News, Subscribe, ProductTabs, Stats, Awards, FooterNavigation, FooterLegal 정밀 보정을 완료했습니다.
- `ref-image/sub-page/sub-damo.html`, `ref-image/sub-page/sub-damo-detail.html`을 기준으로 D.AMO 개요/상세 페이지 데스크톱 구현을 완료했습니다.
- 2.5단계 공개 페이지 반응형 보정은 완료되었습니다. 공통 Header/Footer, 메인 페이지 섹션, D.AMO 개요/상세 페이지의 모바일/태블릿 레이아웃을 보정했고, 모바일 테스트 피드백까지 반영했습니다.
- 3단계 관리자 데모(`/admin-demo`) 편집 UI 구현은 완료되었습니다. 좌측 편집 패널과 우측 실시간 미리보기(iframe) 구조로, 공개 페이지 JSON 전 항목을 편집하고 즉시 미리볼 수 있습니다.
- 3.5단계(관리자 속성 패널 개편) Phase A·B를 완료했습니다. 좌측 상단 카테고리 버튼을 shadcn `Select` "편집 대상" 드롭다운으로 대체하고, shadcn `Accordion`(다중 펼침)으로 편집합니다. `홈` 대상은 섹션 레지스트리 기반으로 `sections[]` 순서대로 렌더하며, 각 아코디언 헤더에서 순서 이동·노출 토글·삭제를 제공합니다(별도 "섹션 순서" 패널 제거). 선택 대상/펼침 상태는 `localStorage`에 유지됩니다. 이어서 Phase B+로 모든 순서 변경을 드래그 핸들(`::`, `@dnd-kit`) 방식으로 전환했고(푸터는 그룹 순서 + 그룹 간 링크 이동 지원), Phase C(미리보기 하이라이트)까지 완료했습니다. 편집기에서 아코디언을 펼치면 iframe 미리보기의 해당 영역이 오버레이로 강조되고 해당 위치로 스크롤됩니다. 이로써 3.5단계 범위(Phase A~C)가 모두 완료되었습니다.
- Hero 및 제품 비주얼은 `ref-image/hero-visual/*.html`, `ref-image/products-visual/*.html`의 Figma HTML을 참고해 `src/components/visuals/figma-visuals.tsx`로 React 컴포넌트화했습니다.
- Cloudbric 구름 비주얼은 `ref-image/products-visual/mask-cloud.png`를 CSS mask로 사용합니다.
- Awards는 `src/components/sections/awards-carousel.tsx` 클라이언트 컴포넌트로 분리되어 자동 Carousel, hover pause, dot navigation을 제공합니다.
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
- `docs/RESPONSIVE_IMPLEMENTATION_PLAN.md`: 2.5단계 공개 페이지 반응형 상세 계획
- `docs/ADMIN_PANEL_IMPLEMENTATION_PLAN.md`: 3.5단계 관리자 속성 패널 개편 상세 계획

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
- `ref-image/main_01.html`: Figma 기준 전체 페이지 구현 참고 HTML
- `ref-image/sub-page/sub-damo.html`: D.AMO 개요 페이지 참고 HTML
- `ref-image/sub-page/sub-damo-detail.html`: D.AMO 라인업 상세 페이지 참고 HTML
- `ref-image/sub-page/sub-damo.png`: D.AMO 개요 페이지 참고 이미지
- `ref-image/sub-page/sub-damo-detail.png`: D.AMO 라인업 상세 페이지 참고 이미지

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
      cyber-security.svg
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

추가 참고 에셋:

- `ref-image/products-visual/mask-cloud.png`: Cloudbric 구름 유리 도형의 CSS mask로 사용합니다.

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
      visuals/
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

완료된 공개 메인 페이지 구현 기준입니다.

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
- Header 로고, 메뉴 텍스트, 검색 필드, 검색/언어 아이콘 크기를 시안 기준으로 조정했습니다.
- Hero 타이틀 자간, 노란 원/파란 사각형/유리 사각형/녹색 삼각형 크기와 위치, Header/News 간격을 조정했습니다.
- News는 더보기 링크, 6개 뉴스 목록, 배지 없는 행의 좌측 정렬, 날짜 폭 정렬을 반영했습니다.
- Subscribe는 카드 높이, input/button 높이, 버튼 텍스트 색상을 조정했습니다.
- ProductTabs는 제목 굵기 분리, 84px 탭 버튼, 제품별 3줄 설명, 42px 분리선, 상세 버튼, D.AMO/WAPPLES/iSIGN/Cloudbric 비주얼 위치를 반영했습니다.
- Stats는 라벨/값 순서를 바꾸고 값 텍스트를 `20px` bold, nowrap, 유연한 flex layout으로 조정했습니다.
- Awards는 `AwardsCarousel` 클라이언트 컴포넌트로 분리해 자동 스크롤, hover pause, dot navigation을 구현하고 Cyber Security 수상 항목을 추가했습니다.
- FooterNavigation/FooterLegal은 메뉴 분리선, Company 컬럼 폭, 회사 로고/개인정보/우측 링크/회사 정보 3줄 레이아웃을 조정했습니다.
- `src/components/visuals/figma-visuals.tsx`에서 Hero와 D.AMO/WAPPLES/iSIGN/Cloudbric 제품 비주얼을 CSS 도형으로 렌더링합니다.

## 추가 공개 페이지 구현 기준

데모용 서브 페이지 구현 기준입니다.

- `/products/data-security`
  - D.AMO Hero, 문제 제기, 선택 이유, 라인업 카드, 수상/인증 placeholder, 제품 구성 placeholder, FAQ를 렌더링합니다.
  - 라인업 카드 3개는 상세 페이지로 이동하는 전체 카드 링크입니다.
- `/products/data-security/[lineup]`
  - `on-application`, `on-db`, `on-os` slug를 지원합니다.
  - URL에 맞는 D.AMO 라인업 탭과 상세 콘텐츠가 활성화됩니다.
- `src/components/ui/primary-cta-link.tsx`
  - 검은 배경 CTA의 흰색 텍스트를 컴포넌트 내부에서 보장합니다.
- `src/components/ui/tab-link.tsx`
  - 라인업 상세 탭의 최대 폭, 좌측 정렬, 활성 탭 텍스트 색상을 공통 처리합니다.

## 2.5단계 반응형 구현 기준

완료된 반응형 보정입니다.

- Header
  - 데스크톱 full down wide menu는 유지합니다.
  - 모바일에서는 햄버거 버튼과 우측 drawer 메뉴를 제공합니다.
  - drawer 메뉴는 `footer.groups` 기반 전체 메뉴 구조를 재사용합니다.
  - 스크롤 시 sticky header에 shadow와 backdrop blur가 적용됩니다.
- Footer
  - 데스크톱 5열 메뉴는 유지합니다.
  - 모바일에서는 메뉴 그룹을 accordion 형태로 표시하고 회사 정보를 세로 배치합니다.
  - 430px 이하에서는 사업자 등록번호 줄을 `:` 기준으로 줄바꿈합니다.
- 메인 페이지
  - Hero 타이틀과 장식 비주얼을 모바일에서 축소하고, 데스크톱 배치 비율에 가깝게 재배치했습니다.
  - News는 모바일 세로 목록으로 전환했습니다.
  - Subscribe는 모바일에서 text/input/button stack과 full width 입력/CTA를 사용합니다.
  - ProductTabs는 모바일 2열 탭, 설명 하단 비주얼, 축소된 제품 비주얼을 사용합니다.
  - Stats는 모바일 2열 카드 grid로 전환했습니다.
  - Awards Carousel은 viewport에 따라 mobile 1개, tablet 2개, desktop 3개 노출로 동작합니다.
- D.AMO 개요 페이지
  - Hero padding, 제목 크기, CTA stack, Benefits 카드, Lineup 카드, placeholder, FAQ를 모바일 기준으로 보정했습니다.
- D.AMO 상세 페이지
  - Hero 타이포, `TabLink` stack/wrap, 상세 카드 padding과 bullet 영역을 모바일 기준으로 보정했습니다.

## 3단계 관리자 데모 구현 기준

완료된 관리자 데모 편집 UI 구현 기준입니다.

- `/admin-demo`
  - 좌측 편집 패널 + 우측 실시간 미리보기(iframe) 2열 레이아웃입니다.
  - 편집 카테고리: 네비게이션, 섹션 순서, Hero, News, Subscribe, Product Tabs, Stats, Awards, Footer.
  - 반복 항목(뉴스/통계/수상/메뉴/제품 탭/구독 요소/섹션)은 위·아래 이동, 추가·삭제를 지원하며 섹션은 노출 토글을 제공합니다.
  - 상단에 자동 저장 상태 표시, 초기화(기본 JSON 복원), `demo-site.json` 내보내기, 공개 페이지 링크를 제공합니다.
  - 미리보기는 데스크톱/태블릿/모바일 폭 토글을 제공합니다.
- `/admin-demo/preview`
  - 편집 상태를 반영하는 미리보기 전용 라우트입니다. 실제 공개 페이지 컴포넌트(`SiteHeader`, `SectionRenderer`, `SiteFooter`)를 재사용합니다.
- `src/lib/content/admin-store.ts`
  - `localStorage` + `BroadcastChannel` + `storage` 이벤트 기반 클라이언트 편집 스토어입니다.
  - 편집기와 미리보기가 `useSyncExternalStore`로 같은 스냅샷을 구독하므로, 편집 즉시 미리보기에 반영됩니다.
- `src/components/admin/admin-editor.tsx`, `admin-panels.tsx`, `admin-fields.tsx`
  - 각각 편집기 셸/레이아웃, 카테고리별 편집 패널, 재사용 입력·반복 컨트롤을 담당합니다.
- `src/components/ui/textarea.tsx`, `src/components/ui/label.tsx`
  - 편집 폼에 사용하는 추가 UI 프리미티브입니다.
- 데모 범위에서 실제 DB 저장, 인증, 권한, 이메일 발송, 파일 업로드는 제외했습니다.

## 3.5단계 관리자 속성 패널 개편 계획

`docs/ADMIN_PANEL_IMPLEMENTATION_PLAN.md`에 상세 계획을 문서화했으며, Phase A·B·B+·C를 모두 완료했습니다(3.5단계 범위 완료). 이어서 3.5 범위 밖 후속인 Phase D(멀티 페이지 데이터 모델 전환)까지 완료했습니다.

Phase D (멀티 페이지 데이터 모델) 완료 내용:

- `SiteContent.pages`를 `{ home: HomePageContent }` 맵 → `PageContent[]` 배열로 전환했습니다. `PageContent = { id, slug, title, sections }`로 `id`를 추가해 Payload `Pages` Collection 매핑·정렬 키를 확보했습니다.
- `src/content/demo-site.json`의 `pages`를 배열로 이관(`home`에 `"id": "home"`). 공개 렌더링 영향 없음.
- 신규 헬퍼 `src/lib/content/helpers.ts`(`getPage`/`getHomePage`/`getHomeSections`/`getPageLabel`/`HOME_PAGE_ID`)를 도입해 `site.ts`(홈 로더), `admin-demo/preview/page.tsx`, `admin-panels.tsx`(섹션 find/mutate), `admin-editor.tsx`를 갱신했습니다. `admin-store.ts` 기본 스냅샷은 `getSiteContent()` 경유로 자동 반영됩니다.
- `admin-editor.tsx`의 "편집 대상" 드롭다운을 실제 `content.pages` 기반으로 렌더(공통 요소 최상단 + 페이지 목록)하고, 섹션 아코디언·DnD 순서·노출 토글·삭제·하이라이트를 선택 페이지(`getPage(draft, target)`) 기준으로 일반화했습니다. 현재 페이지는 `홈` 1개라 기존 동작과 동일합니다.
- 검증: `npm run typecheck`, `npm run lint`, `npm run build` 통과. `/`, `/admin-demo`, `/admin-demo/preview` 200 응답 확인. 브라우저 회귀 검증(공개 메인, 편집기 드롭다운·섹션 순서/노출/삭제, 미리보기·하이라이트, JSON 내보내기)까지 이상 없음을 확인했습니다.

Phase D 확장 (서브 페이지 완전 이관 + 페이지/섹션 관리 UI) 완료 내용:

- 하드코딩되어 있던 `/products/data-security`(개요)와 `/products/data-security/[lineup]`(상세) 콘텐츠를 `demo-site.json`의 `pages[]` 항목(`data-security`, `data-security-lineup`)으로 완전히 이관했습니다.
- 서브 페이지용 섹션 타입 8종(`productHero`, `statement`, `benefits`, `lineupCards`, `placeholder`, `faq`, `pageHeader`, `lineupDetail`)과 각 뷰 컴포넌트(`src/components/sections/*`)를 신설하고 `section-renderer.tsx`에 연결했습니다. `lineupDetail`은 `activeLineupSlug`로 활성 탭을 결정합니다.
- 공개 라우트 2개를 `getPage()`+`SectionRenderer` 기반으로 재작성했습니다. `[lineup]`의 `generateStaticParams`/`generateMetadata`도 JSON에서 파생하며, 빌드 시 on-application/on-db/on-os 3개 라우트가 그대로 생성됩니다. 시각 결과는 기존과 동일합니다.
- 편집기: "편집 대상" 드롭다운에 `+ 페이지 추가`, 서브 페이지 선택 시 `페이지 삭제`(홈 제외)·페이지 제목/slug 설정, 페이지 하단에 `+ 섹션 추가`(14개 타입, `section-templates.ts` 기본값)를 추가했습니다.
- 신규 섹션 편집 패널은 `pageId`+`section.id`로 대상 섹션을 직접 편집하므로 같은 타입 중복(placeholder 2개 등)도 안전합니다. `lineupDetail`은 라인업→카드→블록→항목의 깊은 중첩을 아래 "편집기 UX 개선"의 드릴-인 방식으로 편집합니다.
- `/admin-demo/preview`가 UI 편집 대상을 구독해 현재 선택한 페이지의 섹션을 렌더합니다.
- **미리보기↔패널 페이지 동기화**: 미리보기 내부의 내부 링크 클릭을 가로채(실제 이동 차단) `slug`→페이지 매핑(`resolvePageIdByPath`)으로 편집 대상만 전환합니다. 매칭되는 편집용 페이지가 없는 링크(예: `/company`)는 무시합니다. 안전장치로, 편집 대상이 바뀌었는데 iframe이 미리보기 라우트를 벗어나 있으면 미리보기 라우트로 되돌려 동기화를 회복합니다.
- 검증: `npm run typecheck`, `npm run lint`, `npm run build` 통과. `/`, `/products/data-security`, `/products/data-security/{on-application,on-db,on-os}`, `/admin-demo`, `/admin-demo/preview` 200 응답 및 이관 콘텐츠 렌더 확인.

편집기 UX 개선 (드릴-인 네비게이션 + 리사이즈 스플리터) 완료 내용:

- **리사이즈 스플리터**: 좌측 편집 패널과 우측 미리보기 사이에 세로 드래그 핸들을 추가했습니다(데스크톱 lg 이상). `flex` 레이아웃 + CSS 변수(`--panel-w`)로 너비를 제어하며 범위는 **320~760px**, 미리보기 영역이 최소 360px 유지되도록 상한을 함께 제한합니다. 조절 값은 `localStorage`(`penta-cms:admin-demo:ui:panelWidth`)에 저장되고, 핸들을 더블클릭하면 기본값(380px)으로 초기화됩니다. 서버/최초 렌더는 기본값으로 일치시키고 마운트 후 1회 복원해 하이드레이션 안전을 확보했습니다.
- **공통 드릴-인 편집기(`src/components/admin/drill-in.tsx`)**: 깊게 중첩된 목록을 한 번에 한 레벨씩만 보여주는 재사용 컴포넌트입니다. 브레드크럼(경로 클릭 이동) + "뒤로" + 현재 레벨 목록(드래그 정렬·추가·삭제)으로 구성되며, 자식이 있는 노드는 "N개 편집 →"로 파고들고 말단(leaf) 노드는 목록에서 바로 인라인 편집합니다. 내비게이션 경로(`path`)는 매 렌더 실제 데이터에서 파생하므로 삭제된 노드가 있어도 안전하게 자동 정리됩니다.
- **`lineupDetail` 적용**: 기존 3단 인라인 중첩(라인업→카드→블록)을 드릴-인으로 교체해 좁은 패널에서도 편집이 편해졌습니다.
- **`footer` 적용(옵션 요청 반영)**: `메뉴 그룹 → 링크`를 드릴-인으로 전환했습니다. 기존 "링크를 다른 그룹으로 드래그 이동"은 드릴-인 구조상 사라지므로, 각 링크 편집 화면에 **"그룹 이동" 선택 상자**를 추가해 동일 기능을 유지했습니다(그룹이 2개 이상일 때 노출). 하단 법무/회사 정보는 중첩이 얕아 기존처럼 인라인 유지합니다. 이 과정에서 기존 `FooterMenuEditor`/`FooterGroupRow`/`FooterLinkRow`(단일 `DndContext` 기반 그룹 간 이동)를 제거했습니다.
- 검증: `npm run typecheck`, `npm run lint`, `npm run build` 통과. 서브 페이지 정적 라우트(on-application/on-db/on-os) 생성 확인.

Phase A 완료 내용:

- 상단 카테고리 버튼 제거 → shadcn `Select` "편집 대상" 드롭다운(`공통 요소` 최상단, 그다음 `홈`).
- shadcn `Accordion`(`type="multiple"`) 도입. `공통 요소`→[네비게이션(헤더), 푸터]. 본문은 기존 편집 패널 재사용.
- 선택 대상 + 대상별 펼침 상태를 `localStorage`에 유지. `src/lib/content/admin-store.ts`에 UI 상태용 `useSyncExternalStore` 스토어 추가.
- 신규 파일: `src/components/ui/select.tsx`, `src/components/ui/accordion.tsx`. 신규 의존성: `@radix-ui/react-select`, `@radix-ui/react-accordion`.
- `globals.css`에 아코디언 펼침/접힘 애니메이션(`penta-accordion-down/up`) 추가.
- (참고) 초기화 확인은 브라우저 `confirm` 대신 shadcn `AlertDialog`로 교체했습니다. 신규 파일 `src/components/ui/alert-dialog.tsx`, 의존성 `@radix-ui/react-alert-dialog`.

Phase B 완료 내용:

- 섹션 타입 → 편집 폼 레지스트리(`SECTION_EDITORS`)를 도입하고, `홈` 대상은 `content.pages.home.sections[]`를 순서대로 순회해 아코디언으로 렌더(아코디언 `value` = 섹션 `id`).
- 아코디언 헤더에 순서 이동(위/아래)·노출 토글(Eye/EyeOff)·삭제(Trash2)를 통합. 헤더 액션은 트리거의 형제로 배치해 클릭 시 토글되지 않음. 숨김 섹션은 라벨을 흐리게 처리하고 "숨김" 배지 표시.
- 별도 "섹션 순서" 패널(`SectionsPanel`) 제거. `admin-panels.tsx`에서 `SECTION_TYPE_LABELS`를 export해 편집기에서 재사용.
- 아코디언 chevron을 좌측으로 이동해 헤더 우측에 액션 공간 확보.
- 검증: `npm run typecheck`, `npm run lint`, `npm run build` 통과. 세 라우트 200 응답 확인.

Phase B+ (드래그 앤 드롭 정렬) 완료 내용:

- 위/아래 화살표 이동을 **드래그 핸들(`::`)** 방식으로 전면 교체(우측 끝 배치, 드래그 전용, 키보드 이동 미지원 · `PointerSensor`만 사용). `@dnd-kit/*` 사용.
- 공통 프리미티브 `src/components/admin/sortable.tsx`(`SortableList`/`SortableRow`/`DragHandle`/`RemoveButton`/`usePointerSortSensors`) 신설. `admin-fields.tsx`의 `RepeaterItem`·`IconButton`·`moveItem` 제거.
- 안정 정렬 키를 위해 모델에 `id` 추가(`IdentifiedLink`): `navigation.items`, `footer.groups`(+`items`), `footer.legal.utilityLinks`. `demo-site.json`도 갱신(공개 렌더링 영향 없음).
- 평면 리스트 7종은 `SortableList`+`arrayMove`로 재정렬. 섹션 아코디언은 `SortableSectionItem`(`useSortable`)로 헤더 핸들 드래그.
- **푸터**: 그룹 순서 변경 + 링크의 **그룹 간 이동** 지원(단일 `DndContext` + `active.id` prefix 구분 + 그룹별 `useDroppable` 존 + `DragOverlay`). → 이후 "편집기 UX 개선"에서 드릴-인 방식으로 교체되었고, 그룹 간 이동은 링크별 "그룹 이동" 선택 상자로 대체되었습니다.
- 검증: `npm run typecheck`, `npm run lint`, `npm run build` 통과. `/admin-demo`, `/admin-demo/preview` 200 응답 확인.

Phase C (미리보기 하이라이트) 완료 내용:

- 편집기→미리보기 iframe `postMessage` 채널(`source: "penta-admin"`). `preview-ready` 핸드셰이크로 초기 메시지 유실을 방지하고, 이후 활성 대상 변경 시 `{ type: "active-target", target, label }` 전송. 수신 측은 `origin`/`source` 검증.
- 활성 대상 = 현재 편집 대상의 펼친 아코디언 중 **마지막으로 펼친 하나**(결정 5). 홈은 `section:<id>`, 공통은 `global:navigation`/`global:footer`.
- 미리보기 마킹: 섹션은 `data-preview-id` 래퍼, 헤더/푸터는 `SiteHeader`/`SiteFooter`의 옵션 `previewId` prop으로 부여(헤더 `sticky` 유지 위해 래퍼 대신 prop).
- `PreviewHighlight`(신규)가 `requestAnimationFrame`로 대상 위치를 추적해 `fixed` 오버레이(브랜드 블루 ring + "편집 중" 칩)를 그리고 `scrollIntoView`로 이동. `prefers-reduced-motion` 존중.
- 검증: `tsc --noEmit`, `npm run lint`, `npm run build` 통과. 세 라우트 200 + `data-preview-id` 마커 렌더 확인.

확정된 결정사항 요약:

- 좌측 상단 카테고리 탭을 "편집 대상" 드롭다운으로 대체합니다. 드롭다운은 `공통 요소`를 맨 위, 그 아래 페이지 목록(현재 `홈`)을 둡니다.
- 선택한 대상의 섹션들을 아코디언으로 펼쳐 편집합니다(shadcn `Accordion`, 다중 펼침).
- 드롭다운/아코디언 등 신규 UI는 shadcn 컴포넌트 라이브러리(Radix 기반)로 도입합니다.
- 미리보기에서 편집 중인 영역을 오버레이로 하이라이트합니다. 여러 아코디언이 펼쳐져 있어도 하이라이트는 마지막으로 펼친 하나만 표시하며, 헤더/푸터 전역 요소도 동일하게 하이라이트합니다.
- 편집기→미리보기 하이라이트 통신은 콘텐츠 스토어와 분리해 iframe `postMessage`로 처리합니다.
- 선택한 편집 대상과 아코디언 펼침 상태를 `localStorage`에 저장해 새로고침 후에도 유지합니다.
- 구현 순서(3.5 범위): Phase A(드롭다운+아코디언) → Phase B(섹션 구동형 아코디언·순서 통합) → Phase C(미리보기 하이라이트). 멀티 페이지 데이터 모델(`pages` 맵 → 배열) 전환은 Phase D로 분리했으며 3.5 범위 밖입니다.

## 실제 프로젝트 후속 요구사항 (Asset Manager)

데모 종료 후 실제 프로젝트로 확장할 때 반영할 요구사항입니다. 아직 구현 대상이 아니며, 요구사항 확정 단계(4단계)에서 세부 정책을 확정합니다.

- 관리자 화면에서 이미지 등을 경로 입력이 아니라 사용자 로컬 파일 선택 업로드 방식으로 전환합니다.
- 배경 이미지(다양한 포맷), mp4, PDF, 폰트, HTML 등 텍스트 외 다양한 포맷을 업로드·관리합니다.
- 삽입/변경할 모든 파일은 중앙 Asset Manager(Payload `Media`(Upload) 컬렉션 + MinIO 기반)에서 관리·재사용합니다.
- 현재 미디어 필드가 경로 문자열로 추상화되어 있고 컴포넌트가 URL 문자열 props만 받으므로, 데이터 소스를 Media 참조로 바꿔도 컴포넌트 재작성 없이 확장 가능합니다.
- 폰트/HTML은 통제된 방식(폰트 토큰화, HTML sanitize·격리·접근 제한)으로 취급하고, 업로드 확장자/MIME/용량 제한과 공개·비공개 버킷 분리, 백업/복구를 함께 설계합니다.
- 상세 방향은 `docs/CMS_CONTENT_MODEL.md`("Asset Manager (미디어 관리) 전환 방향"), `docs/REQUIREMENTS_WORKSHOP.md`("이미지와 파일"), `docs/LOCAL_AND_DOCKER.md`, `docs/PROJECT_PLAN.md`(5단계)에 문서화했습니다.

다음 세션 시작 시 권장 작업:

- 3.5단계 범위(Phase A~C)와 후속 Phase D(멀티 페이지 데이터 모델 전환) 및 Phase D 확장(서브 페이지 완전 이관 + 페이지/섹션 관리 UI)까지 완료되었습니다. 이후 후보는 다음과 같습니다(우선순위는 요구사항 워크숍에서 확정).
  1. **다른 제품군 서브 페이지 확장**: WAPPLES / iSIGN / Cloudbric 등 남은 제품 페이지도 동일한 섹션 모델로 추가하고, 공개 라우트를 slug 기반 동적 라우트로 일반화할지 검토합니다.
  2. **Asset Manager**(4·5단계): 경로 입력 → 로컬 파일 업로드, Payload `Media`(Upload) + MinIO 연동. 아래 "실제 프로젝트 후속 요구사항" 참고.
- 편집기 UX: 좌측 패널 리사이즈 스플리터와 깊은 중첩 섹션(`lineupDetail`)·푸터의 드릴-인 편집을 완료했습니다. 필요 시 다른 반복 섹션(benefits/faq/lineupCards 등)에도 동일 드릴-인 패턴을 확대 적용할 수 있습니다.
- 어떤 작업이든 완료 시 `npm run typecheck`, `npm run lint`, `npm run build`를 실행하고 `http://localhost:3000/admin-demo`, `http://localhost:3000/admin-demo/preview`를 확인합니다.

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
docs/HANDOFF.md와 docs/ADMIN_PANEL_IMPLEMENTATION_PLAN.md를 기준으로 3.5단계 Phase A(편집 대상 드롭다운 + shadcn 아코디언)부터 구현해 주세요.
확정된 결정사항(공통 요소 최상단, 다중 펼침, 마지막 펼침 하나만 하이라이트, Phase B 포함, 상태 localStorage 유지)을 반영하고, Phase 완료 후 typecheck/lint/build 검증을 해주세요.
```
