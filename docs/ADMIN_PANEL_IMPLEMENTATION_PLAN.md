# 3.5단계: 관리자 대시보드 좌측 속성 패널 개편

이 문서는 `/admin-demo` 좌측 속성 패널을 **멀티 페이지 관리와 아코디언 편집** 구조로 개편하고, 미리보기에 **현재 편집 중인 영역 하이라이트**를 추가하기 위한 구현 계획입니다. 문서만 먼저 확정하고, 이후 단계(Phase)별로 순차 구현합니다.

- 관련 단계: 3단계(관리자 데모, 완료) 이후의 개선 작업
- 선행/기준 문서: [PROJECT_PLAN.md](./PROJECT_PLAN.md), [CMS_CONTENT_MODEL.md](./CMS_CONTENT_MODEL.md), [HANDOFF.md](./HANDOFF.md)
- 대상 화면: `/admin-demo`(편집기), `/admin-demo/preview`(미리보기)

---

## 1. 배경과 목표

### 현재 구조
- 좌측 패널 상단에 카테고리 버튼(탭)이 있고, 클릭 시 해당 그룹 편집 폼 1개만 보여줍니다.
  - `src/components/admin/admin-editor.tsx`의 `CATEGORIES` 배열: `navigation`, `sections`, `hero`, `news`, `subscribe`, `products`, `stats`, `awards`, `footer`
- 이 카테고리에는 **전역 요소(navigation=헤더, footer)** 와 **홈 페이지 섹션(hero~awards, sections=순서)** 이 섞여 있습니다.
- 데이터 모델은 단일 페이지 전제입니다.
  - `src/lib/content/types.ts`의 `SiteContent.pages`가 `{ home: HomePageContent }` 객체(맵)입니다.

### 문제점
1. 전역 요소와 페이지 섹션이 한 줄의 탭에 섞여 있어 개념이 불명확합니다.
2. 한 번에 한 그룹만 보여줘서 여러 섹션을 오가며 편집하기 번거롭습니다.
3. 페이지가 홈 1개뿐이라, 서브 페이지(예: `/products/data-security`)까지 관리하려면 페이지 선택 수단이 없습니다.
4. 미리보기에서 "지금 내가 편집 중인 곳이 어디인지"가 시각적으로 드러나지 않습니다.

### 목표
- **편집 대상 드롭다운** 하나로 "공통 요소 / 페이지"를 선택합니다.
- 선택한 대상의 섹션들을 **아코디언**으로 한 화면에 펼쳐 편집합니다.
- 미리보기에서 **현재 편집 중인 섹션/전역 요소를 오버레이로 하이라이트**합니다.
- 향후 멀티 페이지 확장이 가능한 데이터 모델 방향을 확정합니다.

---

## 2. 확정된 결정사항

- **결정 1 — 드롭다운 순서**: "편집 대상" 드롭다운에서 **`공통 요소`를 맨 위**에 두고, 그 아래에 페이지 목록(현재는 `홈`)을 나열합니다.
- **결정 2 — 편집 영역 하이라이트**: 헤더/푸터(전역 요소) 하이라이트와 **별개로**, 특정 섹션을 편집할 때 미리보기의 해당 섹션 영역을 오버레이로 하이라이트합니다.
- **결정 3 — UI 라이브러리**: 드롭다운/아코디언 등 신규 UI는 **shadcn 컴포넌트 라이브러리**로 도입합니다(Radix 기반, 접근성·키보드 지원).
- **결정 4 — 아코디언 펼침 모드**: **다중 펼침**을 허용합니다(여러 섹션 동시 편집 가능).
- **결정 5 — 하이라이트 대상**: 여러 아코디언이 펼쳐져 있어도 미리보기 하이라이트는 **한 번에 하나만** 표시합니다. 기준은 **마지막으로 펼친(상호작용한) 아코디언**입니다.
- **결정 6 — Phase B 포함**: 섹션 구동형 아코디언(순서 관리 통합)을 **3.5단계 범위에 포함**합니다.
- **결정 7 — 상태 유지**: 마지막 선택한 편집 대상과 아코디언 펼침 상태를 **`localStorage`에 저장해 새로고침 후에도 유지**합니다.

---

## 3. 목표 UI 구성

