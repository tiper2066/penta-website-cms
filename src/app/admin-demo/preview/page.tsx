"use client";

import { useSyncExternalStore } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionRenderer } from "@/components/sections/section-renderer";
import {
  getContentSnapshot,
  getServerContentSnapshot,
  subscribeContent,
} from "@/lib/content/admin-store";

export default function AdminPreviewPage() {
  const content = useSyncExternalStore(
    subscribeContent,
    getContentSnapshot,
    getServerContentSnapshot,
  );

  const sections = content.pages.home.sections.filter((section) => section.enabled);

  return (
    <>
      <SiteHeader navigation={content.navigation} footer={content.footer} />
      <main>
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>
      <SiteFooter footer={content.footer} navigation={content.navigation} />
    </>
  );
}
