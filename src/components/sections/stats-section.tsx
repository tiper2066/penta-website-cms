import type { StatsSection } from "@/lib/content/types";

type StatsSectionProps = {
  section: StatsSection;
};

export function StatsSectionView({ section }: StatsSectionProps) {
  return (
    <section className="py-10 lg:py-[56px]">
      <div className="penta-container">
        <div className="grid grid-cols-2 gap-3 overflow-hidden rounded-[6px] bg-card p-4 shadow-none sm:gap-4 lg:flex lg:flex-wrap lg:items-stretch lg:gap-x-6 lg:gap-y-4 lg:px-[26px] lg:py-[24px]">
          {section.data.items.map((item) => (
            <div
              key={item.id}
              className="min-h-[82px] rounded-[6px] bg-[#f7f7f7] px-4 py-3 lg:min-h-[70px] lg:min-w-fit lg:flex-1 lg:bg-transparent lg:px-3 lg:py-2"
            >
              <span className="block text-[14px] font-normal leading-[1.35] text-(--color-text-sub) lg:text-[16px]">
                {item.label}
              </span>
              <strong className="mt-2 block break-keep text-[18px] font-bold leading-[1.25] tracking-[-0.03em] text-(--color-text-primary) lg:whitespace-nowrap lg:text-[20px] lg:leading-[1.2]">
                {item.value}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
