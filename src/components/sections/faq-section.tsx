import type { FaqSection } from "@/lib/content/types";

type FaqSectionProps = {
  section: FaqSection;
};

export function FaqSectionView({ section }: FaqSectionProps) {
  const { title, items } = section.data;

  return (
    <section className="bg-[#f2f2f2] py-16 md:py-[100px]">
      <div className="penta-container">
        <h2 className="text-[28px] font-bold leading-tight text-(--color-text-primary) md:text-[36px]">
          {title}
        </h2>
        <div className="mt-10 flex flex-col gap-4">
          {items.map((faq) => (
            <article key={faq.id} className="rounded-xl border border-[#e5e8ed] bg-white px-5 py-6 md:px-9 md:py-[30px]">
              <div className="flex items-start gap-3.5">
                <span className="shrink-0 text-[20px] font-bold text-(--color-text-accent)">Q</span>
                <h3 className="text-[17px] font-semibold leading-7 text-(--color-text-primary) md:text-[19px]">
                  {faq.question}
                </h3>
              </div>
              <p className="mt-3.5 pl-0 text-[15px] leading-[26px] text-(--color-text-sub) md:pl-[30px] md:text-[16px] md:leading-[27px]">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
