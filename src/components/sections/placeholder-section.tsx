import { cn } from "@/lib/utils";
import type { PlaceholderSection } from "@/lib/content/types";

type PlaceholderSectionProps = {
  section: PlaceholderSection;
};

export function PlaceholderSectionView({ section }: PlaceholderSectionProps) {
  const { title, label } = section.data;

  return (
    <section className={cn("bg-[#f2f2f2]", title && "py-16 md:py-[100px]")}>
      <div className="penta-container">
        {title ? (
          <h2 className="text-[28px] font-bold leading-tight text-(--color-text-primary) md:text-[36px]">
            {title}
          </h2>
        ) : null}
        <div
          className={cn(
            "flex h-[200px] items-center justify-center rounded-[14px] bg-[#7c7c7c] text-[15px] text-[#d6d9de] md:h-[260px]",
            title && "mt-8 md:mt-[43px]",
          )}
        >
          {label}
        </div>
      </div>
    </section>
  );
}
