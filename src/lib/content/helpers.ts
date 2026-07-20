import type { HomeSection, PageContent, SiteContent } from "./types";

export const HOME_PAGE_ID = "home";

export function getPage(content: SiteContent, pageId: string): PageContent | undefined {
  return content.pages.find((page) => page.id === pageId);
}

export function getHomePage(content: SiteContent): PageContent | undefined {
  return getPage(content, HOME_PAGE_ID) ?? content.pages[0];
}

// 홈 페이지 섹션 배열(참조)을 반환합니다. `find`/`splice` 같은 in-place 변형에 사용합니다.
export function getHomeSections(content: SiteContent): HomeSection[] {
  return getHomePage(content)?.sections ?? [];
}

// 드롭다운 등 편집기 UI에서 사용할 페이지 라벨.
export function getPageLabel(page: PageContent): string {
  if (page.id === HOME_PAGE_ID) {
    return "홈";
  }
  return page.title || page.slug;
}
