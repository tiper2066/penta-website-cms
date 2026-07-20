import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { getPage } from "@/lib/content/helpers";
import { getSiteContent } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "D.AMO - 국내 최초 암호 플랫폼 | Penta Security",
  description:
    "국내 최초 암호 플랫폼 D.AMO의 데이터 암호화, 키 관리, 컴플라이언스 지원 기능을 소개합니다.",
};

const PAGE_ID = "data-security";

export default function DataSecurityPage() {
  const content = getSiteContent();
  const page = getPage(content, PAGE_ID);
  const sections = page?.sections.filter((section) => section.enabled) ?? [];

  return (
    <div className="bg-[#f2f2f2] text-(--color-text-primary)">
      <SiteHeader navigation={content.navigation} footer={content.footer} />

      <main>
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>

      <SiteFooter footer={content.footer} navigation={content.navigation} />
    </div>
  );
}
