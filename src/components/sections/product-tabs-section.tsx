"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
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

  return (
    <section className="pb-[78px] pt-[58px]">
      <div className="penta-container">
        <h2 className="text-(--color-text-primary) max-w-[760px] whitespace-pre-line text-[54px] font-bold leading-[1.18] tracking-[-0.055em]">
          {section.data.headline}
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
                "h-[54px] rounded-[2px] px-6 text-[20px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                activeTab.id === tab.id
                  ? "text-(--color-text-inverse) bg-primary"
                  : "text-(--color-text-dark) bg-card hover:bg-white/70",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-[56px] grid items-start gap-10 lg:grid-cols-[0.58fr_0.42fr]">
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
            <p className="text-(--color-text-primary) mt-[26px] max-w-[420px] text-[20px] font-normal leading-[1.56] tracking-[-0.02em]">
              {activeTab.description}
            </p>
            <Button
              asChild
              className="mt-[30px] h-[44px] rounded-[4px] px-[24px] text-[20px] font-medium text-white"
            >
              <Link href={activeTab.button.href}>
                {activeTab.button.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex min-h-[240px] items-start justify-center lg:justify-end">
            <ProductVisual productId={activeTab.id} />
          </div>
        </div>
      </div>
    </section>
  );
}
