import { Globe2, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { NavigationContent } from "@/lib/content/types";

type SiteHeaderProps = {
  navigation: NavigationContent;
};

export function SiteHeader({ navigation }: SiteHeaderProps) {
  return (
    <header className="relative z-20 py-[30px]">
      <div className="penta-container flex h-9 items-center justify-between gap-8">
        <Link href={navigation.logo.href} className="flex items-center">
          <Image
            src={navigation.logo.image}
            alt={navigation.logo.label}
            width={124}
            height={23}
            style={{ height: "auto" }}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-[46px] text-[14px] font-medium text-[var(--color-text-primary)] lg:flex">
          {navigation.items.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-foreground/70">
          {navigation.search.enabled ? (
            <button
              type="button"
              className="inline-flex h-[20px] w-[136px] items-center justify-end gap-2 rounded-[10px] border border-[#9a9a9a] bg-transparent px-2 text-[12px] font-medium text-[var(--color-text-primary)] transition-colors hover:bg-white/50"
              aria-label={navigation.search.placeholder}
            >
              <span className="sr-only">{navigation.search.placeholder}</span>
              <Search className="h-3 w-3" />
            </button>
          ) : null}
          <button
            type="button"
            className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[var(--color-text-primary)] transition-colors hover:bg-white/50"
            aria-label="Language"
          >
            <Globe2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
