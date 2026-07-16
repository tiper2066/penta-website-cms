import type { HeroSection } from "@/lib/content/types";
import { HeroMainVisual } from "@/components/visuals/figma-visuals";

type HeroSectionProps = {
  section: HeroSection;
};

export function HeroSectionView({ section }: HeroSectionProps) {
  return (
    <section className="relative min-h-[520px] overflow-hidden pb-24 pt-16 lg:min-h-[720px] lg:pb-[160px] lg:pt-[112px]">
      <div className="pointer-events-none absolute left-1/2 top-8 h-[320px] w-[320px] translate-x-[-10%] rounded-full bg-white/20 blur-3xl lg:h-[520px] lg:w-[520px] lg:translate-x-[4%]" />
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="penta-container relative h-full min-h-[520px] lg:min-h-[720px]">
          <HeroMainVisual />
        </div>
      </div>

      <div className="penta-container relative z-10 min-h-[320px] lg:min-h-[410px]">
        <div className="relative z-10">
          <p className="text-(--color-text-primary) text-[16px] font-normal leading-[1.45] tracking-[-0.03em] lg:text-[20px]">
            {section.data.eyebrow}
          </p>
          <h1 className="font-(family-name:--font-hero) text-(--color-text-primary) mt-3 max-w-[450px] whitespace-pre-line text-[clamp(48px,14vw,72px)] font-black leading-[0.94] tracking-normal lg:text-[80px]">
            {section.data.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
