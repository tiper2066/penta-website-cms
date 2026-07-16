# 2.5단계: 공개 페이지 반응형 구현 계획

이 문서는 2단계에서 완성한 데스크톱 공개 페이지를 모바일/태블릿에서도 자연스럽게 사용할 수 있도록 보정하기 위한 실행 계획입니다.

## 진행 상태

상태: 완료

완료 요약:

- 공통 Header/Footer 모바일 레이아웃을 구현했습니다.
- 메인 페이지의 Hero, News, Subscribe, ProductTabs, Stats, Awards Carousel을 모바일/태블릿 기준으로 보정했습니다.
- D.AMO 개요 페이지와 D.AMO 라인업 상세 페이지의 Hero, CTA, Lineup cards, `TabLink`, 상세 카드, FAQ를 모바일 기준으로 보정했습니다.
- 모바일 테스트 피드백을 반영해 Hero 도형 비주얼 위치/크기, Footer 회사 정보 줄바꿈, Header scroll shadow/backdrop blur를 추가 보정했습니다.
- 검증 명령어 `npm run lint`, `npm run typecheck`, `npm run build`가 통과했습니다.

## 목표

- 데스크톱 기준 `ref-image/main_01.png` 재현 결과는 유지한다.
- 모바일에서는 픽셀 단위 시안 재현보다 탐색, 가독성, 터치 조작, 콘텐츠 흐름을 우선한다.
- 반응형 대상은 메인 페이지 1개와 데모용 D.AMO 서브 페이지 2개로 확장한다.
- 3단계 관리자 데모로 넘어가기 전에 공개 페이지의 반응형 구조를 안정화한다.
- 이후 실제 CMS 전환 시 섹션 컴포넌트와 JSON 콘텐츠 모델을 그대로 재사용할 수 있게 한다.

## 대상 공개 화면

이번 2.5단계에서 반응형을 확인할 화면은 다음 3개 계열입니다.

| 화면 | 경로 | 주요 확인 영역 |
|---|---|---|
| 메인 페이지 | `/` | Header, Hero, News, Subscribe, ProductTabs, Stats, Awards, Footer |
| D.AMO 개요 페이지 | `/products/data-security` | Hero, CTA, Benefits, Lineup cards, placeholder sections, FAQ |
| D.AMO 라인업 상세 페이지 | `/products/data-security/on-application`, `/on-db`, `/on-os` | Hero, `TabLink`, Detail cards, Footer |

## 기준 Breakpoints

권장 기준:

| 구간 | 기준 폭 | 목적 |
|---|---:|---|
| Mobile S | 360px | 작은 Android 대응 |
| Mobile M | 390px | iPhone 기준 확인 |
| Mobile L | 430px | 큰 모바일 기준 확인 |
| Tablet | 768px | 2열 전환 여부 확인 |
| Tablet Landscape | 1024px | 데스크톱 전환 직전 확인 |
| Desktop | 1440px 이상 | 2단계 데스크톱 디자인 회귀 확인 |

구현 기준:

- Tailwind 기본 breakpoint를 우선 사용한다.
- 섹션별 고정 px 값은 모바일에서 `clamp()`, `max-*`, `scale-*`, `grid-cols-*`, `h-auto`로 풀어낸다.
- 데스크톱 전용 절대 좌표는 `lg:` 이상에서만 유지하고, 모바일에는 별도 레이아웃을 둔다.

## 현재 데스크톱 구현 검토

현재 메인 페이지는 데스크톱 정밀 보정을 우선했기 때문에 다음 특성이 있습니다.