```
┌ 좌측 속성 패널 ────────────────────────────┐
│ [ 편집 대상 ▼ ]   ← 드롭다운                 │
│   ├ 공통 요소            (맨 위)             │
│   ├ 홈                                       │
│   └ + 페이지 추가        (비활성/향후)        │
│                                             │
│ ── 아코디언 (선택 대상의 섹션들) ──          │
│ ▸ 네비게이션(헤더)        [토글] [∧]         │
│ ▸ Hero                    [토글] [∧]         │
│ ▾ News                    [토글] [∧]         │
│     …편집 폼…                                │
│ ▸ Subscribe               [토글] [∧]         │
│ ▸ …                                          │
└─────────────────────────────────────────────┘
```

### 3.1 편집 대상 드롭다운
- 항목 구성(순서 고정):
  1. `공통 요소` — 모든 페이지에 공통 적용되는 요소(헤더/네비게이션, 푸터).
  2. `홈` — 현재 존재하는 유일한 페이지.
  3. (향후) 다른 페이지들.
  4. (향후) `+ 페이지 추가` — 이번 단계에서는 비활성 또는 숨김.
- 선택 상태는 편집기 로컬 상태로 관리하고, **`localStorage`에 별도 키로 저장해 새로고침 후에도 마지막 선택을 유지**합니다(결정 7).
- 구현: **shadcn `Select` 프리미티브(Radix 기반)를 신규 도입**합니다(결정 3). 접근성(키보드/`aria-*`)을 기본 제공합니다.

### 3.2 아코디언 섹션 편집
- 선택한 대상에 속한 항목들을 세로로 나열하고 각 항목은 **헤더 + 접힘/펼침 본문**으로 구성합니다.
- 아코디언 헤더 구성:
  - 좌측: 섹션 제목(예: `Hero`, `News`).
  - 우측: 노출 토글(페이지 섹션만), 펼침/접힘 버튼(∧/∨).
- 동작:
  - 기본은 모두 접힘, 클릭 시 펼침. **다중 펼침 허용**(여러 섹션 동시 편집, 결정 4).
  - 펼침 상태는 `localStorage`에 저장해 새로고침 후에도 유지합니다(결정 7).
  - 펼친 본문에는 기존 패널 폼(`admin-panels.tsx`)을 재사용합니다.
  - 구현: **shadcn `Accordion` 프리미티브(`type="multiple"`)** 를 사용합니다(결정 3).
- `공통 요소` 선택 시 아코디언 항목: `네비게이션(헤더)`, `푸터`.
- 페이지(`홈`) 선택 시 아코디언 항목: 각 섹션(Hero, News, Subscribe, Product Tabs, Stats, Awards)을 `sections[]` 순서대로 렌더링하고, 순서/노출/삭제는 각 아코디언 헤더에 통합합니다(Phase B, 6장 참고).

---

## 4. 데이터 모델 방향 (멀티 페이지 대비)

현재:

```ts
// src/lib/content/types.ts
pages: { home: HomePageContent };
```

향후 멀티 페이지를 고려한 목표:

```ts
pages: PageContent[]; // [{ id, slug, title, sections }]
```

- 장점: 페이지 추가/순서/목록화가 자연스럽고, Payload CMS의 `pages` Collection 매핑과 일치합니다([PROJECT_PLAN.md](./PROJECT_PLAN.md) 5단계 권장 매핑).
- 영향 범위(모델 변경 시): `types.ts`, `content/demo-site.json`, `content/site.ts`, `admin-store.ts` 기본 스냅샷, `admin-demo/preview/page.tsx`(`content.pages.home.sections` 참조), 공개 홈 페이지 로더.
- **호환 전략**: 이번 3.5의 UI 개편은 모델 변경 없이도 진행 가능합니다(현재 `pages.home` 유지). 모델을 `pages[]`로 바꾸는 작업은 **Phase D**로 분리해 서브 페이지(`/products/...`) JSON 이관과 함께 다룹니다.

---

## 5. 미리보기 하이라이트 설계 (결정 2)

### 5.1 개념
- 편집기에서 특정 아코디언 항목을 펼치거나 포커스하면, 그 항목에 대응하는 **미리보기의 실제 영역**에 오버레이(테두리 링 + "편집 중" 라벨)를 표시하고 해당 위치로 스크롤합니다.
- 하이라이트는 **레이아웃에 영향 없는 오버레이**여야 합니다(`outline`/절대배치 + `pointer-events-none`).

