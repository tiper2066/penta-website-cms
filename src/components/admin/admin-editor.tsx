"use client";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  Monitor,
  Plus,
  RotateCcw,
  Smartphone,
  SquareArrowOutUpRight,
  Tablet,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
} from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getContentSnapshot,
  getServerContentSnapshot,
  getServerUiExpandedSnapshot,
  getServerUiTargetSnapshot,
  getUiExpandedSnapshot,
  getUiTargetSnapshot,
  resetContent,
  subscribeContent,
  subscribeUi,
  writeContent,
  writeUiExpanded,
  writeUiTarget,
} from "@/lib/content/admin-store";
import { getPage, getPageLabel } from "@/lib/content/helpers";
import { cn } from "@/lib/utils";
import type { SiteContent } from "@/lib/content/types";

import { TextField, type UpdateContent } from "./admin-fields";
import {
  AwardsPanel,
  BenefitsPanel,
  FaqPanel,
  FooterPanel,
  HeroPanel,
  LineupCardsPanel,
  LineupDetailPanel,
  NavigationPanel,
  NewsPanel,
  PageHeaderPanel,
  PlaceholderPanel,
  ProductHeroPanel,
  ProductTabsPanel,
  SECTION_TYPE_LABELS,
  StatementPanel,
  StatsPanel,
  SubscribePanel,
  type SectionEditorProps,
} from "./admin-panels";
import { SECTION_ADD_OPTIONS, createPage, createSection } from "./section-templates";
import { DragHandle, usePointerSortSensors, arrayMove } from "./sortable";

type CommonPanel = ComponentType<{ content: SiteContent; update: UpdateContent }>;
type SectionPanel = ComponentType<SectionEditorProps>;

type HomeSection = SiteContent["pages"][number]["sections"][number];

const COMMON_TARGET = "common";
const COMMON_LABEL = "공통 요소";
const HOME_PAGE_ID = "home";

const COMMON_ENTRIES: Array<{ value: string; label: string; Panel: CommonPanel }> = [
  { value: "navigation", label: "네비게이션(헤더)", Panel: NavigationPanel },
  { value: "footer", label: "푸터", Panel: FooterPanel },
];

// 섹션 타입 → 편집 폼 레지스트리 (공개 측 section-renderer의 타입 스위치와 대칭).
const SECTION_EDITORS: Record<string, SectionPanel> = {
  hero: HeroPanel,
  news: NewsPanel,
  subscribe: SubscribePanel,
  productTabs: ProductTabsPanel,
  stats: StatsPanel,
  awards: AwardsPanel,
  productHero: ProductHeroPanel,
  statement: StatementPanel,
  benefits: BenefitsPanel,
  lineupCards: LineupCardsPanel,
  placeholder: PlaceholderPanel,
  faq: FaqPanel,
  pageHeader: PageHeaderPanel,
  lineupDetail: LineupDetailPanel,
};

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
const MESSAGE_SOURCE = "penta-admin";

// 편집 패널(좌측) 너비 조절용 상수.
const PANEL_MIN = 320;
const PANEL_MAX = 760;
const PANEL_DEFAULT = 380;
const PANEL_STORAGE_KEY = "penta-cms:admin-demo:ui:panelWidth";