- Header는 메뉴가 `lg:flex`이고, 작은 화면에서는 내비게이션이 사라지지만 대체 메뉴가 없습니다.
- Header에는 데스크톱용 full down wide menu가 추가되어 있으며, 메뉴 데이터는 Footer와 같은 `footer.groups` 구조를 사용합니다.
- Hero는 `min-h-[720px]`, 대형 절대 좌표 도형, `80px` 타이틀을 사용합니다.
- News는 `md:grid-cols-[92px_1fr_132px]` 기준 목록입니다.
- Subscribe는 내부 카드가 `h-[132px]` 고정입니다.
- ProductTabs는 탭 버튼이 `84px` 높이이고, 제품 비주얼은 데스크톱 좌표에 강하게 의존합니다.
- Awards Carousel은 현재 3개 아이템 기준으로 `basis-1/3`를 사용합니다.
- Footer는 5열 메뉴와 우측 정렬 회사 정보가 데스크톱에 최적화되어 있습니다.

추가된 D.AMO 서브 페이지는 데스크톱 데모 기준으로 구성되어 있어 다음 특성이 있습니다.

- D.AMO 개요 페이지는 Hero 우측 자물쇠 비주얼, 4개 Benefits 카드, 라인업 링크 카드, FAQ를 포함합니다.
- D.AMO 개요 페이지의 라인업 카드 3개는 각각 상세 페이지로 이동하는 전체 카드 링크입니다.
- D.AMO 상세 페이지는 동적 라우트 `/products/data-security/[lineup]`로 구성되며, URL에 따라 `onApplication`, `onDB`, `onOS` 탭 콘텐츠가 활성화됩니다.
- 상세 페이지 탭은 공통 `TabLink` 컴포넌트를 사용하며, 최대 폭 285px과 좌측 정렬을 기본으로 합니다.
- 검은 배경 CTA는 공통 `PrimaryCtaLink`를 사용해 텍스트 대비 문제를 컴포넌트 차원에서 보장합니다.

따라서 모바일에서는 단순 축소보다 섹션별 구조 전환이 필요합니다.

## 선택된 기본 방향

이번 계획에는 아래 방향을 기본값으로 반영합니다.

- Header: 햄버거 버튼 + sheet 메뉴
- ProductTabs: 탭 → 제품 설명 → 비주얼 순서, 비주얼은 축소해 아래 배치
- D.AMO 개요 페이지: Hero와 라인업 카드의 1열 흐름 우선
- D.AMO 상세 페이지: `TabLink` 좌측 정렬/줄바꿈 유지, 모바일에서는 필요 시 full width stack

## 공통 레이아웃 및 UI 규칙

### Header / Footer

공통 파일:

- `src/components/layout/site-header.tsx`
- `src/components/layout/site-footer.tsx`

공통 방향:

- Header 데스크톱 full down wide menu는 유지합니다.
- 모바일 Header drawer에는 현재 full down wide menu와 같은 `footer.groups` 기반 메뉴 구조를 재사용합니다.
- 모바일 Header는 로고를 축소하고, 검색은 input pill 대신 아이콘 버튼으로 표시합니다.
- Footer는 모든 공개 페이지에서 공통으로 사용되므로 모바일 accordion 또는 세로 stack을 먼저 안정화합니다.
- Footer 회사 정보는 모바일에서 로고 → 개인정보 → 유틸 링크 → 회사 정보 순서로 재배치하고 좌측 정렬합니다.

### CTA / Tab

공통 파일:

- `src/components/ui/primary-cta-link.tsx`
- `src/components/ui/tab-link.tsx`

공통 방향:

- 검은 배경 CTA는 `PrimaryCtaLink`를 사용해 흰색 텍스트를 컴포넌트 내부에서 보장합니다.
- 모바일에서 CTA는 섹션 맥락에 따라 `w-full` 또는 콘텐츠 폭 기준 버튼 중 하나로 정합니다.
- 탭 링크는 `TabLink`를 기본 컴포넌트로 사용합니다.
- `TabLink`는 최대 폭 `285px`, 좌측 정렬, wrapping 가능 구조를 기본으로 합니다.
- 모바일에서는 사용 가능한 폭이 좁으면 `max-w`보다 `w-full`을 우선해 1열 stack을 허용합니다.
- 활성 탭의 검은 배경과 흰색 텍스트는 컴포넌트 내부에서 보장합니다.

