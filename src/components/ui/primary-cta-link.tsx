import type { ComponentProps } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type PrimaryCtaLinkProps = ComponentProps<typeof Link> & {
  className?: string;
};

export function PrimaryCtaLink({ className, children, style, ...props }: PrimaryCtaLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "hover:bg-primary/90",
        className,
        "[&]:text-white [&:hover]:text-white [&_svg]:text-white",
      )}
      style={{ ...style, color: "#fff" }}
      {...props}
    >
      {children}
    </Link>
  );
}
