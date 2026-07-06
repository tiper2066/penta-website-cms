import { Globe, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { FooterContent, NavigationContent } from "@/lib/content/types";

type SiteHeaderProps = {
  navigation: NavigationContent;
  footer: FooterContent;
};

export function SiteHeader({ navigation, footer }: SiteHeaderProps) {
  return (
    <header className="relative z-30 py-[30px]">
      <div className="penta-container flex h-9 items-center justify-between gap-8">
        <Link href={navigation.logo.href} className="flex items-center">
          <Image
            src={navigation.logo.image}
            alt={navigation.logo.label}
            width={206}
            height={24}
            style={{ height: "auto" }}
            priority
          />
        </Link>

        <div className="group/menu hidden lg:flex">
          <nav className="flex items-center gap-[46px] text-[14px] font-medium tracking-[0.7px] text-(--color-text-primary)">
            {navigation.items.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>

          <span
            aria-hidden="true"
            className="absolute left-0 top-[58px] hidden h-[38px] w-full group-hover/menu:block group-focus-within/menu:block"
          />

          <div className="invisible pointer-events-none absolute left-0 top-full hidden w-full -translate-y-2 border-y border-[#d9d9d9] bg-background/95 py-[46px] opacity-0 shadow-[0_24px_48px_rgba(0,0,0,0.08)] backdrop-blur transition-all duration-200 ease-out group-hover/menu:visible group-hover/menu:pointer-events-auto group-hover/menu:translate-y-0 group-hover/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:pointer-events-auto group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100 lg:block">
            <nav
              className="penta-container grid gap-10 lg:grid-cols-[repeat(4,minmax(0,1fr))_max-content]"
              aria-label="전체 메뉴"
            >
              {footer.groups.map((group) => (
                <section
                  key={group.title}
                  className={cn("min-w-0", group.title === "Company" && "w-fit justify-self-end")}
                >
                  <h2 className="text-[18px] font-extrabold text-(--color-text-primary)">{group.title}</h2>
                  <div className="mt-4 h-px w-[42px] bg-(--color-text-primary)" />
                  <ul className="mt-5 space-y-2.5 text-[14px] font-medium leading-[1.45] text-(--color-text-primary)">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="transition-colors hover:text-(--color-text-accent)">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-4 text-foreground/70">
          {navigation.search.enabled ? (
            <button
              type="button"
              className="inline-flex h-[30px] w-[181px] items-center justify-end rounded-[70px] border border-[#222] bg-transparent px-[9px] text-[12px] font-medium text-(--color-text-primary) transition-colors hover:bg-white/50"
              aria-label={navigation.search.placeholder}
            >
              <span className="sr-only">{navigation.search.placeholder}</span>
              <Search className="h-5 w-5" />
            </button>
          ) : null}
          <button
            type="button"
            className="inline-flex h-5 w-5 items-center justify-center rounded-full text-(--color-text-primary) transition-colors hover:bg-white/50"
            aria-label="Language"
          >
            <Globe className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
