import type { HomeSection, PageContent } from "@/lib/content/types";

function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

// "섹션 추가" 드롭다운에 노출할 섹션 타입 목록.
export const SECTION_ADD_OPTIONS: Array<{ type: HomeSection["type"]; label: string }> = [
  { type: "productHero", label: "제품 히어로" },
  { type: "pageHeader", label: "페이지 헤더" },
  { type: "statement", label: "서술 문단" },
  { type: "benefits", label: "선택 이유 카드" },
  { type: "lineupCards", label: "라인업 카드" },
  { type: "lineupDetail", label: "라인업 상세" },
  { type: "placeholder", label: "플레이스홀더" },
  { type: "faq", label: "FAQ" },
  { type: "hero", label: "Hero (홈)" },
  { type: "news", label: "News (홈)" },
  { type: "subscribe", label: "Subscribe (홈)" },
  { type: "productTabs", label: "Product Tabs (홈)" },
  { type: "stats", label: "Stats (홈)" },
  { type: "awards", label: "Awards (홈)" },
];

export function createSection(type: HomeSection["type"]): HomeSection {
  const base = { id: uid(type), enabled: true } as const;

  switch (type) {
    case "hero":
      return { ...base, type, data: { eyebrow: "", title: "새 히어로", visualPreset: "default-geometric", backgroundImage: null } };
    case "news":
      return { ...base, type, data: { moreLink: { label: "더 보기", href: "#" }, items: [] } };
    case "subscribe":
      return { ...base, type, data: { layoutPreset: "default", items: [] } };
    case "productTabs":
      return { ...base, type, data: { headline: "", tabs: [] } };
    case "stats":
      return { ...base, type, data: { items: [] } };
    case "awards":
      return { ...base, type, data: { items: [] } };
    case "productHero":
      return {
        ...base,
        type,
        data: {
          title: "새 제품",
          subtitle: "",
          description: "",
          primaryCta: { label: "문의하기", href: "#" },
          secondaryCta: { label: "", href: "#" },
          image: null,
          imageAlt: "",
        },
      };
    case "statement":
      return { ...base, type, data: { title: "제목", body: "" } };
    case "benefits":
      return { ...base, type, data: { title: "선택 이유", items: [], imagePlaceholder: null } };
    case "lineupCards":
      return { ...base, type, data: { title: "라인업", items: [] } };
    case "placeholder":
      return { ...base, type, data: { title: null, label: "준비 중 콘텐츠" } };
    case "faq":
      return { ...base, type, data: { title: "FAQs", items: [] } };
    case "pageHeader":
      return { ...base, type, data: { title: "페이지 제목", description: "" } };
    case "lineupDetail":
      return { ...base, type, data: { items: [] } };
  }
}

export function createPage(title: string, slug: string): PageContent {
  return {
    id: uid("page"),
    slug: slug || `/new-page-${uid("")}`,
    title: title || "새 페이지",
    sections: [],
  };
}
