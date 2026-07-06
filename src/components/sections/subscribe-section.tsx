import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SubscribeItem, SubscribeSection } from "@/lib/content/types";

type SubscribeSectionProps = {
  section: SubscribeSection;
};

function SubscribeControl({ item }: { item: SubscribeItem }) {
  if (item.type === "text") {
    return <p className="text-[20px] font-semibold tracking-[-0.02em] text-(--color-text-dark)">{item.value}</p>;
  }

  if (item.type === "input") {
    return (
      <Input
        name={item.name}
        placeholder={item.placeholder}
        type="email"
        className="h-[50px] min-w-0 rounded-[25px] border-(--color-text-primary) bg-white px-5 text-[16px] text-(--color-text-primary) placeholder:text-(--color-text-muted) md:w-[320px]"
      />
    );
  }

  return (
    <Button
      asChild
      className="h-[50px] rounded-[6px] px-[28px] text-[18px] font-semibold text-white! hover:text-white! **:text-white!"
    >
      <Link href={item.href} className="text-white!">
        {item.label}
      </Link>
    </Button>
  );
}

export function SubscribeSectionView({ section }: SubscribeSectionProps) {
  return (
    <section className="pb-[44px] pt-[22px]">
      <div className="penta-container">
        <div className="grid h-[132px] items-center gap-5 rounded-[6px] bg-card px-8 shadow-none md:grid-cols-[1fr_auto_auto] md:px-[38px]">
          {section.data.items.map((item) => (
            <SubscribeControl key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
