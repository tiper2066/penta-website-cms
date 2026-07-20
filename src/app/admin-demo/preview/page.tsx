"use client";

import { useEffect, useSyncExternalStore } from "react";

import { PreviewHighlight } from "@/components/admin/preview-highlight";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionRenderer } from "@/components/sections/section-renderer";
import {
  getContentSnapshot,
  getServerContentSnapshot,
  getServerUiTargetSnapshot,
  getUiTargetSnapshot,
  subscribeContent,
  subscribeUi,
  writeUiTarget,
} from "@/lib/content/admin-store";
import { getHomePage, getPage, resolvePageIdByPath } from "@/lib/content/helpers";

const COMMON_TARGET = "common";
const PREVIEW_PATH = "/admin-demo/preview";

export default function AdminPreviewPage() {
  const content = useSyncExternalStore(
    subscribeContent,
    getContentSnapshot,
    getServerContentSnapshot,
  );
  const target = useSyncExternalStore(subscribeUi, getUiTargetSnapshot, getServerUiTargetSnapshot);

  // 미리보기 내부의 내부 링크 클릭을 가로채, 실제 페이지 이동 대신 편집 대상만 전환합니다.
  // 이렇게 하면 iframe이 항상 미리보기 라우트에 머물러 편집기와의 동기화가 끊기지 않습니다.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const element = event.target as Element | null;
      const anchor = element?.closest?.("a");
      if (!anchor) {
        return;
      }
      const href = anchor.getAttribute("href");
      if (!href || (anchor.target && anchor.target !== "_self")) {
        return;
      }
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      // 외부 링크는 정상 동작하도록 둡니다.
      if (url.origin !== window.location.origin) {
        return;
      }
      // 내부 링크는 미리보기를 벗어나지 않게 막고, 매칭되는 페이지가 있으면 편집 대상으로 전환합니다.
      event.preventDefault();
      if (url.pathname === PREVIEW_PATH) {
        return;
      }
      const pageId = resolvePageIdByPath(getContentSnapshot(), url.pathname);
      if (pageId) {
        writeUiTarget(pageId);
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // 공통 요소 편집 중이거나 대상이 없으면 홈을 미리보기로 렌더합니다.
  const page =
    target && target !== COMMON_TARGET ? getPage(content, target) ?? getHomePage(content) : getHomePage(content);
  const sections = (page?.sections ?? []).filter((section) => section.enabled);

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
