import type { PageHeaderSection } from "@/lib/content/types";

type PageHeaderSectionProps = {
  section: PageHeaderSection;
};

export function PageHeaderSectionView({ section }: PageHeaderSectionProps) {
  const { title, description } = section.data;

  return (
    <section className="bg-[#f2f2f2] pb-10 pt-16 md:pb-[50px] md:pt-[110px]">
      <div className="penta-container">
        <h1 className="text-balance text-[38px] font-black leading-[1.15] tracking-[-0.03em] text-(--color-text-primary) md:text-[60px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-[18px] max-w-[900px] text-[16px] leading-[26px] text-(--color-text-sub) md:text-[18px] md:leading-[30px]">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
