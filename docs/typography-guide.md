# C type_01 — 텍스트 스타일 가이드

> **기본 폰트**: `Pretendard` (예외: Hero 헤드라인 `Gotham Black`)  
> **총 텍스트 노드**: 77개  
> **Figma 프레임**: `C type_01` (1920 × 3801px)

---

## 1. 타이포그래피 스타일 목록

| 역할 | Font Family | Size | Weight | Style | Color | 사용 예시 |
|------|------------|------|--------|-------|-------|---------|
| **Hero 헤드라인** | Gotham Black | 80px | 900 | Regular | `#222222` | "Technology For Trust" |
| **섹션 대제목** | Pretendard | 54px | mixed | mixed | `#222222` | "펜타시큐리티는 사이버 시큐리티 전 영역…" |
| **통계 수치** | Pretendard | 24px | 700 | Bold | `#222222` | "9000+", "800+", "385" |
| **제품 카테고리 탭 (활성)** | Pretendard | 22px | 700 | Bold | `#222222` | "암호 플랫폼" |
| **탭 레이블 / 카드 제목 (선택됨)** | Pretendard | 20px | 700 | Bold | `#ffffff` | "데이터 보안" |
| **탭 레이블 (비선택)** | Pretendard | 20px | 700 | Bold | `#000000` | "웹 보안", "인증 보안" |
| **본문 설명 텍스트** | Pretendard | 20px | 400 | Regular | `#222222` | "믿을 수 있는 사회, 펜타시큐리티의 보안기술…" |
| **뉴스레터 섹션 제목** | Pretendard | 20px | 600 | SemiBold | `#000000` | "뉴스레터를 구독하고 IT 및 보안 관련…" |
| **CTA 버튼 텍스트** | Pretendard | 20px | 500 | Medium | `#ffffff` | "자세히 보기" |
| **뉴스 카드 제목** | Pretendard | 18px | 600 | SemiBold | `#222222` | "펜타시큐리티·한국산업단지경영자연합회…" |
| **뉴스 날짜** | Pretendard | 18px | 400 | Regular | `#9a9a9a` | "2025-11-13" |
| **NEW 뱃지** | Pretendard | 18px | 600 | SemiBold | `#0c73ef` | "NEW" |
| **더보기 / 푸터 링크** | Pretendard | 18px | 500 | Medium | `#222222` | "펜타시큐리티 소식 더 보기" |
| **수상 기관 설명** | Pretendard | 18px | 400 | Regular | `#999999` | "2023년 클라우드 웹 애플리케이션…" |
| **구독하기 버튼** | Pretendard | 18px | 600 | SemiBold | `#ffffff` | "구독하기" |
| **푸터 카테고리 헤더** | Pretendard | 18px | 800 | ExtraBold | `#222222` | "Products", "Solutions" |
| **이메일 플레이스홀더** | Pretendard | 16px | 400 | Regular | `#9a9a9a` | "E-mail을 입력해주세요" |
| **통계 라벨** | Pretendard | 16px | 400 | Regular | `#6e6e6e` | "고객", "글로벌 고객" |
| **푸터 법인 정보** | Pretendard | 16px | 400 | Regular | `#222222` | "펜타시큐리티(주) 사업자 등록번호…" |
| **GNB 메뉴 / 푸터 링크** | Pretendard | 14px | 500 | Medium | `#222222` | "Products", "Data Security" |

---

## 2. 색상 팔레트

| 변수명 | Hex | 용도 |
|--------|-----|------|
| `--color-text-primary` | `#222222` | 기본 텍스트 (다크 차콜) |
| `--color-text-dark` | `#000000` | 강조 텍스트 (퓨어 블랙) |
| `--color-text-inverse` | `#ffffff` | 반전 텍스트 (어두운 배경용) |
| `--color-text-accent` | `#0c73ef` | 포인트 컬러 (NEW 뱃지, 링크) |
| `--color-text-sub` | `#6e6e6e` | 보조 라벨 (통계 단위) |
| `--color-text-muted` | `#9a9a9a` | 약한 보조 텍스트 (날짜, 플레이스홀더) |
| `--color-text-faint` | `#999999` | 매우 약한 보조 텍스트 (수상 설명) |

---

