"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
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
        <h2 className="max-w-[760px] whitespace-pre-line text-[54px] font-bold leading-[1.18] tracking-[-0.055em] text-[var(--color-text-primary)]">
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
                  ? "bg-primary text-[var(--color-text-inverse)]"
                  : "bg-card text-[var(--color-text-dark)] hover:bg-white/70",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-[56px] grid items-start gap-10 lg:grid-cols-[0.58fr_0.42fr]">
          <div>
            <p className="text-[22px] font-bold tracking-[-0.025em] text-[var(--color-text-primary)]">
              {activeTab.category}
            </p>
            <Image
              src={activeTab.logo}
              alt={activeTab.productName}
              width={220}
              height={64}
              className="mt-3 h-[52px] w-auto object-contain"
            />
            <p className="mt-[26px] max-w-[420px] text-[20px] font-normal leading-[1.56] tracking-[-0.02em] text-[var(--color-text-primary)]">
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
            <Image
              src={activeTab.visual.value}
              alt={`${activeTab.productName} visual`}
              width={260}
              height={260}
              className="h-auto max-h-[260px] w-auto max-w-[280px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
