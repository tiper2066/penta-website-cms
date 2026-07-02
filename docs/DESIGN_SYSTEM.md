# 디자인 시스템 초안

## 출처와 상태

이 문서는 Figma `penta website demo`의 `node-id=135:2`와 `ref-image/main_01.png`~`main_04.png`를 기준으로 작성한 데모용 디자인 시스템 초안입니다.

현재 Figma 변수 정의는 비어 있는 것으로 확인되었습니다. 따라서 아래 값은 공식 디자인 토큰이 아니라, 시안의 구조와 화면 비례를 기반으로 한 구현 출발점입니다. 텍스트 크기, 굵기, 색상은 `docs/typography-guide.md`를 우선 기준으로 사용합니다. 실제 프로젝트 단계에서는 Figma Variables, Text Styles, Components를 정식으로 정리하고 이 문서를 갱신해야 합니다.

## 디자인 원칙

- 기업 보안 브랜드에 맞게 넓은 여백, 낮은 채도 배경, 강한 제목 대비를 사용합니다.
- 콘텐츠는 1200px 중심 컨테이너 안에 배치합니다.
- 마케터가 수정 가능한 영역은 컴포넌트 구조 안에 제한합니다.
- 섹션 순서는 바꿀 수 있지만, 섹션 내부의 픽셀 단위 자유 배치는 허용하지 않습니다.
- 데스크톱 시안을 우선 구현하고, 모바일/태블릿 규칙은 데모 이후 요구사항으로 확장합니다.

## 레이아웃

Figma 프레임 기준:

- 화면 프레임: 1920px 너비
- 본문 컨테이너: 1200px 너비
- 좌우 기준 여백: 360px
- 메인 페이지 총 높이: 약 3801px

권장 CSS 변수:

```css
:root {
  --layout-page-max: 1920px;
  --layout-container: 1200px;
  --layout-gutter-desktop: 360px;
  --layout-section-gap: 120px;
}
```

실제 구현에서는 `max-width: 1200px; margin-inline: auto;`를 기본 컨테이너로 사용합니다.

## 컬러

시안에서 확인되는 주요 색상 그룹입니다. 정확한 hex 값은 구현 단계에서 Figma Inspector 또는 시안 샘플링으로 확정합니다.

| 토큰 | 용도 | 초안 값 |
|---|---|---|
| `color.background.page` | 페이지 배경 | `#f3f3f3` 근사 |
| `color.background.surface` | 뉴스레터/통계 카드 | `#ffffff` |
| `color.text.primary` | 대제목, 주요 텍스트 | `#111111` |
| `color.text.secondary` | 설명, 푸터 정보 | `#666666` |
| `color.text.muted` | 날짜, 보조 메타 | `#999999` |
| `color.brand.yellow` | Hero 원형 | `#ffc400` 근사 |
| `color.brand.blue` | Hero 사각형 | `#294798` 근사 |
| `color.brand.cyan` | Hero 삼각형 | `#62d6d1` 근사 |
| `color.border.default` | 구분선 | `#d9d9d9` |
| `color.button.primary` | CTA 버튼 배경 | `#111111` |
| `color.button.primaryText` | CTA 버튼 텍스트 | `#ffffff` |

주의:

- 데모에서는 위 값을 CSS 변수 또는 Tailwind theme로 관리합니다.
- 실제 프로젝트에서는 Figma Variables와 코드 토큰을 동기화합니다.

## 타이포그래피

시안의 브랜드 로고/제품 로고는 벡터 형태로 보이며, 일반 텍스트는 산세리프 계열입니다.

권장 폰트 전략:

- 국문/영문 공통: `Pretendard`, `Noto Sans KR`, system-ui 순서
- 외부 CDN 폰트는 사내망 운영 제약을 고려해 사용하지 않습니다.
- 폰트 파일이 필요하면 프로젝트에 포함하거나 사내 정적 파일 서버에서 제공합니다.

권장 타입 스케일:

| 토큰 | 용도 | 데스크톱 초안 |
|---|---|---:|
| `font.hero` | Hero "Technology For Trust" | 80px / 0.94 / 900 |
| `font.sectionTitle` | 섹션 대제목 | 54px / 약 1.18 / 700 |
| `font.productCategory` | 제품 카테고리 | 22px / 1.4 / 700 |
| `font.productTab` | 제품 탭 | 20px / 1.4 / 700 |
| `font.body` | 본문 설명, 뉴스레터 문구 | 20px / 1.5~1.6 / 400~600 |
| `font.news` | 뉴스 제목, 날짜, 배지 | 18px / 1.4 / 400~600 |
| `font.stat` | 통계 수치 | 24px / 1.2 / 700 |
| `font.footerCategory` | 푸터 카테고리 | 18px / 1.4 / 800 |
| `font.nav` | 상단 메뉴, 푸터 링크 | 14px / 1.4 / 500 |