## 메인 페이지 섹션별 구현 계획

### 1. Header

현재 파일:

- `src/components/layout/site-header.tsx`

현재 문제:

- `lg` 미만에서는 데스크톱 메뉴가 숨겨지지만 모바일 메뉴 진입점이 없습니다.
- 검색 input 폭이 모바일에서 과합니다.
- 로고가 206px이라 작은 화면에서는 Header 내 여백이 부족할 수 있습니다.

권장 구현:

- 모바일 로고 폭을 `150px~170px` 수준으로 축소하고 `lg:` 이상에서 206px을 유지합니다.
- 검색은 모바일에서 input pill 대신 `Search` 아이콘 버튼으로 표시합니다.
- 햄버거 버튼을 추가하고, 클릭 시 우측 또는 하단 sheet 메뉴를 표시합니다.
- sheet 안에는 주요 메뉴, 검색, 언어 선택을 함께 배치합니다.

선택 가능한 UX:

| 옵션 | 설명 | 추천 |
|---|---|---|
| 우측 drawer | 오른쪽에서 메뉴가 밀려 나오는 익숙한 모바일 내비게이션 | 추천 |
| 하단 sheet | 엄지 접근성이 좋고 앱 같은 느낌 | 대안 |
| 전체 화면 overlay | 브랜드 몰입감은 좋지만 구현과 닫기 UX가 더 중요 | 보류 |

권장 결정:

- 1차 구현은 우측 drawer를 사용합니다.
- drawer 폭은 `min(86vw, 360px)`로 제한합니다.
- 메뉴 항목은 20px 이상, 행 높이 52px 이상으로 터치 영역을 확보합니다.

### 2. Hero

현재 파일:

- `src/components/sections/hero-section.tsx`
- `src/components/visuals/figma-visuals.tsx`

현재 문제:

- `80px` 타이틀과 대형 도형이 모바일에서 겹칠 가능성이 큽니다.
- Hero 도형은 데스크톱 좌표에 맞춰져 있어 작은 화면에서는 잘리거나 주요 문구를 가릴 수 있습니다.
- `min-h-[720px]`가 모바일에서 과하게 길 수 있습니다.

권장 구현:

- 모바일 Hero는 `pt-[56px] pb-[96px] min-h-[520px]` 정도로 시작합니다.
- eyebrow는 `15px~16px`, title은 `clamp(48px, 14vw, 72px)` 수준으로 조정합니다.
- 도형은 타이틀 후면 장식으로 축소하고, 노란 원과 유리 사각형 중심으로 단순화합니다.
- 녹색 삼각형은 모바일에서 숨기거나 아주 작게 배치합니다.

선택 가능한 UX:

| 옵션 | 설명 | 추천 |
|---|---|---|
| 장식 축소 유지 | 현재 브랜드 무드를 유지하면서 모바일에서 겹침 방지 | 추천 |
| 도형 일부 숨김 | 가장 안정적이고 구현 비용 낮음 | 대안 |
| 모바일 전용 간단 SVG/이미지 | 완성도는 높지만 별도 디자인 작업 필요 | 추후 |

권장 결정:

- 모바일에서는 도형을 60~70% 수준으로 축소하고 `opacity`를 약간 낮춥니다.
- 텍스트 위계가 최우선이므로 도형은 항상 텍스트보다 낮은 z-index에 둡니다.

### 3. News

현재 파일:

- `src/components/sections/news-section.tsx`

현재 문제:

- 데스크톱 3열 구조는 모바일에서 날짜와 제목 폭이 부족합니다.
- 배지 없는 행은 좌측 정렬을 위해 grid span을 사용하고 있어 모바일 구조와 분리할 필요가 있습니다.

권장 구현:

- 모바일에서는 각 뉴스 항목을 세로 카드형 목록으로 표시합니다.
- `NEW` 배지는 제목 위 또는 제목 앞 inline badge로 둡니다.
- 날짜는 제목 아래 우측 또는 하단 메타 영역에 둡니다.
- 더보기 링크는 상단 우측 유지 또는 섹션 하단 버튼으로 이동할 수 있습니다.

