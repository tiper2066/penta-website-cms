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
    <section className="pb-[78px] pt-[58px]">
      <div className="penta-container">
        <h2 className="text-(--color-text-primary) w-full whitespace-pre-line text-[54px] leading-[1.18] tracking-[-0.055em]">
          <span className="font-bold">{headlineLead}</span>
          {headlineSuffix ? (
            <>
              {"\n"}
              <span className="font-extralight">{headlineSuffix}</span>
            </>
          ) : null}
        </h2>

        <div
          className="mt-[42px] grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
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
                "h-[84px] rounded-[4px] px-6 text-[20px]! font-bold! leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                activeTab.id === tab.id
                  ? "text-(--color-text-inverse) bg-primary"
                  : "text-(--color-text-dark) bg-card hover:bg-white/70",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative mt-[56px] grid min-h-[360px] items-start gap-10 lg:grid-cols-[0.58fr_0.42fr]">
          <div>
            <p className="text-(--color-text-primary) text-[22px] font-bold tracking-tight">
              {activeTab.category}
            </p>
            <Image
              src={activeTab.logo}
              alt={activeTab.productName}
              width={220}
              height={64}
              className="mt-3 h-[52px] w-auto object-contain"
            />
            <div className="mt-[42px] h-px w-[42px] bg-(--color-text-primary)" />
            <p className="text-(--color-text-primary) mt-[42px] max-w-[560px] whitespace-pre-line text-[20px] font-normal leading-[1.7] tracking-[-0.02em]">
              {activeTab.description}
            </p>
            <PrimaryCtaLink
              href={activeTab.button.href}
              className="mt-[30px] h-[66px] rounded-[4px] px-[24px] text-[20px] font-medium"
            >
              {activeTab.button.label}
              <ChevronRight className="h-4 w-4" />
            </PrimaryCtaLink>
          </div>

          <div
            className={cn(
              "flex min-h-[240px] items-start justify-center lg:justify-end",
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
            <ProductVisual productId={activeTab.id} />
          </div>
        </div>
      </div>
    </section>
  );
}
