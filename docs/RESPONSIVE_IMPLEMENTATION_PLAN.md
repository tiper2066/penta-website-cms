# 2.5단계: 공개 페이지 반응형 구현 계획

이 문서는 2단계에서 완성한 데스크톱 공개 페이지를 모바일/태블릿에서도 자연스럽게 사용할 수 있도록 보정하기 위한 실행 계획입니다.

## 목표

- 데스크톱 기준 `ref-image/main_01.png` 재현 결과는 유지한다.
- 모바일에서는 픽셀 단위 시안 재현보다 탐색, 가독성, 터치 조작, 콘텐츠 흐름을 우선한다.
- 3단계 관리자 데모로 넘어가기 전에 공개 페이지의 반응형 구조를 안정화한다.
- 이후 실제 CMS 전환 시 섹션 컴포넌트와 JSON 콘텐츠 모델을 그대로 재사용할 수 있게 한다.

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

현재 공개 페이지는 데스크톱 정밀 보정을 우선했기 때문에 다음 특성이 있습니다.

- Header는 메뉴가 `lg:flex`이고, 작은 화면에서는 내비게이션이 사라지지만 대체 메뉴가 없습니다.
- Hero는 `min-h-[720px]`, 대형 절대 좌표 도형, `80px` 타이틀을 사용합니다.
- News는 `md:grid-cols-[92px_1fr_132px]` 기준 목록입니다.
- Subscribe는 내부 카드가 `h-[132px]` 고정입니다.
- ProductTabs는 탭 버튼이 `84px` 높이이고, 제품 비주얼은 데스크톱 좌표에 강하게 의존합니다.
- Awards Carousel은 현재 3개 아이템 기준으로 `basis-1/3`를 사용합니다.
- Footer는 5열 메뉴와 우측 정렬 회사 정보가 데스크톱에 최적화되어 있습니다.

따라서 모바일에서는 단순 축소보다 섹션별 구조 전환이 필요합니다.

## 선택된 기본 방향

이번 계획에는 아래 방향을 기본값으로 반영합니다.

- Header: 햄버거 버튼 + sheet 메뉴
- ProductTabs: 탭 → 제품 설명 → 비주얼 순서, 비주얼은 축소해 아래 배치

## 섹션별 구현 계획

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

## 구현 우선순위

1. Header 모바일 메뉴와 기본 breakpoint 정리
2. Hero 모바일 레이아웃과 도형 스케일 정리
3. ProductTabs 모바일 구조와 제품 비주얼 스케일 정리
4. Subscribe, News, Stats 모바일 가독성 보정
5. Awards Carousel visible count와 swipe/터치 경험 보정
6. Footer accordion과 회사 정보 세로 배치
7. tablet, desktop 회귀 확인

## 구현 시 주의사항

- 데스크톱 보정값은 가능한 `lg:` 이상으로 유지합니다.
- 모바일 전용 스타일은 base 또는 `max-lg:`를 활용합니다.
- 콘텐츠 JSON에 viewport별 스타일 값을 넣지 않습니다.
- 제품 비주얼의 복잡한 CSS 도형은 모바일에서 숨기기보다 축소/단순화 우선으로 검토합니다.
- 접근성을 위해 모바일 메뉴, accordion, Carousel dot에는 `aria-*` 속성을 유지합니다.

## 검증 체크리스트

명령어 검증:

- `npm run typecheck`
- `npm run lint`
- `npm run build`

브라우저 수동 확인:

- 360px 작은 Android 폭
- 390px iPhone 폭
- 430px 큰 모바일 폭
- 768px tablet portrait
- 1024px tablet landscape
- 1440px 이상 desktop 회귀

섹션별 확인:

- Header: 햄버거 메뉴 열기/닫기, 검색/언어 접근 가능 여부
- Hero: 타이틀과 도형 겹침 여부, 첫 화면에서 메시지 인지 가능 여부
- News: 제목/날짜 줄바꿈과 터치 영역
- Subscribe: input/button full width, 버튼 텍스트 가시성
- ProductTabs: 탭 전환, 제품 설명/비주얼 순서, CTA 터치 영역
- Stats: 긴 값 overflow 여부
- Awards: 자동 스크롤, dot navigation, hover pause, 모바일 visible count
- Footer: accordion 조작, 회사 정보 줄바꿈, 링크 터치 영역

## 다음 결정 후보

반응형 구현 전 또는 구현 중 선택하면 좋은 항목입니다.

| 항목 | 추천안 | 대안 |
|---|---|---|
| Header sheet 방향 | 우측 drawer | 하단 sheet |
| Product tab 모바일 | 2열 grid | 가로 scroll pill |
| Stats 모바일 | 2열 카드 grid | 가로 scroll metrics |
| Awards 모바일 | 1개씩 Carousel | 다음 카드 peek Carousel |
| Footer 모바일 | Accordion | 단순 세로 list |

현재 권장 조합은 우측 drawer, 2열 제품 탭, 2열 통계 카드, 1개씩 Awards Carousel, Footer accordion입니다.
