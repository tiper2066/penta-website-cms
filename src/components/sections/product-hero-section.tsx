import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PrimaryCtaLink } from "@/components/ui/primary-cta-link";
import type { ProductHeroSection } from "@/lib/content/types";

type ProductHeroSectionProps = {
  section: ProductHeroSection;
};

export function ProductHeroSectionView({ section }: ProductHeroSectionProps) {
  const { title, subtitle, description, primaryCta, secondaryCta, image, imageAlt } = section.data;

  return (
    <section className="bg-[#f2f2f2] pb-24 pt-16 md:pb-[200px] md:pt-[110px]">
      <div className="penta-container grid items-start gap-10 md:grid-cols-[1fr_240px]">
        <div>
          <h1 className="text-balance text-[38px] font-black leading-[1.15] tracking-[-0.03em] text-(--color-text-primary) md:text-[60px]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 text-[24px] font-bold leading-tight text-(--color-text-primary) md:text-[30px]">
              {subtitle}
            </p>
          ) : null}
          {description ? (
            <p className="mt-5 max-w-[760px] whitespace-pre-line text-[16px] leading-[26px] text-(--color-text-sub) md:text-[18px] md:leading-[30px]">
              {description}
            </p>
          ) : null}
          <div className="mt-[34px] flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {primaryCta.label ? (
              <PrimaryCtaLink href={primaryCta.href} className="h-14 w-full px-[30px] text-[16px] sm:w-auto">
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </PrimaryCtaLink>
            ) : null}
            {secondaryCta.label ? (
              <Button
                asChild
                variant="outline"
                className="h-14 w-full border-[#cccfd4] bg-white px-[30px] text-[16px] hover:border-primary sm:w-auto"
              >
                <Link href={secondaryCta.href}>
                  {secondaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>

        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            width={240}
            height={290}
            className="hidden h-auto w-[240px] justify-self-end md:block"
            priority
          />
        ) : null}
      </div>
    </section>
  );
}
