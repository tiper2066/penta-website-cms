import type { StatsSection } from "@/lib/content/types";

type StatsSectionProps = {
  section: StatsSection;
};

export function StatsSectionView({ section }: StatsSectionProps) {
  return (
    <section className="py-[56px]">
      <div className="penta-container">
        <div className="grid overflow-hidden rounded-[6px] bg-card px-[26px] py-[24px] shadow-none sm:grid-cols-2 lg:grid-cols-7">
          {section.data.items.map((item) => (
            <div key={item.id} className="min-h-[70px] px-3 py-2">
              <strong className="block text-[24px] font-bold leading-[1.2] tracking-[-0.03em] text-[var(--color-text-primary)]">
                {item.value}
              </strong>
              <span className="mt-2 block text-[16px] font-normal leading-[1.35] text-[var(--color-text-sub)]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
