import Image from "next/image";

import type { AwardsSection } from "@/lib/content/types";

type AwardsSectionProps = {
  section: AwardsSection;
};

export function AwardsSectionView({ section }: AwardsSectionProps) {
  return (
    <section className="pb-[94px] pt-[56px]">
      <div className="penta-container">
        <div className="mb-[52px]">
          <p className="text-[14px] font-extrabold uppercase tracking-[0.28em] text-[var(--color-text-primary)]">
            Awards
          </p>
          <h2 className="mt-3 text-[54px] font-bold leading-[1.18] tracking-[-0.055em] text-[var(--color-text-primary)]">
            검증된 보안 기술
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {section.data.items.map((item) => (
            <article key={item.id} className="text-center">
              <div className="flex h-[82px] items-center justify-center">
                <Image
                  src={item.logo}
                  alt={item.title}
                  width={170}
                  height={52}
                  className="max-h-[52px] w-auto object-contain"
                />
              </div>
              <h3 className="mx-auto mt-7 max-w-[300px] text-[18px] font-semibold leading-[1.45] tracking-[-0.02em] text-[var(--color-text-primary)]">
                {item.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[320px] text-[18px] font-normal leading-[1.45] tracking-[-0.02em] text-[var(--color-text-faint)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
