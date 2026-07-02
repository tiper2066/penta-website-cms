import { ArrowDownUp, FileJson2, Newspaper, Rows3, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getSiteContent } from "@/lib/content/site";

const editableAreas = [
  {
    title: "Header / Footer",
    description: "상단 메뉴, 로고 링크, Footer 그룹과 법무 문구",
    icon: Rows3,
  },
  {
    title: "News",
    description: "뉴스 제목, 날짜, 배지, 링크, 항목 순서",
    icon: Newspaper,
  },
  {
    title: "Sections",
    description: "메인 섹션 노출 여부와 표시 순서",
    icon: ArrowDownUp,
  },
  {
    title: "Product Tabs",
    description: "제품 탭 라벨, 설명, 버튼, 에셋 경로",
    icon: ShieldCheck,
  },
];

export default function AdminDemoPage() {
  const content = getSiteContent();
  const sections = content.pages.home.sections;
  const productTabs = sections.find((section) => section.type === "productTabs")?.data.tabs ?? [];
  const news = sections.find((section) => section.type === "news")?.data.items ?? [];

  return (
    <main className="min-h-screen bg-[#f7f7f7] py-10">
      <div className="mx-auto flex w-[min(100%-32px,1180px)] flex-col gap-8">
        <header className="flex flex-col justify-between gap-5 rounded-[32px] bg-primary p-8 text-primary-foreground md:flex-row md:items-center">
          <div>
            <Badge variant="secondary">Admin Demo</Badge>
            <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.04em]">
              JSON 기반 콘텐츠 편집 스캐폴딩
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
              실제 인증, DB 저장, 파일 업로드 없이 마케터가 수정할 영역과 JSON 구조를 확인하는 데모 화면입니다.
            </p>
          </div>
          <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <Link href="/">공개 페이지 보기</Link>
          </Button>
        </header>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {editableAreas.map((area) => {
            const Icon = area.icon;

            return (
              <Card key={area.title}>
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{area.title}</CardTitle>
                  <CardDescription>{area.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>섹션 순서</CardTitle>
              <CardDescription>
                `pages.home.sections[]` 배열 순서가 공개 페이지 렌더링 순서가 됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className="flex items-center justify-between rounded-2xl border border-border bg-background p-4"
                >
                  <div>
                    <p className="text-sm font-bold">{section.type}</p>
                    <p className="text-xs text-muted-foreground">{section.id}</p>
                  </div>
                  <Badge variant={section.enabled ? "default" : "secondary"}>{index + 1}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>콘텐츠 상태</CardTitle>
              <CardDescription>현재 JSON에서 읽은 주요 반복 데이터입니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-2xl bg-muted p-5">
                <p className="text-sm font-semibold">뉴스 항목</p>
                <p className="mt-2 text-3xl font-extrabold">{news.length}</p>
              </div>
              <div className="rounded-2xl bg-muted p-5">
                <p className="text-sm font-semibold">제품 탭</p>
                <p className="mt-2 text-3xl font-extrabold">{productTabs.length}</p>
              </div>
              <div>
                <label className="text-sm font-semibold" htmlFor="demo-search-placeholder">
                  검색 placeholder 예시
                </label>
                <Input
                  id="demo-search-placeholder"
                  className="mt-2"
                  defaultValue={content.navigation.search.placeholder}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader className="flex-row items-center gap-4 space-y-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
              <FileJson2 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>다음 관리자 데모 확장 지점</CardTitle>
              <CardDescription>
                localStorage 기반 편집/미리보기는 다음 구현 단계에서 이 화면 위에 얹을 수 있습니다.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
