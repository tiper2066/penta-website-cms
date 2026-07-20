import demoSite from "@/content/demo-site.json";

import { getHomePage } from "./helpers";
import type { HomeSection, PageContent, SiteContent } from "./types";

export function getSiteContent(): SiteContent {
  return demoSite as SiteContent;
}

export function getHomePageContent(): PageContent | undefined {
  return getHomePage(getSiteContent());
}

export function getEnabledHomeSections(): HomeSection[] {
  return (getHomePageContent()?.sections ?? []).filter((section) => section.enabled);
}
