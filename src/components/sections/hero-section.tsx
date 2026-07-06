import type { HeroSection } from "@/lib/content/types";
import { HeroMainVisual } from "@/components/visuals/figma-visuals";

type HeroSectionProps = {
  section: HeroSection;
};

export function HeroSectionView({ section }: HeroSectionProps) {
  return (
    <section className="relative min-h-[720px] overflow-hidden pb-[160px] pt-[112px]">
      <div className="pointer-events-none absolute left-1/2 top-8 h-[520px] w-[520px] translate-x-[4%] rounded-full bg-white/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="penta-container relative h-full min-h-[720px]">
          <HeroMainVisual />
        </div>
      </div>

      <div className="penta-container relative z-10 min-h-[410px]">
        <div className="relative z-10">
          <p className="text-(--color-text-primary) text-[20px] font-normal leading-[1.45] tracking-[-0.03em]">
            {section.data.eyebrow}
          </p>
          <h1 className="font-(family-name:--font-hero) text-(--color-text-primary) mt-3 max-w-[450px] whitespace-pre-line text-[80px] font-black leading-[0.94] tracking-normal">
            {section.data.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