선택 가능한 UX:

| 옵션 | 설명 | 추천 |
|---|---|---|
| 세로 리스트 | 뉴스형 콘텐츠에 가장 익숙하고 빠름 | 추천 |
| 카드형 박스 | 터치하기 쉽고 구분이 명확함 | 대안 |
| 상위 3개만 노출 + 더보기 | 모바일 길이 절약 | 미팅 목적이면 가능 |

권장 결정:

- 1차 구현은 6개 전체 노출 세로 리스트로 둡니다.
- 각 행은 `py-[14px]`, 제목 `16px`, 날짜 `14px`로 조정합니다.

### 4. Subscribe

현재 파일:

- `src/components/sections/subscribe-section.tsx`

현재 문제:

- 내부 카드가 `h-[132px]`로 고정되어 모바일에서 내용이 좁게 느껴질 수 있습니다.
- input과 button이 가로 배치라 작은 화면에서는 터치 폭이 부족합니다.

권장 구현:

- 모바일에서는 `h-auto`, `p-6`, `gap-4`로 전환합니다.
- 텍스트, input, button을 세로 stack으로 배치합니다.
- input과 button은 `w-full h-[50px]`로 유지합니다.
- 버튼은 CTA로 잘 보이도록 검정 배경과 흰색 텍스트를 유지합니다.

선택 가능한 UX:

| 옵션 | 설명 | 추천 |
|---|---|---|
| 세로 stack | 가장 명확하고 안전함 | 추천 |
| input/button 한 줄 유지 | 큰 모바일에서는 가능하지만 작은 화면 리스크 있음 | 보류 |
| floating subscribe CTA | 트렌디하지만 과함 | 추후 |

### 5. ProductTabs / Product

현재 파일:

- `src/components/sections/product-tabs-section.tsx`
- `src/components/visuals/figma-visuals.tsx`

현재 문제:

- 제목 `54px`, 탭 `84px`, 비주얼 절대 좌표가 모바일에는 큽니다.
- 제품별 비주얼이 `D.AMO 240px`, `WAPPLES 486px`, `iSIGN 308px`, `Cloudbric 352px` 등 서로 다른 고정 폭을 갖습니다.
- 데스크톱에서 탭 3/4 사이에 맞춘 좌표는 모바일에서 의미가 없습니다.

권장 구현:

- 제목은 모바일에서 `34px~40px`, 줄간격 `1.15`로 조정합니다.
- 탭은 2열 grid 또는 가로 scroll pill로 전환합니다.
- 선택된 기본 방향에 따라 콘텐츠 순서는 탭 → 제품 설명 → 비주얼로 둡니다.
- 제품 비주얼은 상세 설명 아래 중앙 배치하고, 모바일 전용 scale wrapper를 사용합니다.
- CTA 버튼은 `w-full` 또는 콘텐츠 폭 기준 `min-w-[160px]` 중 선택합니다.

선택 가능한 탭 UX:

| 옵션 | 설명 | 추천 |
|---|---|---|
| 2열 grid 탭 | 한눈에 4개 제품을 볼 수 있고 터치하기 쉬움 | 추천 |
| 가로 scroll pill | 트렌디하지만 일부 탭이 가려질 수 있음 | 대안 |
| select/dropdown | 공간 효율은 좋지만 제품 탐색성이 약함 | 보류 |

권장 결정:

- 1차 구현은 2열 grid 탭으로 진행합니다.
- 각 탭은 모바일에서 `h-[58px]`, `text-[16px] font-bold`로 조정합니다.
- 제품 비주얼은 `transform: scale()`보다 wrapper 폭과 CSS 변수 기반 크기 조정을 우선 검토합니다.

### 6. Stats

현재 파일:

- `src/components/sections/stats-section.tsx`

현재 문제:

- 현재 flex-wrap 구조는 긴 값 충돌은 줄였지만 모바일에서 항목 간 밀도가 어색할 수 있습니다.
- `해외지사` 값처럼 긴 텍스트는 작은 화면에서 overflow 위험이 있습니다.

권장 구현:

- 모바일에서는 2열 카드형 grid를 우선 사용합니다.
- 긴 값이 있는 항목은 `col-span-2` 또는 full width 처리 후보로 둡니다.
- 숫자 중심 항목은 작고 단단한 메트릭 카드로 정리합니다.

선택 가능한 UX:

| 옵션 | 설명 | 추천 |
|---|---|---|
| 2열 카드 grid | 정보 밀도와 가독성 균형이 좋음 | 추천 |
| 가로 scroll metrics | 앱 같은 느낌, 한 줄로 보여 트렌디함 | 대안 |
| 1열 list | 안정적이지만 길어짐 | 보류 |

권장 결정:

- 390px 기준 2열 grid를 사용합니다.
- 긴 `해외지사` 항목은 full width로 처리합니다.

### 7. Awards Carousel

현재 파일:

- `src/components/sections/awards-carousel.tsx`

현재 문제:

- 현재 `visibleItems = 3`, `basis-1/3`가 고정이라 모바일에서 3개가 눌려 보입니다.
- hover pause는 모바일 터치 환경에서는 의미가 약합니다.

권장 구현:

- 화면 폭에 따라 visible count를 변경합니다.
  - mobile: 1개
  - tablet: 2개
  - desktop: 3개
- dot navigation은 유지합니다.
- 모바일에서는 swipe 대응을 적극 검토합니다.

선택 가능한 UX:

| 옵션 | 설명 | 추천 |
|---|---|---|
| 1개씩 자동 Carousel | 수상 로고와 설명이 잘 보임 | 추천 |
| 1.15개 peek Carousel | 다음 카드가 살짝 보여 트렌디함 | 대안 |
| grid로 모두 노출 | 자동 Carousel 의미가 줄어듦 | 보류 |

권장 결정:

- 1차 구현은 1개씩 자동 Carousel로 안정화합니다.
- 시간이 가능하면 터치 swipe를 추가합니다.

### 8. Footer

현재 파일:

- `src/components/layout/site-footer.tsx`

현재 문제:

- 메뉴는 데스크톱 5열 구조이며 모바일에서는 너무 길게 내려갑니다.
- Company 컬럼과 회사 정보는 데스크톱 우측 정렬에 맞춰져 있습니다.
- 모바일에서는 개인정보, 유틸 링크, 주소 정보가 자연스러운 순서로 재배치되어야 합니다.

권장 구현:

- FooterNavigation은 accordion 구조로 전환합니다.
- 각 그룹 제목을 누르면 하위 메뉴가 열립니다.
- 기본은 첫 그룹만 열거나 모두 닫힌 상태 중 선택합니다.
- FooterLegal은 로고 → 개인정보 → 유틸 링크 → 회사 정보 순서로 세로 배치합니다.
- 회사 정보는 모바일에서 좌측 정렬합니다.

선택 가능한 UX:

| 옵션 | 설명 | 추천 |
|---|---|---|
| Accordion footer | 모바일에서 가장 흔하고 사용성이 좋음 | 추천 |
| 단순 세로 list | 구현은 쉽지만 길어짐 | 대안 |
| 메뉴 그룹 숨김 + 주요 링크만 표시 | 짧지만 정보 접근성이 낮음 | 보류 |

권장 결정:

- Accordion footer로 구현합니다.
- 첫 진입 시 모두 닫힌 상태를 권장합니다.

## D.AMO 개요 페이지 구현 계획

### 9. D.AMO Overview Hero

현재 파일:

- `src/app/products/data-security/page.tsx`

현재 문제:

