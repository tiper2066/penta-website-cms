"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { AwardsSection } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type AwardItem = AwardsSection["data"]["items"][number];

const autoScrollMs = 3500;

function getVisibleItems() {
  if (typeof window === "undefined") {
    return 3;
  }

  if (window.matchMedia("(min-width: 1024px)").matches) {
    return 3;
  }

  if (window.matchMedia("(min-width: 768px)").matches) {
    return 2;
  }

  return 1;
}

function AwardCard({ item }: { item: AwardItem }) {
  const [titleLine, nameLine] = item.title.split("\n");
  const logoHeight =
    item.id === "frost" ? 78 : item.id === "globee" ? 109 : item.id === "cyber-security" ? 105 : undefined;

  return (
    <article className="text-center">
      <div className="flex h-[96px] items-center justify-center lg:h-[118px]">
        <Image
          src={item.logo}
          alt={item.title}
          width={170}
          height={52}
          className="h-auto w-auto object-contain"
          style={logoHeight ? { height: `${logoHeight}px`, maxHeight: "100%", width: "auto" } : undefined}
        />
      </div>
      <h3 className="text-(--color-text-primary) mx-auto mt-5 max-w-[300px] text-center tracking-[-0.02em] lg:mt-7">
        <span className="block text-[16px] font-medium leading-[1.45] lg:text-[18px]">{titleLine}</span>
        <span className="mt-1 block text-[20px] font-bold leading-[1.35] lg:text-[22px]">{nameLine}</span>
      </h3>
      <p className="text-(--color-text-faint) mx-auto mt-4 max-w-[360px] whitespace-pre-line text-center text-[16px] font-normal leading-normal tracking-[-0.02em] lg:mt-5 lg:text-[18px] lg:leading-[1.45]">
        {item.description}
      </p>
    </article>
  );
}

export function AwardsCarousel({ items }: { items: AwardItem[] }) {
  const [visibleItems, setVisibleItems] = useState(3);
  const shouldCarousel = items.length > visibleItems;
  const carouselItems = useMemo(
    () => (shouldCarousel ? [...items, ...items.slice(0, visibleItems)] : items),
    [items, shouldCarousel, visibleItems],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    function updateVisibleItems() {
      setVisibleItems(getVisibleItems());
      setActiveIndex(0);
    }

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);

    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  useEffect(() => {
    if (!shouldCarousel || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => current + 1);
    }, autoScrollMs);

    return () => window.clearInterval(timer);
  }, [isPaused, shouldCarousel]);

  function handleTransitionEnd() {
    if (activeIndex < items.length) {
      return;
    }

    setIsTransitioning(false);
    setActiveIndex(0);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsTransitioning(true));
    });
  }

  return (
    <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="overflow-hidden">
        <div
          className={cn("flex", isTransitioning && "transition-transform duration-700 ease-in-out")}
          style={{ transform: `translateX(-${activeIndex * (100 / visibleItems)}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {carouselItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="shrink-0 px-2 md:px-3 lg:px-4"
              style={{ flexBasis: `${100 / visibleItems}%` }}
            >
              <AwardCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {shouldCarousel ? (
        <div className="mt-[44px] flex items-center justify-center gap-3" aria-label="Awards carousel navigation">
          {items.map((item, index) => {
            const isActive = activeIndex % items.length === index;

            return (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "h-[6px] cursor-pointer rounded-full transition-all",
                  isActive ? "w-[50px] bg-(--color-text-primary)" : "w-[6px] bg-[#d2d2d2]",
                )}
                aria-label={`${index + 1}번째 수상 항목 보기`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => {
                  setIsTransitioning(true);
                  setActiveIndex(index);
                }}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
