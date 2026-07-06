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
    <section className="pb-[44px] pt-0">
      <div className="penta-container">
        <div className="flex items-center justify-end border-b border-[#d9d9d9] py-[18px]">
          <Link
            href={section.data.moreLink.href}
            className="inline-flex items-center gap-1 text-[18px] font-medium text-(--color-text-primary) transition-colors hover:text-(--color-text-accent)"
          >
            {section.data.moreLink.label}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-[42px]">
          {section.data.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group grid items-center gap-2 py-[8px] transition-colors hover:text-(--color-text-accent) md:grid-cols-[92px_1fr_132px]"
            >
              {item.badge ? (
                <Badge
                  className="w-fit bg-transparent px-0 py-0 text-[18px] font-semibold leading-tight text-(--color-text-accent)"
                  variant="secondary"
                >
                  {item.badge}
                </Badge>
              ) : null}
              <h3
                className={cn(
                  "text-[18px] font-semibold leading-tight tracking-[-0.02em] text-(--color-text-primary) group-hover:underline",
                  !item.badge && "md:col-span-2 md:col-start-1",
                )}
              >
                {item.title}
              </h3>
              <time className="w-[132px] justify-self-end text-right text-[18px] font-normal leading-tight tabular-nums text-(--color-text-muted)">
                {item.date}
              </time>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
