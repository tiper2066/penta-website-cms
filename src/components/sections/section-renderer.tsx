import type { HomeSection } from "@/lib/content/types";

import { AwardsSectionView } from "./awards-section";
import { HeroSectionView } from "./hero-section";
import { NewsSectionView } from "./news-section";
import { ProductTabsSectionView } from "./product-tabs-section";
import { StatsSectionView } from "./stats-section";
import { SubscribeSectionView } from "./subscribe-section";

type SectionRendererProps = {
  section: HomeSection;
};

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
    case "hero":
      return <HeroSectionView section={section} />;
    case "news":
      return <NewsSectionView section={section} />;
    case "subscribe":
      return <SubscribeSectionView section={section} />;
    case "productTabs":
      return <ProductTabsSectionView section={section} />;
    case "stats":
      return <StatsSectionView section={section} />;
    case "awards":
      return <AwardsSectionView section={section} />;
  }
}
