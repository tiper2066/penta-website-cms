import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { getPage } from "@/lib/content/helpers";
import { getSiteContent } from "@/lib/content/site";
import type { LineupDetailItem, LineupDetailSection } from "@/lib/content/types";

const PAGE_ID = "data-security-lineup";

function getLineupDetail(): LineupDetailSection | undefined {
  const page = getPage(getSiteContent(), PAGE_ID);
  return page?.sections.find(
    (section): section is LineupDetailSection => section.type === "lineupDetail",
  );
}

function getLineupItems(): LineupDetailItem[] {
  return getLineupDetail()?.data.items ?? [];
}

function getLineupItem(slug: string): LineupDetailItem | undefined {
  return getLineupItems().find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return getLineupItems().map((item) => ({ lineup: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lineup: string }>;
}): Promise<Metadata> {
  const { lineup: slug } = await params;
  const items = getLineupItems();
  const lineup = getLineupItem(slug) ?? items[0];

  return {
    title: lineup ? `${lineup.label} - 적용 환경별 D.AMO 라인업 | Penta Security` : "D.AMO 라인업",
    description: lineup?.description,
  };
}

export default async function DataSecurityLineupPage({
  params,
}: {
  params: Promise<{ lineup: string }>;
}) {
  const { lineup: slug } = await params;
  const items = getLineupItems();
  const activeLineup = getLineupItem(slug);

  if (!activeLineup) {
    if (items.length > 0) {
      redirect(`/products/data-security/${items[0].slug}`);
    }
  }

  const content = getSiteContent();
  const page = getPage(content, PAGE_ID);
  const sections = page?.sections.filter((section) => section.enabled) ?? [];

  return (
    <div className="bg-[#f2f2f2] text-(--color-text-primary)">
      <SiteHeader navigation={content.navigation} footer={content.footer} />

      <main className="bg-[#f2f2f2] pb-16 md:pb-[100px]">
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} activeLineupSlug={slug} />
        ))}
      </main>

      <SiteFooter footer={content.footer} navigation={content.navigation} />
    </div>
  );
}
