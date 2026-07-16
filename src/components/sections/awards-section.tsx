import type { AwardsSection } from "@/lib/content/types";
import { AwardsCarousel } from "./awards-carousel";

type AwardsSectionProps = {
  section: AwardsSection;
};

export function AwardsSectionView({ section }: AwardsSectionProps) {
  return (
    <section className="pb-16 pt-10 lg:pb-[94px] lg:pt-[56px]">
      <div className="penta-container">
        <AwardsCarousel items={section.data.items} />
      </div>
    </section>
  );
}
