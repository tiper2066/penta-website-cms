import type { StatementSection } from "@/lib/content/types";

type StatementSectionProps = {
  section: StatementSection;
};

export function StatementSectionView({ section }: StatementSectionProps) {
  const { title, body } = section.data;

  return (
    <section className="bg-[#f2f2f2]">
      <div className="penta-container">
        <h2 className="text-balance whitespace-pre-line text-[28px] font-bold leading-[1.42] text-(--color-text-primary) md:text-[34px]">
          {title}
        </h2>
        {body ? (
          <p className="mt-6 max-w-[1060px] whitespace-pre-line text-[16px] leading-[28px] text-(--color-text-sub) md:text-[18px] md:leading-8">
            {body}
          </p>
        ) : null}
      </div>
    </section>
  );
}