### 5.2 편집기 → 미리보기 통신
- 콘텐츠 동기화는 이미 `admin-store.ts`(localStorage + `BroadcastChannel` + `storage` 이벤트)로 처리됩니다. 하지만 하이라이트는 **저장할 필요 없는 일시적 UI 상태**이므로 콘텐츠 스토어와 분리합니다.
- 방식: 편집기가 iframe에 `iframe.contentWindow.postMessage()`로 활성 대상을 전달하고, 미리보기(`/admin-demo/preview`)가 `message` 이벤트를 구독합니다.
  - 메시지 예: `{ source: "penta-admin", type: "active-target", target: "section:hero" | "global:navigation" | "global:footer" | null }`
  - 보안: `event.origin`(동일 출처) 및 `event.data.source` 확인.
- 새 탭 미리보기(`편집 미리보기` 버튼)는 하이라이트 대상이 아니므로(별도 문서) 그대로 둡니다. 하이라이트는 임베드된 iframe에만 적용합니다.

### 5.3 미리보기 측 마킹과 오버레이
- 각 섹션/전역 요소를 식별할 수 있도록 래퍼에 안정적 식별자를 부여합니다.
  - 섹션: `SectionRenderer` 래퍼 또는 `preview/page.tsx`의 `map`에서 `data-preview-id={`section:${section.id}`}`.
  - 전역: 헤더 래퍼에 `data-preview-id="global:navigation"`, 푸터 래퍼에 `data-preview-id="global:footer"`.
- 미리보기 페이지에 하이라이트 레이어 컴포넌트를 추가:
  - 활성 `target`을 받아 `document.querySelector('[data-preview-id="…"]')`의 위치/크기를 측정.
  - 그 위에 절대배치 오버레이(예: `outline` 2px + 반투명 배경 + 상단 라벨 chip "편집 중: News")를 렌더.
  - `scrollIntoView({ behavior: "smooth", block: "center" })`로 해당 영역으로 이동.
  - 창 리사이즈/스크롤 시 위치 갱신(`ResizeObserver` 또는 `requestAnimationFrame` 기반 재측정).
- 접근성/모션: `prefers-reduced-motion`이면 부드러운 스크롤/전환을 생략합니다(globals.css의 기존 reduced-motion 정책과 일관).

### 5.4 활성 대상 결정 규칙 (편집기)
- 다중 펼침이 가능하지만 **미리보기 하이라이트는 한 번에 하나만** 표시합니다(결정 5).
- 활성 기준은 **마지막으로 펼친(상호작용한) 아코디언**입니다. 새 항목을 펼치면 그 항목이 활성 대상이 됩니다.
- 활성 항목을 접으면, 그때 펼쳐져 있는 항목 중 가장 최근 것으로 활성 대상을 넘깁니다(없으면 `null`).
- 모든 항목이 접히면 `target = null`(오버레이 제거).

---

## 6. 편집 폼 재사용과 섹션 레지스트리

- 기존 폼은 그대로 재사용합니다(`admin-panels.tsx`의 `NavigationPanel`, `HeroPanel`, `NewsPanel`, `SubscribePanel`, `ProductTabsPanel`, `StatsPanel`, `AwardsPanel`, `FooterPanel`).
- **Phase B**에서 섹션 구동형 아코디언으로 전환할 때, 섹션 타입 → 편집 폼 매핑 레지스트리를 도입합니다(공개 측 `section-renderer.tsx`의 타입 스위치와 대칭):

```ts
// 예시: 섹션 타입 → 편집 폼
const SECTION_EDITORS = {
  hero: HeroPanel,
  news: NewsPanel,
  subscribe: SubscribePanel,
  productTabs: ProductTabsPanel,
  stats: StatsPanel,
  awards: AwardsPanel,
} as const;
```

- 이렇게 하면 `sections[]`를 순회하며 각 섹션 id/타입에 맞는 폼을 렌더하고, 아코디언 헤더에서 이동/토글/삭제를 함께 제공할 수 있습니다.

---

## 7. 단계별 구현 계획 (Phase)

작은 단위로 나눠 순차 구현/검증합니다. 각 Phase는 독립적으로 동작 가능해야 합니다.

