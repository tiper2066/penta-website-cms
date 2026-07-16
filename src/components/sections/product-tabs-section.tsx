"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";

import { PrimaryCtaLink } from "@/components/ui/primary-cta-link";
import { ProductVisual } from "@/components/visuals/figma-visuals";
import { cn } from "@/lib/utils";
import type { ProductTabsSection } from "@/lib/content/types";

type ProductTabsSectionProps = {
  section: ProductTabsSection;
};

export function ProductTabsSectionView({ section }: ProductTabsSectionProps) {
  const [activeId, setActiveId] = useState(section.data.tabs[0]?.id);
  const activeTab = useMemo(
    () => section.data.tabs.find((tab) => tab.id === activeId) ?? section.data.tabs[0],
    [activeId, section.data.tabs],
  );

  if (!activeTab) {
    return null;
  }

  const [headlineLead, ...headlineRest] = section.data.headline.split("\n");
  const headlineSuffix = headlineRest.join("\n");

  return (
    <section className="pb-12 pt-10 lg:pb-[78px] lg:pt-[58px]">
      <div className="penta-container">
        <h2 className="text-(--color-text-primary) w-full whitespace-pre-line text-[34px] leading-[1.15] tracking-[-0.055em] md:text-[42px] lg:text-[54px] lg:leading-[1.18]">
          <span className="font-bold">{headlineLead}</span>
          {headlineSuffix ? (
            <>
              {"\n"}
              <span className="font-extralight">{headlineSuffix}</span>
            </>
          ) : null}
        </h2>

        <div
          className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-[42px] lg:grid-cols-4 lg:gap-6"
          role="tablist"
          aria-label="제품 보안 영역"
        >
          {section.data.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveId(tab.id)}
              role="tab"
              aria-selected={activeTab.id === tab.id}
              className={cn(
                "h-[58px] rounded-[4px] px-4 text-[16px]! font-bold! leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:h-[84px] lg:px-6 lg:text-[20px]!",
                activeTab.id === tab.id
                  ? "text-(--color-text-inverse) bg-primary"
                  : "text-(--color-text-dark) bg-card hover:bg-white/70",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative mt-10 grid min-h-0 items-start gap-10 lg:mt-[56px] lg:min-h-[360px] lg:grid-cols-[0.58fr_0.42fr]">
          <div>
            <p className="text-(--color-text-primary) text-[18px] font-bold tracking-tight lg:text-[22px]">
              {activeTab.category}
            </p>
            <Image
              src={activeTab.logo}
              alt={activeTab.productName}
              width={220}
              height={64}
              className="mt-3 h-[42px] w-auto object-contain lg:h-[52px]"
            />
            <div className="mt-8 h-px w-[42px] bg-(--color-text-primary) lg:mt-[42px]" />
            <p className="text-(--color-text-primary) mt-8 max-w-[560px] whitespace-pre-line text-[17px] font-normal leading-[1.65] tracking-[-0.02em] lg:mt-[42px] lg:text-[20px] lg:leading-[1.7]">
              {activeTab.description}
            </p>
            <PrimaryCtaLink
              href={activeTab.button.href}
              className="mt-[30px] h-14 w-full rounded-[4px] px-[24px] text-[17px] font-medium sm:w-auto lg:h-[66px] lg:text-[20px]"
            >
              {activeTab.button.label}
              <ChevronRight className="h-4 w-4" />
            </PrimaryCtaLink>
          </div>

          <div
            className={cn(
              "flex min-h-[220px] items-start justify-center overflow-hidden lg:justify-end lg:overflow-visible",
              activeTab.id === "damo" &&
                "lg:pointer-events-none lg:absolute lg:left-[786px] lg:top-1/2 lg:min-h-0 lg:-translate-y-1/2",
              activeTab.id === "wapples" &&
                "lg:pointer-events-none lg:absolute lg:left-[663px] lg:top-1/2 lg:min-h-0 lg:-translate-y-1/2",
              activeTab.id === "isign" &&
                "lg:pointer-events-none lg:absolute lg:left-[752px] lg:top-1/2 lg:min-h-0 lg:-translate-y-1/2",
              activeTab.id === "cloudbric" &&
                "lg:pointer-events-none lg:absolute lg:left-[730px] lg:top-1/2 lg:min-h-0 lg:-translate-y-1/2",
            )}
          >
            <div className="origin-top scale-[0.78] sm:scale-90 lg:scale-100">
              <ProductVisual productId={activeTab.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
