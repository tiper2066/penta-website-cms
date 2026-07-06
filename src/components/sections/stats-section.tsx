import type { StatsSection } from "@/lib/content/types";

type StatsSectionProps = {
  section: StatsSection;
};

export function StatsSectionView({ section }: StatsSectionProps) {
  return (
    <section className="py-[56px]">
      <div className="penta-container">
        <div className="flex flex-wrap items-stretch gap-x-6 gap-y-4 overflow-hidden rounded-[6px] bg-card px-[26px] py-[24px] shadow-none">
          {section.data.items.map((item) => (
            <div key={item.id} className="min-h-[70px] min-w-fit flex-1 px-3 py-2">
              <span className="block text-[16px] font-normal leading-[1.35] text-(--color-text-sub)">
                {item.label}
              </span>
              <strong className="mt-2 block whitespace-nowrap text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-(--color-text-primary)">
                {item.value}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
