import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { NewsSection } from "@/lib/content/types";

type NewsSectionProps = {
  section: NewsSection;
};

export function NewsSectionView({ section }: NewsSectionProps) {
  return (
    <section className="pb-[44px] pt-0">
      <div className="penta-container">
        <div className="flex items-center justify-between border-b border-[#d9d9d9] py-[18px]">
          <h2 className="text-[14px] font-extrabold uppercase tracking-[0.24em] text-[var(--color-text-primary)]">
            News
          </h2>
          <Link
            href={section.data.moreLink.href}
            className="inline-flex items-center gap-1 text-[18px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-text-accent)]"
          >
            {section.data.moreLink.label}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          {section.data.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group grid items-center gap-4 py-[14px] transition-colors hover:text-[var(--color-text-accent)] md:grid-cols-[92px_1fr_132px]"
            >
              <Badge
                className="w-fit bg-transparent px-0 py-0 text-[18px] font-semibold text-[var(--color-text-accent)]"
                variant="secondary"
              >
                {item.badge}
              </Badge>
              <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] group-hover:underline">
                {item.title}
              </h3>
              <time className="text-right text-[18px] font-normal text-[var(--color-text-muted)]">
                {item.date}
              </time>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
