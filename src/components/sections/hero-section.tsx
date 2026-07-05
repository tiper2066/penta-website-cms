import type { HeroSection } from "@/lib/content/types";
import { HeroMainVisual } from "@/components/visuals/figma-visuals";

type HeroSectionProps = {
  section: HeroSection;
};

export function HeroSectionView({ section }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pb-[116px] pt-[84px]">
      <div className="pointer-events-none absolute left-1/2 top-8 h-[520px] w-[520px] translate-x-[4%] rounded-full bg-white/20 blur-3xl" />

      <div className="penta-container grid min-h-[410px] items-start gap-12 lg:grid-cols-[0.94fr_1.06fr]">
        <div className="relative z-10">
          <p className="text-(--color-text-primary) text-[20px] font-normal leading-[1.45] tracking-[-0.03em]">
            {section.data.eyebrow}
          </p>
          <h1 className="font-(family-name:--font-hero) text-(--color-text-primary) mt-3 max-w-[450px] whitespace-pre-line text-[80px] font-black leading-[0.94] tracking-[-0.065em]">
            {section.data.title}
          </h1>
        </div>

        <div className="relative min-h-[410px]">
          <HeroMainVisual />
        </div>
      </div>
    </section>
  );
}
