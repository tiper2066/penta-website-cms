"use client";

import { useSyncExternalStore } from "react";

import { PreviewHighlight } from "@/components/admin/preview-highlight";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionRenderer } from "@/components/sections/section-renderer";
import {
  getContentSnapshot,
  getServerContentSnapshot,
  subscribeContent,
} from "@/lib/content/admin-store";
import { getHomeSections } from "@/lib/content/helpers";

export default function AdminPreviewPage() {
  const content = useSyncExternalStore(
    subscribeContent,
    getContentSnapshot,
    getServerContentSnapshot,
  );

  const sections = getHomeSections(content).filter((section) => section.enabled);

  return (
    <>
      <SiteHeader
        navigation={content.navigation}
        footer={content.footer}
        previewId="global:navigation"
      />
      <main>
        {sections.map((section) => (
          <div key={section.id} data-preview-id={`section:${section.id}`}>
            <SectionRenderer section={section} />
          </div>
        ))}
      </main>
      <SiteFooter
        footer={content.footer}
        navigation={content.navigation}
        previewId="global:footer"
      />
      <PreviewHighlight />
    </>
  );
}
