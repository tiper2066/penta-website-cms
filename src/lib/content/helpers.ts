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

// 공개 라우트 경로(pathname)를 편집 대상 페이지 id로 매핑합니다.
// 미리보기 내부 링크 클릭 → 좌측 편집 대상 전환에 사용합니다.
// slug의 `:param` 세그먼트는 임의의 한 세그먼트로 취급합니다(예: 라인업 상세).
export function resolvePageIdByPath(content: SiteContent, pathname: string): string | null {
  const exact = content.pages.find((page) => page.slug === pathname);
  if (exact) {
    return exact.id;
  }
  for (const page of content.pages) {
    if (!page.slug.includes(":")) {
      continue;
    }
    const pattern = `^${page.slug.replace(/:[^/]+/g, "[^/]+")}$`;
    if (new RegExp(pattern).test(pathname)) {
      return page.id;
    }
  }
  return null;
}