type ActivePreview = {
  id: string;
  label: string;
};

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
  const storedTarget = useSyncExternalStore(
    subscribeUi,
    getUiTargetSnapshot,
    getServerUiTargetSnapshot,
  );
  const expandedByTarget = useSyncExternalStore(
    subscribeUi,
    getUiExpandedSnapshot,
    getServerUiExpandedSnapshot,
  );
  const [device, setDevice] = useState<Device>("desktop");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  // 편집 대상 드롭다운: "공통 요소" 최상단 + 실제 페이지 목록(현재는 홈).
  const targets = [
    { id: COMMON_TARGET, label: COMMON_LABEL },
    ...content.pages.map((page) => ({ id: page.id, label: getPageLabel(page) })),
  ];

  const target =
    storedTarget && targets.some((item) => item.id === storedTarget)
      ? storedTarget
      : COMMON_TARGET;

  const isCommon = target === COMMON_TARGET;
  const currentPage = isCommon ? undefined : getPage(content, target);

  const update = useCallback<UpdateContent>((mutator) => {
    const draft = structuredClone(getContentSnapshot());
    mutator(draft);
    writeContent(draft);
    setSavedAt(nowLabel());
  }, []);

  const handleReset = useCallback(() => {
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewReadyRef = useRef(false);
  const [previewArea, setPreviewArea] = useState({ width: 0, height: 0 });

  // 편집 패널 너비(px). SSR/CSR 일치를 위해 기본값으로 시작한 뒤 마운트 후 localStorage에서 복원합니다.
  const splitRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [panelWidth, setPanelWidth] = useState(PANEL_DEFAULT);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const raw = window.localStorage.getItem(PANEL_STORAGE_KEY);
    const parsed = raw ? Number(raw) : NaN;
    if (Number.isFinite(parsed)) {
      // 서버/최초 클라이언트 렌더는 기본값으로 일치시키고(하이드레이션 안전),
      // 마운트 후에만 저장된 너비로 1회 복원합니다.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPanelWidth(Math.min(PANEL_MAX, Math.max(PANEL_MIN, parsed)));
    }
  }, []);

  const persistPanelWidth = useCallback((width: number) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PANEL_STORAGE_KEY, String(Math.round(width)));
    }
  }, []);

  const handleSplitPointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      const container = splitRef.current;
      if (!container) {
        return;
      }
      draggingRef.current = true;
      const left = container.getBoundingClientRect().left;

      const onMove = (moveEvent: PointerEvent) => {
        if (!draggingRef.current) {
          return;
        }
        const containerWidth = container.getBoundingClientRect().width;
        // 미리보기 영역이 최소 360px는 남도록 상한을 함께 제한합니다.
        const maxWidth = Math.min(PANEL_MAX, containerWidth - 360);
        const next = Math.min(maxWidth, Math.max(PANEL_MIN, moveEvent.clientX - left));
        setPanelWidth(next);
      };
      const onUp = () => {
        draggingRef.current = false;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        setPanelWidth((width) => {
          persistPanelWidth(width);
          return width;
        });
      };

      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [persistPanelWidth],
  );

  const handleSplitReset = useCallback(() => {
    setPanelWidth(PANEL_DEFAULT);
    persistPanelWidth(PANEL_DEFAULT);
  }, [persistPanelWidth]);

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

  const expandedItems = expandedByTarget[target] ?? [];

  const handleTargetChange = useCallback((value: string) => {
    writeUiTarget(value);
  }, []);

  const handleAddPage = useCallback(() => {
    const page = createPage("새 페이지", "");
    update((draft) => {
      draft.pages.push(page);
    });
    writeUiTarget(page.id);
  }, [update]);

  const handleDeletePage = useCallback(() => {
    update((draft) => {
      const index = draft.pages.findIndex((p) => p.id === target);
      if (index !== -1 && draft.pages[index].id !== HOME_PAGE_ID) {
        draft.pages.splice(index, 1);
      }
    });
    writeUiTarget(HOME_PAGE_ID);
  }, [update, target]);

  const [sectionAddKey, setSectionAddKey] = useState(0);
  const handleAddSection = useCallback(
    (type: HomeSection["type"]) => {
      update((draft) => {
        getPage(draft, target)?.sections.push(createSection(type));
      });
      setSectionAddKey((key) => key + 1);
    },
    [update, target],
  );

  const handleExpandedChange = useCallback(
    (value: string[]) => {
      writeUiExpanded({ ...getUiExpandedSnapshot(), [target]: value });
    },
    [target],
  );

  const sections = currentPage?.sections ?? [];
  const sensors = usePointerSortSensors();

  const handleSectionDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) {
        return;
      }
      update((draft) => {
        const page = getPage(draft, target);
        if (!page) {
          return;
        }
        const ids = page.sections.map((section) => section.id);
        const from = ids.indexOf(String(active.id));
        const to = ids.indexOf(String(over.id));
        if (from === -1 || to === -1) {
          return;
        }
        page.sections = arrayMove(page.sections, from, to);
      });
    },
    [update, target],
  );

  // 하이라이트 활성 대상 = 현재 대상에서 "마지막으로 펼친" 아코디언 하나(결정 5).
  // Radix Accordion(multiple)은 새로 펼친 값을 배열 끝에 추가하므로 마지막 원소가 최근 항목입니다.
  const activeValue = expandedItems.length > 0 ? expandedItems[expandedItems.length - 1] : null;
  const activePreview: ActivePreview | null = (() => {
    if (!activeValue) {
      return null;
    }
    if (!isCommon) {
      const section = sections.find((item) => item.id === activeValue);
      if (!section) {
        return null;
      }
      return { id: `section:${section.id}`, label: SECTION_TYPE_LABELS[section.type] ?? section.type };
    }
    const entry = COMMON_ENTRIES.find((item) => item.value === activeValue);
    if (!entry) {
      return null;
    }
    if (activeValue === "navigation") {
      return { id: "global:navigation", label: entry.label };
    }
    if (activeValue === "footer") {
      return { id: "global:footer", label: entry.label };
    }
    return null;
  })();

  const activeId = activePreview?.id ?? null;
  const activeLabel = activePreview?.label ?? null;

  const postActiveTarget = useCallback((payload: ActivePreview | null) => {
    const frame = iframeRef.current;
    if (!frame?.contentWindow || typeof window === "undefined") {
      return;
    }
    frame.contentWindow.postMessage(
      {
        source: MESSAGE_SOURCE,
        type: "active-target",
        target: payload?.id ?? null,
        label: payload?.label ?? null,
      },
      window.location.origin,
    );
  }, []);

  // 최신 활성 대상을 ref로 보관해, preview-ready 수신 시점의 값을 정확히 전송합니다.
  const activePreviewRef = useRef<ActivePreview | null>(null);
  useEffect(() => {
    activePreviewRef.current = activeId ? { id: activeId, label: activeLabel ?? "" } : null;
  }, [activeId, activeLabel]);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) {
        return;
      }
      const data = event.data;
      if (!data || data.source !== MESSAGE_SOURCE || data.type !== "preview-ready") {
        return;
      }
      previewReadyRef.current = true;
      postActiveTarget(activePreviewRef.current);
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [postActiveTarget]);

  useEffect(() => {
    if (previewReadyRef.current) {
      postActiveTarget(activeId ? { id: activeId, label: activeLabel ?? "" } : null);
    }
  }, [activeId, activeLabel, postActiveTarget]);

  // 안전장치: 편집 대상이 바뀌었는데 iframe이 미리보기 라우트를 벗어나 있으면(예: 사용자가
  // 미리보기에서 외부/미매칭 경로로 이동한 경우) 미리보기 라우트로 되돌려 동기화를 회복합니다.
  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) {
      return;
    }
    try {
      const win = frame.contentWindow;
      if (
        win &&
        win.location.protocol.startsWith("http") &&
        new URL(win.location.href).pathname !== PREVIEW_URL
      ) {
        win.location.replace(PREVIEW_URL);
      }
    } catch {
      frame.src = PREVIEW_URL;
    }
  }, [target]);

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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <RotateCcw className="h-4 w-4" />
                  초기화
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>편집 내용을 초기화할까요?</AlertDialogTitle>
                  <AlertDialogDescription>
                    현재 브라우저에 저장된 모든 편집 내용을 기본 JSON 상태로 되돌립니다. 이 작업은 되돌릴 수 없습니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleReset}
                    className="bg-red-500 text-white hover:bg-red-500/90"
                  >
                    초기화
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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

        <div
          ref={splitRef}
          className="flex flex-col gap-6 lg:flex-row lg:items-stretch"
          style={{ "--panel-w": `${panelWidth}px` } as React.CSSProperties}
        >
          <section className="w-full shrink-0 rounded-xl border border-border bg-card p-5 shadow-sm lg:w-(--panel-w)">
            <div className="space-y-1.5">
              <Label htmlFor="admin-target-select">편집 대상</Label>
              <Select value={target} onValueChange={handleTargetChange}>
                <SelectTrigger id="admin-target-select" aria-label="편집 대상 선택">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {targets.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button type="button" variant="outline" size="sm" onClick={handleAddPage}>
                  <Plus className="h-4 w-4" />
                  페이지 추가
                </Button>
                {!isCommon && target !== HOME_PAGE_ID ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDeletePage}
                    className="text-red-500 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                    페이지 삭제
                  </Button>
                ) : null}
              </div>
              {!isCommon ? (
                <p className="text-[11px] text-muted-foreground">
                  각 섹션 헤더에서 순서 이동, 노출 토글, 삭제를 할 수 있습니다.
                </p>
              ) : null}
            </div>

            {!isCommon && currentPage && target !== HOME_PAGE_ID ? (
              <div className="mt-4 space-y-3 rounded-lg border border-border bg-muted/40 p-3">
                <p className="text-xs font-bold text-muted-foreground">페이지 설정</p>
                <TextField
                  label="페이지 제목"
                  value={currentPage.title}
                  onChange={(value) =>
                    update((draft) => {
                      const page = getPage(draft, target);
                      if (page) page.title = value;
                    })
                  }
                />
                <TextField
                  label="경로(slug)"
                  value={currentPage.slug}
                  hint="공개 라우트와 별개인 참고용 경로입니다."
                  onChange={(value) =>
                    update((draft) => {
                      const page = getPage(draft, target);
                      if (page) page.slug = value;
                    })
                  }
                />
              </div>
            ) : null}

            <div className="mt-5 max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
              {!isCommon ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                  onDragEnd={handleSectionDragEnd}
                >
                  <SortableContext
                    items={sections.map((section) => section.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <Accordion
                      type="multiple"
                      value={expandedItems}
                      onValueChange={handleExpandedChange}
                      className="flex flex-col gap-2 animate-fade-in"
                    >
                      {sections.map((section) => (
                        <SortableSectionItem
                          key={section.id}
                          section={section}
                          pageId={target}
                          content={content}
                          update={update}
                        />
                      ))}
                    </Accordion>
                  </SortableContext>
                </DndContext>
              ) : null}

              {!isCommon ? (
                <div className="mt-3">
                  <Select
                    key={sectionAddKey}
                    onValueChange={(value) => handleAddSection(value as HomeSection["type"])}
                  >
                    <SelectTrigger aria-label="섹션 추가">
                      <SelectValue placeholder="+ 섹션 추가" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTION_ADD_OPTIONS.map((option) => (
                        <SelectItem key={option.type} value={option.type}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : null}

              {isCommon ? (
                <Accordion
                  key="common"
                  type="multiple"
                  value={expandedItems}
                  onValueChange={handleExpandedChange}
                  className="flex flex-col gap-2 animate-fade-in"
                >
                  {COMMON_ENTRIES.map((entry) => {
                    const Panel = entry.Panel;
                    return (
                      <AccordionItem key={entry.value} value={entry.value}>
                        <AccordionTrigger>{entry.label}</AccordionTrigger>
                        <AccordionContent>
                          <Panel content={content} update={update} />
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              ) : null}
            </div>
          </section>

          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="편집 패널 너비 조절 (더블클릭 시 기본값)"
            onPointerDown={handleSplitPointerDown}
            onDoubleClick={handleSplitReset}
            className="group hidden shrink-0 cursor-col-resize items-center justify-center lg:flex"
          >
            <div className="h-16 w-1.5 rounded-full bg-border transition-colors group-hover:bg-primary/50" />
          </div>

          <section className="min-w-0 flex-1 rounded-xl border border-border bg-card p-5 shadow-sm">
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
                  ref={iframeRef}
                  title="공개 페이지 미리보기"
                  src={PREVIEW_URL}
                  onLoad={() => postActiveTarget(activePreviewRef.current)}
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

type SortableSectionItemProps = {
  section: HomeSection;
  pageId: string;
  content: SiteContent;
  update: UpdateContent;
};

function SortableSectionItem({ section, pageId, content, update }: SortableSectionItemProps) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Panel: SectionPanel = SECTION_EDITORS[section.type] ?? SectionMissingPanel;
  const label = SECTION_TYPE_LABELS[section.type] ?? section.type;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "relative z-10 opacity-70")}
    >
      <AccordionItem value={section.id}>
        <AccordionTrigger
          actions={
            <>
              <HeaderAction
                label={section.enabled ? "숨기기" : "노출하기"}
                onClick={() =>
                  update((draft) => {
                    const target = getPage(draft, pageId)?.sections.find(
                      (item) => item.id === section.id,
                    );
                    if (target) {
                      target.enabled = !target.enabled;
                    }
                  })
                }
              >
                {section.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </HeaderAction>
              <HeaderAction
                label="삭제"
                variant="danger"
                onClick={() =>
                  update((draft) => {
                    const page = getPage(draft, pageId);
                    if (!page) {
                      return;
                    }
                    const index = page.sections.findIndex((item) => item.id === section.id);
                    if (index !== -1) {
                      page.sections.splice(index, 1);
                    }
                  })
                }
              >
                <Trash2 className="h-4 w-4" />
              </HeaderAction>
              <DragHandle ref={setActivatorNodeRef} {...attributes} {...listeners} />
            </>
          }
        >
          <span className={section.enabled ? undefined : "text-muted-foreground/60"}>
            {label}
            {section.enabled ? null : <span className="ml-2 text-[11px] font-medium">숨김</span>}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Panel content={content} update={update} section={section} pageId={pageId} />
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}

type HeaderActionProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "danger";
  children: ReactNode;
};

function HeaderAction({ label, onClick, disabled, variant = "default", children }: HeaderActionProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-30",
        variant === "danger" && "hover:bg-red-50 hover:text-red-500",
      )}
    >
      {children}
    </button>
  );
}

function SectionMissingPanel() {
  return (
    <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
      이 섹션 타입에 대한 편집 폼이 없습니다.
    </p>
  );
}
