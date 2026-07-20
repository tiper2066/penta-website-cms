import type { HomeSection } from "@/lib/content/types";

import { AwardsSectionView } from "./awards-section";
import { BenefitsSectionView } from "./benefits-section";
import { FaqSectionView } from "./faq-section";
import { HeroSectionView } from "./hero-section";
import { LineupCardsSectionView } from "./lineup-cards-section";
import { LineupDetailSectionView } from "./lineup-detail-section";
import { NewsSectionView } from "./news-section";
import { PageHeaderSectionView } from "./page-header-section";
import { PlaceholderSectionView } from "./placeholder-section";
import { ProductHeroSectionView } from "./product-hero-section";
import { ProductTabsSectionView } from "./product-tabs-section";
import { StatementSectionView } from "./statement-section";
import { StatsSectionView } from "./stats-section";
import { SubscribeSectionView } from "./subscribe-section";

type SectionRendererProps = {
  section: HomeSection;
  // 라인업 상세 섹션(lineupDetail)에서 활성 탭을 결정하는 데 사용합니다.
  activeLineupSlug?: string;
};

export function SectionRenderer({ section, activeLineupSlug }: SectionRendererProps) {
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
    case "productHero":
      return <ProductHeroSectionView section={section} />;
    case "statement":
      return <StatementSectionView section={section} />;
    case "benefits":
      return <BenefitsSectionView section={section} />;
    case "lineupCards":
      return <LineupCardsSectionView section={section} />;
    case "placeholder":
      return <PlaceholderSectionView section={section} />;
    case "faq":
      return <FaqSectionView section={section} />;
    case "pageHeader":
      return <PageHeaderSectionView section={section} />;
    case "lineupDetail":
      return <LineupDetailSectionView section={section} activeSlug={activeLineupSlug} />;
  }
}