반응형에서는 Hero와 섹션 타이틀을 우선 줄이고, 본문은 최소 15~16px을 유지합니다.

## 간격

Figma 시안은 큰 여백과 얇은 구분선을 사용합니다.

권장 spacing 토큰:

| 토큰 | 값 | 용도 |
|---|---:|---|
| `space.2xs` | 4px | 세밀한 아이콘 간격 |
| `space.xs` | 8px | 텍스트 내부 간격 |
| `space.sm` | 16px | 작은 컴포넌트 간격 |
| `space.md` | 24px | 폼/버튼 간격 |
| `space.lg` | 40px | 섹션 내부 그룹 간격 |
| `space.xl` | 64px | 섹션 묶음 간격 |
| `space.2xl` | 96px | 큰 섹션 간격 |
| `space.3xl` | 120px | 주요 섹션 상하 여백 |

## 컴포넌트 규칙

### Header

- 1200px 컨테이너 안에서 로고, 메뉴, 검색, 유틸 아이콘을 배치합니다.
- 상단 y 위치는 Figma 기준 약 50px입니다.
- 메뉴는 5개 그룹: Products, Solutions, Resources, Support, Company.
- 데모에서는 hover 드롭다운을 제외하고 단순 링크로 시작합니다.

### Hero

- 좌측에는 보조 문구와 대제목을 배치합니다.
- 우측에는 노란 원, 파란 사각형, 흰 반투명 오브젝트, 민트 삼각형을 조합합니다.
- Hero 오브젝트는 편집자가 개별 위치를 바꾸지 않고 프리셋/이미지 교체만 할 수 있게 합니다.

### News

- 상단에 얇은 구분선을 둡니다.
- 왼쪽에는 NEW 배지와 제목, 오른쪽에는 날짜를 둡니다.
- 데모에서는 최대 5개 항목을 기본 노출합니다.
- 실제 프로젝트에서는 목록 수, 카테고리, 상세 페이지 여부를 별도 확정합니다.

### Subscribe

- 흰색 카드형 영역입니다.
- 기본 높이는 Figma 기준 132px입니다.
- 내부 요소는 `text`, `input`, `button`으로 구성합니다.
- 순서 변경은 허용하되, 디자인 안정성을 위해 프리셋 기반으로 제한합니다.

### ProductTabs

- 4개 탭을 동일 너비 버튼으로 배치합니다.
- 활성 탭은 검정 배경과 흰 텍스트를 사용합니다.
- 탭 아래에는 카테고리, 제품명/로고, 구분선, 설명, CTA, 제품 시각 에셋을 배치합니다.
- D.AMO, WAPPLES, iSIGN, Cloudbric은 같은 컴포넌트 구조에 다른 데이터만 주입합니다.

### Stats

- 흰색 카드 안에 7개 지표를 가로로 나열합니다.
- 숫자와 라벨을 분리합니다.
- 모바일에서는 2열 또는 1열 그리드로 전환하는 것을 권장합니다.

### Awards

- 3개 수상/인증 항목을 가로로 배치합니다.
- 각 항목은 로고, 제목, 설명으로 구성합니다.
- 데모에서는 정적 배열로 처리하고, 실제 프로젝트에서 캐러셀/페이지네이션 필요 여부를 확인합니다.

### Footer

- 상단 FooterNavigation은 5개 그룹 구조입니다.
- 하단 FooterLegal은 로고, 개인정보 처리방침, 유틸 링크, 회사 정보로 구성합니다.
- 편집자는 링크 텍스트와 URL을 수정할 수 있어야 합니다.

## 반응형 초안

데모 1차는 데스크톱 중심입니다. 다만 실제 프로젝트 확장을 위해 아래 기준을 염두에 둡니다.

| 구간 | 기준 | 처리 |
|---|---:|---|
| Desktop | 1280px 이상 | 1200px 컨테이너 |
| Tablet | 768px~1279px | 컨테이너 좌우 32px |
| Mobile | 767px 이하 | 컨테이너 좌우 20px, 섹션 단일 컬럼 |

모바일에서 자유 편집을 허용하면 레이아웃이 쉽게 깨집니다. 따라서 관리자에서 수정 가능한 것은 콘텐츠와 순서로 제한하고, 반응형 배치는 컴포넌트가 책임져야 합니다.

## 실제 프로젝트로 확장할 때 보강할 항목

- Figma Variables 기반 컬러/간격/폰트 토큰 확정
- Text Styles 정리
- Button, Input, Tab, Card, Section 컴포넌트 명세
- Logo와 제품 로고 에셋 관리 기준
- 이미지 업로드 비율과 최소 해상도
- 접근성 기준: 명도 대비, 키보드 포커스, alt 텍스트
- SEO 기준: heading hierarchy, meta title/description
