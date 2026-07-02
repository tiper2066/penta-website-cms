import type { HeroSection } from "@/lib/content/types";

type HeroSectionProps = {
  section: HeroSection;
};

export function HeroSectionView({ section }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pb-[116px] pt-[84px]">
      <div className="pointer-events-none absolute left-1/2 top-8 h-[520px] w-[520px] -translate-x-[-4%] rounded-full bg-white/20 blur-3xl" />

      <div className="penta-container grid min-h-[410px] items-start gap-12 lg:grid-cols-[0.94fr_1.06fr]">
        <div className="relative z-10">
          <p className="text-[20px] font-normal leading-[1.45] tracking-[-0.03em] text-[var(--color-text-primary)]">
            {section.data.eyebrow}
          </p>
          <h1 className="mt-3 max-w-[450px] whitespace-pre-line font-[family-name:var(--font-hero)] text-[80px] font-black leading-[0.94] tracking-[-0.065em] text-[var(--color-text-primary)]">
            {section.data.title}
          </h1>
        </div>

        <div className="relative min-h-[410px]">
          <div className="absolute left-[9%] top-[4%] h-[212px] w-[212px] rounded-full bg-brand-yellow shadow-[36px_32px_58px_rgba(255,196,0,0.34)]" />
          <div className="absolute right-[11%] top-[7%] h-[190px] w-[190px] rounded-[34px] bg-brand-blue" />
          <div className="absolute bottom-[17%] left-[28%] h-[150px] w-[245px] rounded-[12px] bg-white/72 shadow-[0_30px_55px_rgba(17,17,17,0.16)] backdrop-blur-sm" />
          <div className="absolute bottom-[20%] right-[17%] h-0 w-0 border-b-[136px] border-l-[76px] border-r-[76px] border-b-brand-cyan border-l-transparent border-r-transparent" />
        </div>
      </div>
    </section>
  );
}
