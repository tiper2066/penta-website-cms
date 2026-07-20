import Link from "next/link";

import type { LineupCardsSection } from "@/lib/content/types";

type LineupCardsSectionProps = {
  section: LineupCardsSection;
};

export function LineupCardsSectionView({ section }: LineupCardsSectionProps) {
  const { title, items } = section.data;

  return (
    <section className="bg-[#f2f2f2] pb-16 md:pb-[100px]">
      <div className="penta-container">
        <h2 className="text-[28px] font-bold leading-tight text-(--color-text-primary) md:text-[36px]">
          {title}
        </h2>
        <div className="mt-8 flex flex-col gap-4 md:mt-[43px]">
          {items.map((lineup) => (
            <Link
              key={lineup.id}
              href={lineup.href}
              className="flex flex-col gap-4 rounded-xl border border-[#e5e8ed] bg-white px-5 py-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:flex-row md:items-center md:gap-8 md:px-9 md:py-7 md:hover:border-(--color-text-accent)"
            >
              <h3 className="w-full rounded-[6px] bg-[#edf2ff] px-6 py-4 text-center text-[18px] font-semibold text-(--color-text-accent) md:w-[300px] md:shrink-0 md:text-[20px]">
                {lineup.name}
              </h3>
              <p className="text-[16px] leading-[26px] text-(--color-text-sub) md:flex-1">{lineup.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
