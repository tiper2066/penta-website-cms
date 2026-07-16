"use client";

import {
  Download,
  ExternalLink,
  Monitor,
  RotateCcw,
  Smartphone,
  SquareArrowOutUpRight,
  Tablet,
} from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
} from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getContentSnapshot,
  getServerContentSnapshot,
  resetContent,
  subscribeContent,
  writeContent,
} from "@/lib/content/admin-store";
import type { SiteContent } from "@/lib/content/types";

import type { UpdateContent } from "./admin-fields";
import {
  AwardsPanel,
  FooterPanel,
  HeroPanel,
  NavigationPanel,
  NewsPanel,
  ProductTabsPanel,
  SectionsPanel,
  StatsPanel,
  SubscribePanel,
} from "./admin-panels";

type PanelComponent = ComponentType<{ content: SiteContent; update: UpdateContent }>;

type Category = {
  id: string;
  label: string;
  Panel: PanelComponent;
};

const CATEGORIES: Category[] = [
  { id: "navigation", label: "네비게이션", Panel: NavigationPanel },
  { id: "sections", label: "섹션 순서", Panel: SectionsPanel },
  { id: "hero", label: "Hero", Panel: HeroPanel },
  { id: "news", label: "News", Panel: NewsPanel },
  { id: "subscribe", label: "Subscribe", Panel: SubscribePanel },
  { id: "products", label: "Product Tabs", Panel: ProductTabsPanel },
  { id: "stats", label: "Stats", Panel: StatsPanel },
  { id: "awards", label: "Awards", Panel: AwardsPanel },
  { id: "footer", label: "Footer", Panel: FooterPanel },
];

type Device = "desktop" | "tablet" | "mobile";

const DEVICE_WIDTH: Record<Device, number> = {
  desktop: 1280,
  tablet: 834,
  mobile: 390,
};

const DEVICE_OPTIONS: Array<{ id: Device; label: string; Icon: typeof Monitor }> = [
  { id: "desktop", label: "데스크톱", Icon: Monitor },
  { id: "tablet", label: "태블릿", Icon: Tablet },
  { id: "mobile", label: "모바일", Icon: Smartphone },
];

const PREVIEW_URL = "/admin-demo/preview";

function nowLabel(): string {
  return new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function AdminEditor() {
  const content = useSyncExternalStore(
    subscribeContent,
    getContentSnapshot,
    getServerContentSnapshot,
  );
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
  const [device, setDevice] = useState<Device>("desktop");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const update = useCallback<UpdateContent>((mutator) => {
    const draft = structuredClone(getContentSnapshot());
    mutator(draft);
    writeContent(draft);
    setSavedAt(nowLabel());
  }, []);

  const handleReset = useCallback(() => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm("모든 편집 내용을 초기 JSON 상태로 되돌립니다. 계속할까요?");
      if (!confirmed) {
        return;
      }
    }
    resetContent();
    setSavedAt(nowLabel());
  }, []);

  const handleExport = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    const snapshot = getContentSnapshot();
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "demo-site.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleOpenPreview = useCallback(() => {
    if (typeof window !== "undefined") {
      window.open(PREVIEW_URL, "_blank", "noopener,noreferrer");
    }
  }, []);

  const previewAreaRef = useRef<HTMLDivElement>(null);
  const [previewArea, setPreviewArea] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = previewAreaRef.current;
    if (!element || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) {
        setPreviewArea({ width: rect.width, height: rect.height });
      }
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const frameWidth = DEVICE_WIDTH[device];
  const scale = previewArea.width > 0 ? Math.min(1, previewArea.width / frameWidth) : 1;
  const frameHeight = previewArea.height > 0 ? previewArea.height / scale : 800;

  const ActivePanel = useMemo(
    () => CATEGORIES.find((category) => category.id === activeCategory)?.Panel ?? NavigationPanel,
    [activeCategory],
  );

  return (
    <main className="min-h-screen bg-[#f7f7f7] px-4 py-8 md:px-6">
      <div className="flex w-full flex-col gap-6">
        <header className="flex flex-col justify-between gap-5 rounded-xl bg-primary p-7 text-primary-foreground lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Admin Demo</Badge>
              {savedAt ? (
                <span className="text-xs text-white/60">자동 저장됨 · {savedAt}</span>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.03em]">콘텐츠 편집 데모</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              왼쪽에서 항목을 수정하면 오른쪽 미리보기에 실시간으로 반영됩니다. 편집 내용은 이 브라우저에만
              저장되며(localStorage) 실제 서버에는 반영되지 않습니다.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4" />
              초기화
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Download className="h-4 w-4" />
              JSON 내보내기
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                원본 사이트
              </Link>
            </Button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <nav className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </nav>

            <div className="mt-5 max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
              <div key={activeCategory} className="animate-fade-in">
                <ActivePanel content={content} update={update} />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <p className="text-sm font-bold">실시간 미리보기</p>
                <span className="text-xs text-muted-foreground">
                  {DEVICE_WIDTH[device]}px{scale < 1 ? ` · ${Math.round(scale * 100)}%` : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full bg-muted p-1">
                  {DEVICE_OPTIONS.map((option) => {
                    const Icon = option.Icon;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setDevice(option.id)}
                        aria-label={option.label}
                        title={option.label}
                        className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors ${
                          device === option.id
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    );
                  })}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={handleOpenPreview}>
                  <SquareArrowOutUpRight className="h-4 w-4" />
                  편집 미리보기
                </Button>
              </div>
            </div>

            <div
              ref={previewAreaRef}
              className="mt-4 h-[calc(100vh-220px)] overflow-hidden rounded-xl bg-[#e9e9ea] p-3"
            >
              <div className="mx-auto h-full overflow-hidden" style={{ width: frameWidth * scale }}>
                <iframe
                  title="공개 페이지 미리보기"
                  src={PREVIEW_URL}
                  className="border-0 bg-background"
                  style={{
                    width: frameWidth,
                    height: frameHeight,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
