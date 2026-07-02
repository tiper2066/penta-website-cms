import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SubscribeItem, SubscribeSection } from "@/lib/content/types";

type SubscribeSectionProps = {
  section: SubscribeSection;
};

function SubscribeControl({ item }: { item: SubscribeItem }) {
  if (item.type === "text") {
    return <p className="text-[20px] font-semibold tracking-[-0.02em] text-[var(--color-text-dark)]">{item.value}</p>;
  }

  if (item.type === "input") {
    return (
      <Input
        name={item.name}
        placeholder={item.placeholder}
        type="email"
        className="h-[34px] min-w-0 rounded-[17px] bg-white px-5 text-[16px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] md:w-[320px]"
      />
    );
  }

  return (
    <Button asChild className="h-[34px] rounded-[6px] px-[28px] text-[18px] font-semibold text-white">
      <Link href={item.href}>{item.label}</Link>
    </Button>
  );
}

export function SubscribeSectionView({ section }: SubscribeSectionProps) {
  return (
    <section className="py-[44px]">
      <div className="penta-container">
        <div className="grid min-h-[82px] items-center gap-5 rounded-[6px] bg-card px-8 py-6 shadow-none md:grid-cols-[1fr_auto_auto] md:px-[38px]">
          {section.data.items.map((item) => (
            <SubscribeControl key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
