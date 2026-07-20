import type { BenefitsSection } from "@/lib/content/types";

type BenefitsSectionProps = {
  section: BenefitsSection;
};

export function BenefitsSectionView({ section }: BenefitsSectionProps) {
  const { title, items, imagePlaceholder } = section.data;

  return (
    <section className="bg-[#f2f2f2] py-16 md:py-[100px]">
      <div className="penta-container">
        <h2 className="text-[28px] font-bold leading-tight text-(--color-text-primary) md:text-[36px]">
          {title}
        </h2>
        <div className="mt-8 grid gap-5 md:mt-11 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {items.map((benefit) => (
            <article
              key={benefit.id}
              className="min-h-0 rounded-[10px] border border-[#e5e8ed] bg-white p-6 md:min-h-[260px] md:px-7 md:py-8"
            >
              <span className="text-[22px] font-bold text-(--color-text-accent)">{benefit.number}</span>
              <h3 className="mt-3.5 text-[19px] font-semibold leading-[27px] text-(--color-text-primary)">
                {benefit.title}
              </h3>
              <p className="mt-3.5 text-[15px] leading-6 text-(--color-text-sub)">{benefit.description}</p>
            </article>
          ))}
        </div>
        {imagePlaceholder ? (
          <div className="mt-8 flex min-h-[200px] items-center justify-center overflow-hidden rounded-[14px] bg-[#7c7c7c] p-8 text-[15px] text-[#d6d9de] md:mt-11 md:min-h-[440px] md:p-10">
            {imagePlaceholder}
          </div>
        ) : null}
      </div>
    </section>
  );
}