## 3. CSS 변수 정의

```css
/* =============================================
   C type_01 Typography & Color Design Tokens
   Figma Frame: C type_01 (1920 × 3801px)
   ============================================= */

:root {
  /* --- Font Family --- */
  --font-hero: 'Gotham Black', sans-serif;
  --font-base: 'Pretendard', sans-serif;

  /* --- Font Size Scale --- */
  --text-hero:        80px;  /* Hero headline */
  --text-section:     54px;  /* Section title */
  --text-stat:        24px;  /* Statistics number */
  --text-card-title:  22px;  /* Active tab / card title */
  --text-xl:          20px;  /* Subtitles, CTA buttons */
  --text-lg:          18px;  /* News cards, badges, buttons */
  --text-md:          16px;  /* Labels, footer info */
  --text-sm:          14px;  /* GNB menu, footer links */

  /* --- Font Weight Scale --- */
  --fw-black:      900;  /* Gotham Black */
  --fw-extrabold:  800;  /* Footer category headers */
  --fw-bold:       700;  /* Tabs, stats, card titles */
  --fw-semibold:   600;  /* News titles, badges, buttons */
  --fw-medium:     500;  /* GNB, CTA, footer links */
  --fw-regular:    400;  /* Body text, dates, labels */

  /* --- Text Color --- */
  --color-text-primary: #222222;  /* 기본 텍스트 */
  --color-text-dark:    #000000;  /* 강조 텍스트 */
  --color-text-inverse: #ffffff;  /* 반전 텍스트 (어두운 배경) */
  --color-text-accent:  #0c73ef;  /* 포인트 (NEW 뱃지, 링크) */
  --color-text-sub:     #6e6e6e;  /* 보조 라벨 */
  --color-text-muted:   #9a9a9a;  /* 날짜, 플레이스홀더 */
  --color-text-faint:   #999999;  /* 수상 기관 설명 등 */
}

## 4. 컴포넌트별 권장 스타일 (참고용)

Hero 섹션
  헤드라인  : font-family: Gotham Black, size: 80px, weight: 900, color: #222222
  서브타이틀: font-family: Pretendard,   size: 20px, weight: 400, color: #222222

섹션 타이틀
  대제목    : font-family: Pretendard, size: 54px, weight: mixed, color: #222222

제품 탭
  활성 탭   : font-family: Pretendard, size: 20px, weight: 700, color: #ffffff
  비활성 탭 : font-family: Pretendard, size: 20px, weight: 700, color: #000000
  카테고리  : font-family: Pretendard, size: 22px, weight: 700, color: #222222

통계 섹션
  수치      : font-family: Pretendard, size: 24px, weight: 700, color: #222222
  라벨      : font-family: Pretendard, size: 16px, weight: 400, color: #6e6e6e

뉴스 카드
  제목      : font-family: Pretendard, size: 18px, weight: 600, color: #222222
  날짜      : font-family: Pretendard, size: 18px, weight: 400, color: #9a9a9a
  NEW 뱃지  : font-family: Pretendard, size: 18px, weight: 600, color: #0c73ef

뉴스레터 섹션
  섹션 제목 : font-family: Pretendard, size: 20px, weight: 600, color: #000000
  구독 버튼 : font-family: Pretendard, size: 18px, weight: 600, color: #ffffff
  플레이스홀더: font-family: Pretendard, size: 16px, weight: 400, color: #9a9a9a

CTA 버튼
  버튼 텍스트: font-family: Pretendard, size: 20px, weight: 500, color: #ffffff

수상 기관 섹션
  기관명    : font-family: mixed (Pretendard + 기타), size: mixed, color: #222222
  설명 텍스트: font-family: Pretendard, size: 18px, weight: 400, color: #999999

GNB (상단 네비게이션)
  메뉴 항목 : font-family: Pretendard, size: 14px, weight: 500, color: #222222

푸터
  카테고리  : font-family: Pretendard, size: 18px, weight: 800, color: #222222
  링크 항목 : font-family: Pretendard, size: 14px, weight: 500, color: #222222
  법인 정보 : font-family: Pretendard, size: 16px, weight: 400, color: #222222
  외부 링크 : font-family: Pretendard, size: 18px, weight: 500, color: #222222
