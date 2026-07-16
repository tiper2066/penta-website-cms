"use client";

import { Globe, Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { FooterContent, NavigationContent } from "@/lib/content/types";

type SiteHeaderProps = {
  navigation: NavigationContent;
  footer: FooterContent;
};

export function SiteHeader({ navigation, footer }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function updateScrollState() {
      setHasScrolled(window.scrollY > 0);
    }

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-white/40 bg-background/82 py-5 backdrop-blur-xl transition-shadow duration-200 lg:py-[30px]",
        hasScrolled && "shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
      )}
    >
      <div className="penta-container flex h-9 items-center justify-between gap-5 lg:gap-8">
        <Link href={navigation.logo.href} className="flex items-center">
          <Image
            src={navigation.logo.image}
            alt={navigation.logo.label}
            width={206}
            height={24}
            className="w-[158px] lg:w-[206px]"
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

        <div className="flex items-center gap-3 text-foreground/70 lg:gap-4">
          {navigation.search.enabled ? (
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#222] bg-transparent text-(--color-text-primary) transition-colors hover:bg-white/50 lg:h-[30px] lg:w-[181px] lg:justify-end lg:rounded-[70px] lg:px-[9px] lg:text-[12px] lg:font-medium"
              aria-label={navigation.search.placeholder}
            >
              <span className="sr-only">{navigation.search.placeholder}</span>
              <Search className="h-5 w-5" />
            </button>
          ) : null}
          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-(--color-text-primary) transition-colors hover:bg-white/50 lg:inline-flex lg:h-5 lg:w-5"
            aria-label="Language"
          >
            <Globe className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#222] text-(--color-text-primary) transition-colors hover:bg-white/50 lg:hidden"
            aria-label="전체 메뉴 열기"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" aria-hidden="true" onClick={closeMenu} />
          <aside
            className="fixed bottom-0 right-0 top-0 z-50 w-[min(86vw,360px)] overflow-y-auto bg-background px-6 py-6 shadow-[-24px_0_48px_rgba(0,0,0,0.14)] lg:hidden"
            aria-label="모바일 전체 메뉴"
          >
            <div className="flex items-center justify-between gap-4">
              <Image
                src={navigation.logo.image}
                alt={navigation.logo.label}
                width={158}
                height={19}
                style={{ height: "auto" }}
              />
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#222]"
                aria-label="전체 메뉴 닫기"
                onClick={closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-10" aria-label="모바일 주요 메뉴">
              <ul className="space-y-2">
                {navigation.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-[52px] items-center border-b border-[#d9d9d9] text-[20px] font-bold text-(--color-text-primary)"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="mt-8 space-y-4" aria-label="모바일 전체 메뉴">
              {footer.groups.map((group) => (
                <details key={group.title} className="group rounded-[10px] bg-white px-4 py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-[16px] font-extrabold text-(--color-text-primary)">
                    {group.title}
                    <span className="text-[20px] leading-none transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <ul className="mt-3 space-y-2 border-t border-[#e5e5e5] pt-3 text-[15px] font-medium text-(--color-text-primary)">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="block py-1.5" onClick={closeMenu}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </nav>

            <div className="mt-8 flex items-center gap-3 text-[15px] font-medium">
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#222] px-4 py-2">
                <Search className="h-4 w-4" />
                {navigation.search.placeholder}
              </button>
              <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#222]">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </button>
            </div>
          </aside>
        </>
      ) : null}
    </header>
  );
}
