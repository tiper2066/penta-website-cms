import { TabLink } from "@/components/ui/tab-link";
import type { LineupDetailSection } from "@/lib/content/types";

type LineupDetailSectionProps = {
  section: LineupDetailSection;
  activeSlug?: string;
};

export function LineupDetailSectionView({ section, activeSlug }: LineupDetailSectionProps) {
  const { items } = section.data;
  if (items.length === 0) {
    return null;
  }

  const activeLineup = items.find((item) => item.slug === activeSlug) ?? items[0];

  return (
    <section className="bg-[#f2f2f2]">
      <div className="penta-container">
        <div className="flex flex-wrap justify-start gap-3 md:gap-5" role="tablist" aria-label="라인업">
          {items.map((lineup) => (
            <TabLink
              key={lineup.id}
              href={`/products/data-security/${lineup.slug}`}
              active={lineup.slug === activeLineup.slug}
            >
              {lineup.label}
            </TabLink>
          ))}
        </div>

        <div className="mt-7">
          {activeLineup.description ? (
            <p className="mb-7 text-[20px] font-bold leading-[32px] text-(--color-text-primary) md:text-[26px] md:leading-[38px]">
              {activeLineup.description}
            </p>
          ) : null}

          <div className="flex flex-col gap-4">
            {activeLineup.cards.map((card) => (
              <article
                key={card.id}
                className="rounded-xl border border-[#e5e8ed] bg-[#fafbfc] px-5 py-6 md:px-9 md:py-8"
              >
                <div className="mb-[18px] flex items-center gap-4">
                  <span className="h-6 w-1 shrink-0 rounded-sm bg-(--color-text-accent)" aria-hidden="true" />
                  <h2 className="text-[20px] font-bold text-(--color-text-primary) md:text-[22px]">{card.title}</h2>
                </div>

                <div className="space-y-4 pl-0 text-[15px] leading-[25px] text-(--color-text-sub) md:pl-5 md:leading-[26px]">
                  {card.blocks.map((block) => (
                    <section key={block.id}>
                      {block.heading ? (
                        <h3 className="mb-1 font-semibold text-(--color-text-primary)">{block.heading}</h3>
                      ) : null}
                      <ul>
                        {block.items.map((item, index) => (
                          <li key={index}>· {item}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