- Hero는 `md:grid-cols-[1fr_240px]`로 데스크톱에서 텍스트와 자물쇠 비주얼을 2열 배치합니다.
- 모바일에서는 자물쇠 비주얼이 숨김 처리되어 있으나, 데모 화면에서 제품 정체성을 보여줄지 여부를 확인할 필요가 있습니다.
- Hero 하단 padding이 `pb-[200px]`로 커서 모바일에서 첫 화면 이후 공백이 과할 수 있습니다.
- 보조 CTA인 자료 다운로드 버튼은 작은 화면에서 문의하기 버튼과 한 줄 배치가 어려울 수 있습니다.

권장 구현:

- 모바일에서는 Hero를 1열로 두고 제목, 보조 문구, 설명, CTA 순서로 배치합니다.
- 자물쇠 비주얼은 모바일에서 숨김을 유지하거나 제목 아래 `160px~180px` 수준으로 축소 표시하는 두 안을 브라우저에서 비교합니다.
- Hero padding은 모바일에서 `pt-[64px] pb-[96px]` 수준으로 줄이고, `md:` 이상에서 현재 데스크톱 여백을 유지합니다.
- CTA는 모바일에서 `PrimaryCtaLink`와 outline 버튼을 `w-full`로 stack 처리합니다.

권장 결정:

- 1차 구현은 모바일에서 자물쇠 비주얼을 숨기고 텍스트/CTA 가독성을 우선합니다.
- 데모 확인 시 제품 시각 요소가 필요하면 `sm:` 이상에서 축소 표시합니다.

### 10. D.AMO Overview Content

현재 파일:

- `src/app/products/data-security/page.tsx`

현재 문제:

- 문제 제기 섹션의 강제 줄바꿈 `<br />`가 작은 화면에서 문장 흐름을 어색하게 만들 수 있습니다.
- Benefits 카드는 `md:grid-cols-2`, `xl:grid-cols-4` 구조이므로 모바일 1열은 자연스럽지만 카드 높이와 padding이 다소 큽니다.
- 회색 placeholder 영역은 높이 `260px~440px`로 모바일에서 과하게 길 수 있습니다.
- FAQ는 질문/답변 padding이 모바일에서 넓게 느껴질 수 있습니다.

권장 구현:

- 문제 제기 제목은 모바일에서 `<br />` 대신 자연 줄바꿈이 되도록 `hidden md:block` 또는 문장 재구성을 검토합니다.
- Benefits 카드는 모바일에서 1열, tablet에서 2열, desktop에서 4열을 유지합니다.
- Benefits 카드 padding은 모바일 `p-6`, desktop `px-7 py-8`로 조정합니다.
- placeholder 영역은 모바일에서 `h-[180px]~220px`, desktop에서 기존 높이를 유지합니다.
- FAQ는 모바일에서 질문 `17px~18px`, 답변 `15px~16px`, 좌측 padding 축소를 적용합니다.

### 11. D.AMO Lineup Cards

현재 파일:

- `src/app/products/data-security/page.tsx`

현재 문제:

- 라인업 카드 전체가 상세 페이지 링크이며, desktop에서는 `h3` 블록과 설명이 가로로 배치됩니다.
- 모바일에서 `h3` 블록은 full width에 가깝게 표시되어야 터치 가능한 카드 구조가 명확합니다.

권장 구현:

- 모바일에서는 카드 내부를 1열로 유지하고 `h3` 블록을 `w-full`로 둡니다.
- `h3` 블록은 배경 `#EDF2FF`, 중앙 정렬, 충분한 padding을 유지합니다.
- 상세 페이지로 이동 가능한 링크임을 알 수 있도록 hover/focus 스타일은 desktop에서만 가볍게 적용합니다.
- 터치 영역은 카드 전체로 유지하고 `focus-visible` 스타일을 추가합니다.

## D.AMO 상세 페이지 구현 계획

### 12. D.AMO Detail Hero

현재 파일:

- `src/app/products/data-security/[lineup]/page.tsx`

현재 문제:

- Hero 제목은 desktop 기준 `60px`까지 커집니다.
- 설명 문장은 한 문장 안에 `onApplication · onDB · onOS`가 포함되어 작은 화면에서 줄바꿈이 길어질 수 있습니다.