### Phase A — 대상 드롭다운 + 아코디언 (모델 변경 없음) · 3.5 범위

상태: 완료

- shadcn `Select` 도입(결정 3). → `src/components/ui/select.tsx` 신규.
- 상단 카테고리 버튼을 제거하고 "편집 대상" 드롭다운으로 대체(`공통 요소` 최상단, 그다음 `홈`).
- shadcn `Accordion`(`type="multiple"`) 도입(결정 4). → `src/components/ui/accordion.tsx` 신규. `공통 요소`→[네비게이션(헤더), 푸터], `홈`→[섹션 순서, Hero, News, Subscribe, Product Tabs, Stats, Awards].
  - `홈`의 `섹션 순서` 항목은 기존 편집 기능 100% 유지를 위해 Phase A에서 아코디언 첫 항목으로 유지합니다. Phase B에서 섹션 구동형 아코디언으로 통합되며 별도 항목은 제거될 예정입니다.
- 각 아코디언 본문에 기존 패널 폼 그대로 배치.
- 선택 대상 + 펼침 상태를 `localStorage`에 저장/복원(결정 7). → `admin-store.ts`에 UI 상태용 `useSyncExternalStore` 스토어(`subscribeUi`, `getUiTargetSnapshot`, `getUiExpandedSnapshot`, `writeUiTarget`, `writeUiExpanded`)를 추가해 하이드레이션 안전하게 처리. 펼침 상태는 대상별(`{ common: [], home: [] }`)로 저장.
- 산출물: 개편된 좌측 패널 UI, 기존 편집 기능 100% 유지.
- 검증: `npm run typecheck`, `npm run lint`, `npm run build` 통과. `/`, `/admin-demo`, `/admin-demo/preview` 200 응답 확인.

### Phase B — 섹션 구동형 아코디언 · 3.5 범위 (결정 6)

상태: 완료

- 섹션 레지스트리 도입(6장). `admin-editor.tsx`에 `SECTION_EDITORS`(hero/news/subscribe/productTabs/stats/awards → 편집 폼) 맵을 두고, `홈` 대상은 `content.pages.home.sections[]`를 순서대로 순회해 아코디언을 렌더합니다. 아코디언 `value`는 각 섹션의 `id`를 사용합니다.
- 아코디언 헤더에 위/아래 이동·노출 토글(Eye/EyeOff)·삭제(Trash2)를 통합했습니다. 헤더 액션은 트리거 버튼의 형제로 배치해 클릭 시 아코디언이 토글되지 않습니다. 숨김 상태 섹션은 라벨을 흐리게 표시하고 "숨김" 배지를 붙입니다.
- 별도 "섹션 순서" 패널(`SectionsPanel`)을 제거했습니다. `admin-panels.tsx`에서 함수 삭제, `SECTION_TYPE_LABELS`는 편집기에서 재사용하도록 export.
- 헤더에 액션 공간을 확보하기 위해 `Accordion` 트리거의 chevron을 좌측으로 이동했습니다.
- 삭제는 즉시 반영되며, 초기화(기본 JSON 복원)로 되돌릴 수 있습니다. 알 수 없는 섹션 타입에는 폴백 안내 패널을 렌더합니다.
- 산출물: 순서 관리와 내용 편집 일원화.
- 검증: `npm run typecheck`, `npm run lint`, `npm run build` 통과. `/`, `/admin-demo`, `/admin-demo/preview` 200 응답 확인.

### Phase B+ — 드래그 앤 드롭 정렬 (Phase B 후속)

상태: 완료

