import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { FooterContent, NavigationContent } from "@/lib/content/types";

type SiteFooterProps = {
  footer: FooterContent;
  navigation: NavigationContent;
};

export function SiteFooter({ footer, navigation }: SiteFooterProps) {
  const [companyInfoFirstLine, companyInfoSecondLine] = footer.legal.companyInfo.split("\n");
  const [companyPrefix, companySuffix] = companyInfoFirstLine.split(" : ");

  return (
    <footer className="bg-(--color-footer-bg) pb-12 text-(--color-text-primary) lg:pb-[72px]">
      <div className="penta-container border-t border-[#d9d9d9] pt-10 lg:pt-[72px]">
        <nav
          className="hidden gap-10 lg:grid lg:grid-cols-[repeat(4,minmax(0,1fr))_max-content]"
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

        <nav className="space-y-3 lg:hidden" aria-label="Footer mobile navigation">
          {footer.groups.map((group) => (
            <details key={group.title} className="group border-b border-[#d9d9d9] pb-3">
              <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between text-[18px] font-extrabold">
                {group.title}
                <span className="text-[22px] leading-none transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <ul className="space-y-2 pb-3 text-[15px] font-medium leading-[1.45]">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="block py-1.5 transition-colors hover:text-(--color-text-accent)">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>

        <div className="mt-10 grid gap-8 border-t border-[#d9d9d9] pt-8 lg:mt-[76px] lg:gap-10 lg:pt-[46px] lg:grid-cols-[260px_1fr]">
          <div className="flex flex-col justify-between gap-10">
            <Image
              src={navigation.logo.image}
              alt={navigation.logo.label}
              width={206}
              height={24}
              className="w-[158px] lg:w-[206px]"
              style={{ height: "auto" }}
            />
            <Link href={footer.legal.privacy.href} className="text-[16px] font-normal text-(--color-text-primary)">
              {footer.legal.privacy.label}
            </Link>
          </div>

          <div className="text-left text-[15px] font-normal leading-[1.6] text-(--color-text-primary) lg:text-right lg:text-[16px] lg:leading-[1.55]">
            <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 text-[16px] font-medium lg:justify-end lg:gap-x-8 lg:text-[18px]">
              {footer.legal.utilityLinks.map((item, index) => (
                <div key={item.href} className="flex items-center gap-x-4 lg:gap-x-8">
                  {index > 0 ? <span aria-hidden="true">|</span> : null}
                  <Link href={item.href} className="hover:text-(--color-text-accent)">
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[14px] font-normal leading-[1.65] lg:mt-[30px] lg:text-[16px] lg:leading-[1.55]">
              <span className="max-[430px]:hidden">{companyInfoFirstLine}</span>
              <span className="hidden max-[430px]:inline">
                {companyPrefix} :<br />
                {companySuffix}
              </span>
              <br />
              {companyInfoSecondLine}
              <br />
              {footer.legal.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
