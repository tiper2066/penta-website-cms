import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { getEnabledHomeSections, getSiteContent } from "@/lib/content/site";

export default function Home() {
  const content = getSiteContent();
  const sections = getEnabledHomeSections();

  return (
    <>
      <SiteHeader navigation={content.navigation} />
      <main>
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>
      <SiteFooter footer={content.footer} navigation={content.navigation} />
    </>
  );
}
