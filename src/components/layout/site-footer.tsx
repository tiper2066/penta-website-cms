import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { FooterContent, NavigationContent } from "@/lib/content/types";

type SiteFooterProps = {
  footer: FooterContent;
  navigation: NavigationContent;
};

export function SiteFooter({ footer, navigation }: SiteFooterProps) {
  return (
    <footer className="bg-(--color-footer-bg) pb-[72px] text-(--color-text-primary)">
      <div className="penta-container border-t border-[#d9d9d9] pt-[72px]">
        <nav
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_max-content]"
          aria-label="Footer navigation"
        >
          {footer.groups.map((group) => (
            <div
              key={group.title}
              className={cn(group.title === "Company" && "w-fit justify-self-end")}
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
            </div>
          ))}
        </nav>

        <div className="mt-[76px] grid gap-10 border-t border-[#d9d9d9] pt-[46px] lg:grid-cols-[260px_1fr]">
          <div className="flex flex-col justify-between gap-10">
            <Image
              src={navigation.logo.image}
              alt={navigation.logo.label}
              width={206}
              height={24}
              style={{ height: "auto" }}
            />
            <Link href={footer.legal.privacy.href} className="text-[16px] font-normal text-(--color-text-primary)">
              {footer.legal.privacy.label}
            </Link>
          </div>

          <div className="text-right text-[16px] font-normal leading-[1.55] text-(--color-text-primary)">
            <div className="flex flex-wrap justify-end gap-x-8 gap-y-2 text-[18px] font-medium">
              {footer.legal.utilityLinks.map((item, index) => (
                <div key={item.href} className="flex items-center gap-x-8">
                  {index > 0 ? <span aria-hidden="true">|</span> : null}
                  <Link href={item.href} className="hover:text-(--color-text-accent)">
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-[30px] whitespace-pre-line text-[16px] font-normal leading-[1.55]">
              {footer.legal.companyInfo}
              {"\n"}
              {footer.legal.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