- 모든 순서 변경 UI를 위/아래 화살표에서 **드래그 핸들(`::`, `GripVertical`)** 방식으로 전환했습니다. 핸들은 각 행/헤더의 우측 끝에 배치합니다. 사용자 요구에 따라 **드래그로만** 이동 가능하며 키보드 이동은 지원하지 않습니다(`PointerSensor`만 사용).
- 라이브러리: `@dnd-kit/core` · `@dnd-kit/sortable` · `@dnd-kit/modifiers` · `@dnd-kit/utilities`.
- 공통 프리미티브 `src/components/admin/sortable.tsx` 신설: `SortableList`(단일 리스트 DnD 컨텍스트) · `SortableRow`(핸들+삭제 포함 카드) · `DragHandle` · `RemoveButton` · `usePointerSortSensors`.
- 안정 정렬 키 확보를 위해 모델에 `id`를 추가했습니다(`types.ts`의 `IdentifiedLink`): `navigation.items`, `footer.groups`(+`items`), `footer.legal.utilityLinks`. `demo-site.json`에도 해당 `id`를 부여했습니다. 공개 컴포넌트 렌더링에는 영향 없음.
- 평면 리스트(navigation / news / subscribe / productTabs / stats / awards / utilityLinks)는 `SortableList` + `SortableRow`로 전환하고 `@dnd-kit/sortable`의 `arrayMove`로 재정렬합니다.
- **푸터(중첩)**: 그룹 순서 변경 + **링크의 그룹 간 이동**까지 지원합니다. 단일 `DndContext`에서 `active.id` prefix(`group:` / `link:` / `zone:`)로 대상을 구분하고, 각 그룹에 `useDroppable` 존을 두어 빈 그룹/헤더 영역 드롭도 처리합니다. `DragOverlay`로 드래그 중 라벨 미리보기를 제공합니다.
- 섹션 아코디언은 `useSortable`로 감싼 `SortableSectionItem`으로 전환하고, 드래그 핸들을 헤더 액션(노출 토글·삭제 옆) 우측 끝에 배치해 토글 버튼과 충돌하지 않게 했습니다.
- 제거: `admin-fields.tsx`의 `RepeaterItem`·`IconButton`·`moveItem`(화살표 이동 유틸) 삭제.
- 검증: `npm run typecheck`(=`tsc --noEmit`), `npm run lint`, `npm run build` 통과. `/admin-demo`, `/admin-demo/preview` 200 응답 확인.

### Phase C — 미리보기 하이라이트 · 3.5 범위 (결정 2)

상태: 완료

- 편집기→미리보기 iframe `postMessage` 채널 추가(`source: "penta-admin"`). 콘텐츠 스토어와 분리된 일시적 UI 상태로 처리합니다.
- **핸드셰이크**: 미리보기(`PreviewHighlight`)가 마운트 시 부모에 `preview-ready`를 보내고, 편집기는 이를 받으면 현재 활성 대상을 전송합니다. 이후 활성 대상 변경 시마다 `{ type: "active-target", target, label }`을 전송하며, `iframe.onLoad`에서도 best-effort로 재전송합니다. 수신 측은 `event.origin === location.origin`과 `source`를 검증합니다.
- **활성 대상 결정(결정 5)**: 현재 편집 대상의 펼친 아코디언 중 **마지막으로 펼친 하나**만 하이라이트합니다. Radix Accordion(multiple)이 새로 펼친 값을 배열 끝에 추가하므로 `expandedItems`의 마지막 원소를 활성으로 사용합니다. 홈 섹션은 `section:<id>`, 공통 요소는 `global:navigation`/`global:footer`로 매핑합니다.
- **마킹**: 미리보기에서 각 섹션을 `data-preview-id="section:<id>"` 래퍼로 감싸고, `SiteHeader`/`SiteFooter`에는 옵션 `previewId` prop을 추가해 루트 요소에 `data-preview-id="global:navigation|footer"`를 부여합니다(헤더가 `sticky`라 별도 래퍼 대신 prop 사용으로 sticky 유지).
- **오버레이**: `PreviewHighlight`가 대상 요소를 `requestAnimationFrame` 루프로 측정해 `position: fixed` 오버레이(브랜드 블루 `ring` + "편집 중: <라벨>" 칩, `pointer-events-none`)를 그립니다. 활성 변경 시 `scrollIntoView({ block: "center" })`로 이동하며, `prefers-reduced-motion`이면 부드러운 스크롤을 생략합니다. iframe이 CSS `scale`로 축소돼 있어도 오버레이가 미리보기 문서 내부에 있어 함께 스케일됩니다.
- 신규 파일: `src/components/admin/preview-highlight.tsx`.
- 검증: `tsc --noEmit`, `npm run lint`, `npm run build` 통과. `/`, `/admin-demo`, `/admin-demo/preview` 200 응답 및 `data-preview-id` 마커(섹션 6종 + 헤더/푸터) 렌더 확인.

