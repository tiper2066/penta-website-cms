import Image from "next/image";
import Link from "next/link";

import type { FooterContent, NavigationContent } from "@/lib/content/types";

type SiteFooterProps = {
  footer: FooterContent;
  navigation: NavigationContent;
};

export function SiteFooter({ footer, navigation }: SiteFooterProps) {
  return (
    <footer className="border-t border-[#d9d9d9] bg-[var(--color-footer-bg)] py-[72px] text-[var(--color-text-primary)]">
      <div className="penta-container">
        <nav className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5" aria-label="Footer navigation">
          {footer.groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[18px] font-extrabold text-[var(--color-text-primary)]">{group.title}</h2>
              <ul className="mt-5 space-y-2.5 text-[14px] font-medium leading-[1.45] text-[var(--color-text-primary)]">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-[var(--color-text-accent)]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-[76px] grid gap-10 border-t border-[#d9d9d9] pt-[46px] lg:grid-cols-[240px_1fr]">
          <div>
            <Image
              src={navigation.logo.image}
              alt={navigation.logo.label}
              width={124}
              height={23}
              style={{ height: "auto" }}
            />
          </div>

          <div className="text-[16px] font-normal leading-[1.55] text-[var(--color-text-primary)]">
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <Link href={footer.legal.privacy.href} className="text-[18px] font-medium">
                {footer.legal.privacy.label}
              </Link>
              {footer.legal.utilityLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[18px] font-medium hover:text-[var(--color-text-accent)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="mt-5 max-w-[760px]">{footer.legal.companyInfo}</p>
            <p className="mt-1">{footer.legal.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
