import demoSite from "@/content/demo-site.json";

import type { HomeSection, SiteContent } from "./types";

export function getSiteContent(): SiteContent {
  return demoSite as SiteContent;
}

export function getHomePageContent() {
  return getSiteContent().pages.home;
}

export function getEnabledHomeSections(): HomeSection[] {
  return getHomePageContent().sections.filter((section) => section.enabled);
}
