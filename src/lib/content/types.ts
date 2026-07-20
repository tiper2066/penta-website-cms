export type LinkItem = {
  label: string;
  href: string;
};

export type IdentifiedLink = LinkItem & {
  id: string;
};

export type SiteContent = {
  site: {
    name: string;
    locale: string;
  };
  navigation: NavigationContent;
  pages: PageContent[];
  footer: FooterContent;
};

export type NavigationContent = {
  logo: {
    label: string;
    image: string;
    href: string;
  };
  items: IdentifiedLink[];
  search: {
    enabled: boolean;
    placeholder: string;
  };
};

export type PageContent = {
  id: string;
  slug: string;
  title: string;
  sections: HomeSection[];
};

// 모든 페이지에서 사용할 수 있는 섹션 유니언. (홈 + 서브 페이지)
export type HomeSection =
  | HeroSection
  | NewsSection
  | SubscribeSection
  | ProductTabsSection
  | StatsSection
  | AwardsSection
  | ProductHeroSection
  | StatementSection
  | BenefitsSection
  | LineupCardsSection
  | PlaceholderSection
  | FaqSection
  | PageHeaderSection
  | LineupDetailSection;

// 별칭: 홈 전용이 아닌 일반 페이지 섹션임을 나타냅니다.
export type PageSection = HomeSection;

export type BaseSection<TType extends string, TData> = {
  id: string;
  type: TType;
  enabled: boolean;
  data: TData;
};

export type HeroSection = BaseSection<
  "hero",
  {
    eyebrow: string;
    title: string;
    visualPreset: string;
    backgroundImage: string | null;
  }
>;

export type NewsSection = BaseSection<
  "news",
  {
    moreLink: LinkItem;
    items: Array<{
      id: string;
      badge: string;
      title: string;
      date: string;
      href: string;
    }>;
  }
>;

export type SubscribeSection = BaseSection<
  "subscribe",
  {
    layoutPreset: string;
    items: SubscribeItem[];
  }
>;

export type SubscribeItem =
  | {
      id: string;
      type: "text";
      value: string;
    }
  | {
      id: string;
      type: "input";
      name: string;
      placeholder: string;
    }
  | {
      id: string;
      type: "button";
      label: string;
      href: string;
    };

export type ProductTabsSection = BaseSection<
  "productTabs",
  {
    headline: string;
    tabs: ProductTab[];
  }
>;

export type ProductTab = {
  id: string;
  label: string;
  category: string;
  productName: string;
  logo: string;
  description: string;
  button: LinkItem;
  visual: {
    type: "asset" | "preset";
    value: string;
  };
};

export type StatsSection = BaseSection<
  "stats",
  {
    items: Array<{
      id: string;
      label: string;
      value: string;
    }>;
  }
>;

export type AwardsSection = BaseSection<
  "awards",
  {
    items: Array<{
      id: string;
      logo: string;
      title: string;
      description: string;
    }>;
  }
>;

// ── 서브 페이지 섹션 타입 ──────────────────────────────────────────────

// 제품 개요 페이지 상단 히어로 (제목/부제/설명 + CTA 2개 + 제품 비주얼).
export type ProductHeroSection = BaseSection<
  "productHero",
  {
    title: string;
    subtitle: string;
    description: string;
    primaryCta: LinkItem;
    secondaryCta: LinkItem;
    image: string | null;
    imageAlt: string;
  }
>;

// 제목 + 본문 문단으로 구성된 서술 블록.
export type StatementSection = BaseSection<
  "statement",
  {
    title: string;
    body: string;
  }
>;

// "선택하는 이유" 카드 그리드 (+ 하단 이미지 플레이스홀더).
export type BenefitsSection = BaseSection<
  "benefits",
  {
    title: string;
    items: Array<{
      id: string;
      number: string;
      title: string;
      description: string;
    }>;
    imagePlaceholder: string | null;
  }
>;

// 라인업 카드 목록 (상세 페이지로 이동하는 링크 카드).
export type LineupCardsSection = BaseSection<
  "lineupCards",
  {
    title: string;
    items: Array<{
      id: string;
      name: string;
      description: string;
      href: string;
    }>;
  }
>;

// 회색 플레이스홀더 박스 (준비 중 콘텐츠 자리).
export type PlaceholderSection = BaseSection<
  "placeholder",
  {
    title: string | null;
    label: string;
  }
>;

// FAQ Q/A 목록.
export type FaqSection = BaseSection<
  "faq",
  {
    title: string;
    items: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  }
>;

// 간단한 페이지 헤더 (제목 + 설명). 서브 페이지 상단에 사용.
export type PageHeaderSection = BaseSection<
  "pageHeader",
  {
    title: string;
    description: string;
  }
>;

// 라인업 상세: 탭으로 전환되는 여러 라인업의 상세 카드 묶음.
export type LineupDetailSection = BaseSection<
  "lineupDetail",
  {
    items: LineupDetailItem[];
  }
>;

export type LineupDetailItem = {
  id: string;
  slug: string;
  label: string;
  description: string;
  cards: LineupDetailCard[];
};

export type LineupDetailCard = {
  id: string;
  title: string;
  blocks: LineupDetailBlock[];
};

export type LineupDetailBlock = {
  id: string;
  heading: string | null;
  items: string[];
};

export type FooterContent = {
  groups: Array<{
    id: string;
    title: string;
    items: IdentifiedLink[];
  }>;
  legal: {
    privacy: LinkItem;
    utilityLinks: IdentifiedLink[];
    companyInfo: string;
    copyright: string;
  };
};