### Phase D — 멀티 페이지 데이터 모델 (후속 · 3.5 범위 밖)
- `pages: PageContent[]`로 전환, `demo-site.json`/로더/미리보기 참조 갱신.
- 서브 페이지(`/products/data-security` 등) JSON 이관 검토(별도 범위로 확장 가능).
- 드롭다운에 실제 다중 페이지 표시, `+ 페이지 추가` 활성화 검토.
- 산출물: 멀티 페이지 관리 기반.

> 3.5단계 범위는 **Phase A~C**입니다(드롭다운·다중 펼침 아코디언·순서 통합·하이라이트). Phase D는 멀티 페이지 확장을 위한 후속 기반 작업으로 3.5 범위 밖입니다.

---

## 8. 영향 파일 목록

| 파일 | 변경 내용 | Phase |
|---|---|---|
| `src/components/admin/admin-editor.tsx` | 카테고리 탭 → 드롭다운 + 아코디언, 선택/펼침 상태 localStorage 저장, 활성 대상 상태/`postMessage` 전송 | A, C |
| `src/components/admin/admin-panels.tsx` | 아코디언 본문에서 재사용, Phase B에서 헤더 액션(이동/토글/삭제) 통합 | A, B |
| `src/components/admin/admin-fields.tsx` | 아코디언/드롭다운용 공통 UI 보강(필요 시) | A |
| `src/components/ui/select.tsx` (신규) | shadcn Select 프리미티브 | A |
| `src/components/ui/accordion.tsx` (신규) | shadcn Accordion 프리미티브(`type="multiple"`) | A |
| `src/app/admin-demo/preview/page.tsx` | 섹션/전역 래퍼에 `data-preview-id`, `message` 구독, 오버레이 레이어 | C |
| `src/components/sections/section-renderer.tsx` | (선택) 래퍼에 식별자 부여 지점 | C |
| `src/lib/content/types.ts` | `pages` 맵 → 배열 전환 | D |
| `src/content/demo-site.json`, `src/lib/content/site.ts`, `src/lib/content/admin-store.ts` | 모델 변경 반영 | D |
| `docs/PROJECT_PLAN.md`, `docs/HANDOFF.md` | 단계/상태 갱신 | 각 Phase 완료 시 |

(경로는 현재 리포 기준 추정이며 구현 시 확정합니다.)

---

## 9. 검증 기준

- 기능
  - 드롭다운에서 `공통 요소`가 항상 최상단.
  - 대상 전환 시 아코디언 항목이 올바르게 바뀌고 기존 편집 기능(추가/삭제/이동/토글) 정상.
  - 편집 항목을 펼치면 미리보기 해당 영역이 하이라이트되고 스크롤 이동.
  - 전역 요소(헤더/푸터) 편집 시 각 영역 하이라이트.
  - 모든 항목 접힘 시 하이라이트 제거.
- 품질
  - `npm run typecheck`, `npm run lint`, `npm run build` 통과.
  - `/`, `/admin-demo`, `/admin-demo/preview` 200 응답.
  - `prefers-reduced-motion`에서 과도한 애니메이션 미발생.
  - 하이라이트 오버레이가 레이아웃/클릭을 방해하지 않음(`pointer-events-none`).

---

## 10. 확정된 결정 (이전 열린 질문)

1. **UI 라이브러리**: shadcn 컴포넌트 라이브러리(Radix 기반)로 `Select`, `Accordion`을 신규 도입한다. → 결정 3
2. **아코디언 펼침 모드**: 다중 펼침(`type="multiple"`)을 허용한다. → 결정 4
3. **하이라이트 트리거**: 마지막으로 펼친 아코디언 하나만 하이라이트한다(입력 포커스는 트리거로 쓰지 않음). → 결정 5
4. **Phase B 적용 시점**: 섹션 구동형 아코디언(순서 관리 통합)을 3.5에 포함한다. → 결정 6
5. **상태 유지**: 마지막 선택한 편집 대상과 펼침 상태를 `localStorage`에 저장해 새로고침 후에도 유지한다. → 결정 7

### 남은 확인 (Phase D, 3.5 범위 밖)

- 멀티 페이지 데이터 모델(`pages` 맵 → 배열) 전환 시점과 서브 페이지 JSON 이관 범위.
