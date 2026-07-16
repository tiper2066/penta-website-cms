import type { ComponentProps } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type TabLinkProps = ComponentProps<typeof Link> & {
  active?: boolean;
};

export function TabLink({ active = false, className, children, style, ...props }: TabLinkProps) {
  return (
    <Link
      role="tab"
      aria-selected={active}
      className={cn(
        "flex h-16 w-full max-w-none items-center justify-center rounded-[5px] px-5 text-center text-[16px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-[84px] md:max-w-[285px] md:px-6 md:text-[20px]",
        active ? "bg-primary [&]:text-white [&:hover]:text-white" : "bg-white hover:bg-white/70",
        className,
      )}
      style={{ ...style, color: active ? "#fff" : "#000" }}
      {...props}
    >
      {children}
    </Link>
  );
}