권장 구현:

- 모바일 제목은 `36px~42px`, tablet 이상은 현재 크기를 유지합니다.
- 설명은 모바일에서 `16px`, `leading-[26px]` 정도로 줄이고, 가독성을 위해 최대 폭을 제한합니다.
- Hero padding은 모바일에서 `pt-[64px] pb-[40px]`, desktop에서 현재 값에 가깝게 유지합니다.

### 13. D.AMO Detail Tabs

현재 파일:

- `src/app/products/data-security/[lineup]/page.tsx`
- `src/components/ui/tab-link.tsx`

현재 문제:

- `TabLink`는 최대 폭 `285px`과 좌측 정렬을 기준으로 하지만, 360px 화면에서는 탭 1개가 거의 전체 폭을 차지합니다.
- 활성 탭은 검은 배경이므로 텍스트 대비가 반드시 유지되어야 합니다.

권장 구현:

- 모바일에서는 탭을 1열 stack으로 두고 `w-full max-w-none` 또는 `max-w-[285px]` 중 더 자연스러운 쪽을 브라우저에서 확인합니다.
- tablet 이상에서는 현재처럼 좌측 정렬과 최대 285px 폭을 유지합니다.
- 탭 간격은 모바일 `gap-3`, tablet 이상 `gap-5`로 조정합니다.
- 활성 탭 텍스트 색상은 `TabLink` 내부 보장을 유지합니다.

권장 결정:

- 1차 구현은 모바일 `w-full`, tablet 이상 `max-w-[285px]`로 진행합니다.

### 14. D.AMO Detail Cards

현재 파일:

- `src/app/products/data-security/[lineup]/page.tsx`

현재 문제:

- 상세 카드의 bullet 콘텐츠가 길어 작은 화면에서 줄바꿈이 많아집니다.
- 카드 내부 padding과 왼쪽 들여쓰기가 모바일에서 넓게 느껴질 수 있습니다.

권장 구현:

- 카드 padding은 모바일 `px-5 py-6`, tablet 이상 `px-7 py-8`, desktop `md:px-9`로 조정합니다.
- 카드 제목은 모바일 `20px`, desktop `22px`를 유지합니다.
- 본문 bullet은 모바일 `15px leading-[25px]`를 유지하되, 왼쪽 padding은 `pl-0` 또는 `pl-3` 수준으로 줄입니다.
- 긴 bullet은 overflow 없이 줄바꿈되도록 `break-keep` 사용 여부를 섹션별로 확인합니다.

## 구현 우선순위

1. 공통 Header/Footer 모바일 구조와 기본 breakpoint 정리
2. 공통 UI인 `PrimaryCtaLink`, `TabLink`의 모바일 폭과 터치 영역 규칙 확정
3. 메인 페이지 Hero, ProductTabs, 제품 비주얼 스케일 정리
4. 메인 페이지 Subscribe, News, Stats 모바일 가독성 보정
5. 메인 페이지 Awards Carousel visible count와 swipe/터치 경험 보정
6. D.AMO 개요 페이지 Hero, Benefits, Lineup, FAQ 보정
7. D.AMO 상세 페이지 Hero, TabLink, Detail cards 보정
8. Footer accordion과 회사 정보 세로 배치
9. tablet, desktop 회귀 확인

## 구현 시 주의사항

- 데스크톱 보정값은 가능한 `lg:` 이상으로 유지합니다.
- 모바일 전용 스타일은 base 또는 `max-lg:`를 활용합니다.
- 콘텐츠 JSON에 viewport별 스타일 값을 넣지 않습니다.
- 제품 비주얼의 복잡한 CSS 도형은 모바일에서 숨기기보다 축소/단순화 우선으로 검토합니다.
- 접근성을 위해 모바일 메뉴, accordion, Carousel dot에는 `aria-*` 속성을 유지합니다.

## 검증 체크리스트

명령어 검증:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

브라우저 수동 확인:

- 360px 작은 Android 폭에서 `/`, `/products/data-security`, `/products/data-security/on-application` 확인
- 390px iPhone 폭에서 `/`, `/products/data-security`, `/products/data-security/on-db` 확인
- 430px 큰 모바일 폭에서 `/`, `/products/data-security`, `/products/data-security/on-os` 확인
- 768px tablet portrait에서 3개 화면 계열 확인
- 1024px tablet landscape에서 3개 화면 계열 확인
- 1440px 이상 desktop에서 데스크톱 회귀 확인

메인 페이지 확인:

- Header: 햄버거 메뉴 열기/닫기, 검색/언어 접근 가능 여부
- Hero: 타이틀과 도형 겹침 여부, 첫 화면에서 메시지 인지 가능 여부
- News: 제목/날짜 줄바꿈과 터치 영역
- Subscribe: input/button full width, 버튼 텍스트 가시성
- ProductTabs: 탭 전환, 제품 설명/비주얼 순서, CTA 터치 영역
- Stats: 긴 값 overflow 여부
- Awards: 자동 스크롤, dot navigation, hover pause, 모바일 visible count
- Footer: accordion 조작, 회사 정보 줄바꿈, 링크 터치 영역

D.AMO 개요 페이지 확인:

- Hero: 제목, 보조 문구, 설명, 자물쇠 비주얼이 겹치지 않는지 확인
- CTA: `문의하기`, `자료 다운로드` 버튼 텍스트가 배경 대비 명확히 보이는지 확인
- Benefits: 4개 카드가 mobile 1열, tablet 2열, desktop 4열로 자연스럽게 전환되는지 확인
- Lineup cards: 3개 카드 전체가 터치 가능한 링크이며 `h3` 블록이 모바일에서 잘리지 않는지 확인
- Placeholder sections: 회색 영역 높이가 모바일에서 과하게 길지 않은지 확인
- FAQ: 질문/답변 줄바꿈, padding, 터치 영역이 작은 화면에서 안정적인지 확인

D.AMO 상세 페이지 확인:

- Hero: 제목과 설명이 모바일에서 과하게 크거나 줄바꿈이 어색하지 않은지 확인
- Tabs: `onApplication`, `onDB`, `onOS` 탭이 좌측 정렬되고 모바일에서 overflow 없이 줄바꿈되는지 확인
- Active tab: 각 URL에 맞는 탭이 활성화되고 흰색 텍스트가 보이는지 확인
- Detail cards: 카드 제목, 소제목, bullet list가 overflow 없이 줄바꿈되는지 확인
- Route checks: `/products/data-security/on-application`, `/products/data-security/on-db`, `/products/data-security/on-os`가 각각 올바른 콘텐츠를 보여주는지 확인

공통 확인:

- 검은 배경 CTA와 활성 탭은 모든 viewport에서 텍스트가 명확히 보입니다.
- Header와 Footer는 3개 화면 계열에서 동일한 구조와 동작을 유지합니다.
- 데스크톱 full down wide menu는 `lg` 이상에서 기존처럼 동작합니다.
- 모바일 drawer/footer accordion이 추가되면 키보드 focus, 닫기 버튼, `aria-*` 상태를 확인합니다.

## 다음 결정 후보

반응형 구현 전 또는 구현 중 선택하면 좋은 항목입니다.

| 항목 | 추천안 | 대안 |
|---|---|---|
| Header sheet 방향 | 우측 drawer | 하단 sheet |
| Product tab 모바일 | 2열 grid | 가로 scroll pill |
| D.AMO 상세 tab 모바일 | 1열 full width | 최대 285px wrap |
| Stats 모바일 | 2열 카드 grid | 가로 scroll metrics |
| Awards 모바일 | 1개씩 Carousel | 다음 카드 peek Carousel |
| Footer 모바일 | Accordion | 단순 세로 list |

현재 권장 조합은 우측 drawer, 2열 제품 탭, D.AMO 상세 탭 1열 full width, 2열 통계 카드, 1개씩 Awards Carousel, Footer accordion입니다.
