import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { NewsSection } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type NewsSectionProps = {
  section: NewsSection;
};

export function NewsSectionView({ section }: NewsSectionProps) {
  return (
    <section className="pb-8 pt-0 lg:pb-[44px]">
      <div className="penta-container">
        <div className="flex items-center justify-end border-b border-[#d9d9d9] py-4 lg:py-[18px]">
          <Link
            href={section.data.moreLink.href}
            className="inline-flex items-center gap-1 text-[15px] font-medium text-(--color-text-primary) transition-colors hover:text-(--color-text-accent) lg:text-[18px]"
          >
            {section.data.moreLink.label}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 lg:mt-[42px]">
          {section.data.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group grid gap-2 border-b border-[#e5e5e5] py-4 transition-colors hover:text-(--color-text-accent) md:grid-cols-[92px_1fr_132px] md:items-center md:border-b-0 md:py-[8px]"
            >
              {item.badge ? (
                <Badge
                  className="w-fit bg-transparent px-0 py-0 text-[15px] font-semibold leading-tight text-(--color-text-accent) md:text-[18px]"
                  variant="secondary"
                >
                  {item.badge}
                </Badge>
              ) : null}
              <h3
                className={cn(
                  "text-[16px] font-semibold leading-[1.35] tracking-[-0.02em] text-(--color-text-primary) group-hover:underline md:text-[18px] md:leading-tight",
                  !item.badge && "md:col-span-2 md:col-start-1",
                )}
              >
                {item.title}
              </h3>
              <time className="text-left text-[14px] font-normal leading-tight tabular-nums text-(--color-text-muted) md:w-[132px] md:justify-self-end md:text-right md:text-[18px]">
                {item.date}
              </time>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
