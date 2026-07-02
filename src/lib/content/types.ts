export type LinkItem = {
  label: string;
  href: string;
};

export type SiteContent = {
  site: {
    name: string;
    locale: string;
  };
  navigation: NavigationContent;
  pages: {
    home: HomePageContent;
  };
  footer: FooterContent;
};

export type NavigationContent = {
  logo: {
    label: string;
    image: string;
    href: string;
  };
  items: LinkItem[];
  search: {
    enabled: boolean;
    placeholder: string;
  };
};

export type HomePageContent = {
  slug: string;
  title: string;
  sections: HomeSection[];
};

export type HomeSection =
  | HeroSection
  | NewsSection
  | SubscribeSection
  | ProductTabsSection
  | StatsSection
  | AwardsSection;

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

export type FooterContent = {
  groups: Array<{
    title: string;
    items: LinkItem[];
  }>;
  legal: {
    privacy: LinkItem;
    utilityLinks: LinkItem[];
    companyInfo: string;
    copyright: string;
  };
};
