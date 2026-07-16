import { Input } from "@/components/ui/input";
import { PrimaryCtaLink } from "@/components/ui/primary-cta-link";
import type { SubscribeItem, SubscribeSection } from "@/lib/content/types";

type SubscribeSectionProps = {
  section: SubscribeSection;
};

function SubscribeControl({ item }: { item: SubscribeItem }) {
  if (item.type === "text") {
    return (
      <p className="text-[17px] font-semibold tracking-[-0.02em] text-(--color-text-dark) md:text-[20px]">
        {item.value}
      </p>
    );
  }

  if (item.type === "input") {
    return (
      <Input
        name={item.name}
        placeholder={item.placeholder}
        type="email"
        className="h-[50px] w-full min-w-0 rounded-[25px] border-(--color-text-primary) bg-white px-5 text-[16px] text-(--color-text-primary) placeholder:text-(--color-text-muted) md:w-[320px]"
      />
    );
  }

  return (
    <PrimaryCtaLink href={item.href} className="h-[50px] w-full rounded-[6px] px-[28px] text-[18px] md:w-auto">
      {item.label}
    </PrimaryCtaLink>
  );
}

export function SubscribeSectionView({ section }: SubscribeSectionProps) {
  return (
    <section className="pb-8 pt-5 lg:pb-[44px] lg:pt-[22px]">
      <div className="penta-container">
        <div className="grid h-auto items-center gap-4 rounded-[6px] bg-card p-6 shadow-none md:grid-cols-[1fr_auto_auto] md:px-[38px] lg:h-[132px]">
          {section.data.items.map((item) => (
            <SubscribeControl key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
