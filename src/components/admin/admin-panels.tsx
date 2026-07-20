"use client";

import {
  closestCorners,
  DndContext,
  DragOverlay,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

import { getHomeSections } from "@/lib/content/helpers";
import { cn } from "@/lib/utils";
import type { FooterContent, IdentifiedLink, SiteContent } from "@/lib/content/types";

import {
  AddButton,
  TextAreaField,
  TextField,
  ToggleField,
  type UpdateContent,
} from "./admin-fields";
import {
  arrayMove,
  DragHandle,
  RemoveButton,
  SortableList,
  SortableRow,
  usePointerSortSensors,
} from "./sortable";

type PanelProps = {
  content: SiteContent;
  update: UpdateContent;
};

export const SECTION_TYPE_LABELS: Record<string, string> = {
  hero: "Hero",
  news: "News",
  subscribe: "Subscribe",
  productTabs: "Product Tabs",
  stats: "Stats",
  awards: "Awards",
};

function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export function NavigationPanel({ content, update }: PanelProps) {
  const { navigation } = content;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-bold">로고</h3>
        <TextField
          label="로고 라벨(대체 텍스트)"
          value={navigation.logo.label}
          onChange={(value) =>
            update((draft) => {
              draft.navigation.logo.label = value;
            })
          }
        />
        <TextField
          label="로고 링크"
          value={navigation.logo.href}
          onChange={(value) =>
            update((draft) => {
              draft.navigation.logo.href = value;
            })
          }
        />
        <TextField
          label="로고 이미지 경로"
          value={navigation.logo.image}
          onChange={(value) =>
            update((draft) => {
              draft.navigation.logo.image = value;
            })
          }
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold">상단 메뉴</h3>
          <ToggleField
            label="검색 노출"
            checked={navigation.search.enabled}
            onChange={(checked) =>
              update((draft) => {
                draft.navigation.search.enabled = checked;
              })
            }
          />
        </div>

        <SortableList
          ids={navigation.items.map((item) => item.id)}
          onReorder={(from, to) =>
            update((draft) => {
              draft.navigation.items = arrayMove(draft.navigation.items, from, to);
            })
          }
        >
          {navigation.items.map((item, index) => (
            <SortableRow
              key={item.id}
              id={item.id}
              title={`메뉴 ${index + 1}`}
              onRemove={() =>
                update((draft) => {
                  draft.navigation.items.splice(index, 1);
                })
              }
            >
              <TextField
                label="라벨"
                value={item.label}
                onChange={(value) =>
                  update((draft) => {
                    draft.navigation.items[index].label = value;
                  })
                }
              />
              <TextField
                label="링크"
                value={item.href}
                onChange={(value) =>
                  update((draft) => {
                    draft.navigation.items[index].href = value;
                  })
                }
              />
            </SortableRow>
          ))}
        </SortableList>

        <AddButton
          label="메뉴 추가"
          onClick={() =>
            update((draft) => {
              draft.navigation.items.push({ id: uid("nav"), label: "새 메뉴", href: "/" });
            })
          }
        />
      </div>

      <TextField
        label="검색 placeholder"
        value={navigation.search.placeholder}
        onChange={(value) =>
          update((draft) => {
            draft.navigation.search.placeholder = value;
          })
        }
      />
    </div>
  );
}

export function HeroPanel({ content, update }: PanelProps) {
  const section = getHomeSections(content).find((item) => item.type === "hero");
  if (section?.type !== "hero") {
    return <EmptyPanel />;
  }

  return (
    <div className="space-y-4">
      <TextAreaField
        label="Eyebrow(상단 문구)"
        value={section.data.eyebrow}
        rows={2}
        onChange={(value) =>
          update((draft) => {
            const target = getHomeSections(draft).find((item) => item.type === "hero");
            if (target?.type === "hero") {
              target.data.eyebrow = value;
            }
          })
        }
      />
      <TextAreaField
        label="타이틀"
        value={section.data.title}
        rows={3}
        hint="줄바꿈(Enter)이 그대로 표시됩니다."
        onChange={(value) =>
          update((draft) => {
            const target = getHomeSections(draft).find((item) => item.type === "hero");
            if (target?.type === "hero") {
              target.data.title = value;
            }
          })
        }
      />
    </div>
  );
}

export function NewsPanel({ content, update }: PanelProps) {
  const section = getHomeSections(content).find((item) => item.type === "news");
  if (section?.type !== "news") {
    return <EmptyPanel />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-bold">더보기 링크</h3>
        <TextField
          label="라벨"
          value={section.data.moreLink.label}
          onChange={(value) =>
            update((draft) => {
              const target = getHomeSections(draft).find((item) => item.type === "news");
              if (target?.type === "news") {
                target.data.moreLink.label = value;
              }
            })
          }
        />
        <TextField
          label="링크"
          value={section.data.moreLink.href}
          onChange={(value) =>
            update((draft) => {
              const target = getHomeSections(draft).find((item) => item.type === "news");
              if (target?.type === "news") {
                target.data.moreLink.href = value;
              }
            })
          }
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold">뉴스 목록</h3>
        <SortableList
          ids={section.data.items.map((item) => item.id)}
          onReorder={(from, to) =>
            update((draft) => {
              const target = getHomeSections(draft).find((s) => s.type === "news");
              if (target?.type === "news") {
                target.data.items = arrayMove(target.data.items, from, to);
              }
            })
          }
        >
          {section.data.items.map((item, index) => (
            <SortableRow
              key={item.id}
              id={item.id}
              title={`뉴스 ${index + 1}`}
              onRemove={() =>
                update((draft) => {
                  const target = getHomeSections(draft).find((s) => s.type === "news");
                  if (target?.type === "news") target.data.items.splice(index, 1);
                })
              }
            >
              <TextAreaField
                label="제목"
                value={item.title}
                rows={2}
                onChange={(value) =>
                  update((draft) => {
                    const target = getHomeSections(draft).find((s) => s.type === "news");
                    if (target?.type === "news") target.data.items[index].title = value;
                  })
                }
              />
              <div className="grid grid-cols-2 gap-3">
                <TextField
                  label="날짜"
                  value={item.date}
                  onChange={(value) =>
                    update((draft) => {
                      const target = getHomeSections(draft).find((s) => s.type === "news");
                      if (target?.type === "news") target.data.items[index].date = value;
                    })
                  }
                />
                <TextField
                  label="배지(선택)"
                  value={item.badge}
                  placeholder="예: NEW"
                  onChange={(value) =>
                    update((draft) => {
                      const target = getHomeSections(draft).find((s) => s.type === "news");
                      if (target?.type === "news") target.data.items[index].badge = value;
                    })
                  }
                />
              </div>
              <TextField
                label="링크"
                value={item.href}
                onChange={(value) =>
                  update((draft) => {
                    const target = getHomeSections(draft).find((s) => s.type === "news");
                    if (target?.type === "news") target.data.items[index].href = value;
                  })
                }
              />
            </SortableRow>
          ))}
        </SortableList>

        <AddButton
          label="뉴스 추가"
          onClick={() =>
            update((draft) => {
              const target = getHomeSections(draft).find((s) => s.type === "news");
              if (target?.type === "news") {
                const id = uid("news");
                target.data.items.push({
                  id,
                  badge: "NEW",
                  title: "새 뉴스 제목",
                  date: new Date().toISOString().slice(0, 10),
                  href: `/resources/news/${id}`,
                });
              }
            })
          }
        />
      </div>
    </div>
  );
}

export function SubscribePanel({ content, update }: PanelProps) {
  const section = getHomeSections(content).find((item) => item.type === "subscribe");
  if (section?.type !== "subscribe") {
    return <EmptyPanel />;
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        요소 순서를 바꾸면 구독 영역의 텍스트/입력/버튼 배치 순서가 바뀝니다.
      </p>
      <SortableList
        ids={section.data.items.map((item) => item.id)}
        onReorder={(from, to) =>
          update((draft) => {
            const target = getHomeSections(draft).find((s) => s.type === "subscribe");
            if (target?.type === "subscribe") {
              target.data.items = arrayMove(target.data.items, from, to);
            }
          })
        }
      >
        {section.data.items.map((item, index) => (
          <SortableRow key={item.id} id={item.id} title={`${index + 1}. ${item.type}`}>
            {item.type === "text" ? (
              <TextAreaField
                label="텍스트"
                value={item.value}
                rows={2}
                onChange={(value) =>
                  update((draft) => {
                    const target = getHomeSections(draft).find((s) => s.type === "subscribe");
                    const field = target?.type === "subscribe" ? target.data.items[index] : undefined;
                    if (field?.type === "text") field.value = value;
                  })
                }
              />
            ) : null}
            {item.type === "input" ? (
              <div className="grid grid-cols-2 gap-3">
                <TextField
                  label="필드 이름(name)"
                  value={item.name}
                  onChange={(value) =>
                    update((draft) => {
                      const target = getHomeSections(draft).find((s) => s.type === "subscribe");
                      const field = target?.type === "subscribe" ? target.data.items[index] : undefined;
                      if (field?.type === "input") field.name = value;
                    })
                  }
                />
                <TextField
                  label="placeholder"
                  value={item.placeholder}
                  onChange={(value) =>
                    update((draft) => {
                      const target = getHomeSections(draft).find((s) => s.type === "subscribe");
                      const field = target?.type === "subscribe" ? target.data.items[index] : undefined;
                      if (field?.type === "input") field.placeholder = value;
                    })
                  }
                />
              </div>
            ) : null}
            {item.type === "button" ? (
              <div className="grid grid-cols-2 gap-3">
                <TextField
                  label="버튼 텍스트"
                  value={item.label}
                  onChange={(value) =>
                    update((draft) => {
                      const target = getHomeSections(draft).find((s) => s.type === "subscribe");
                      const field = target?.type === "subscribe" ? target.data.items[index] : undefined;
                      if (field?.type === "button") field.label = value;
                    })
                  }
                />
                <TextField
                  label="버튼 링크"
                  value={item.href}
                  onChange={(value) =>
                    update((draft) => {
                      const target = getHomeSections(draft).find((s) => s.type === "subscribe");
                      const field = target?.type === "subscribe" ? target.data.items[index] : undefined;
                      if (field?.type === "button") field.href = value;
                    })
                  }
                />
              </div>
            ) : null}
          </SortableRow>
        ))}
      </SortableList>
    </div>
  );
}

export function ProductTabsPanel({ content, update }: PanelProps) {
  const section = getHomeSections(content).find((item) => item.type === "productTabs");
  if (section?.type !== "productTabs") {
    return <EmptyPanel />;
  }

  return (
    <div className="space-y-6">
      <TextAreaField
        label="섹션 헤드라인"
        value={section.data.headline}
        rows={2}
        onChange={(value) =>
          update((draft) => {
            const target = getHomeSections(draft).find((item) => item.type === "productTabs");
            if (target?.type === "productTabs") target.data.headline = value;
          })
        }
      />

      <SortableList
        ids={section.data.tabs.map((tab) => tab.id)}
        onReorder={(from, to) =>
          update((draft) => {
            const target = getHomeSections(draft).find((s) => s.type === "productTabs");
            if (target?.type === "productTabs") {
              target.data.tabs = arrayMove(target.data.tabs, from, to);
            }
          })
        }
      >
        {section.data.tabs.map((tab, index) => (
          <SortableRow key={tab.id} id={tab.id} title={`${index + 1}. ${tab.productName}`}>
            <div className="grid grid-cols-2 gap-3">
              <TextField
                label="탭 라벨"
                value={tab.label}
                onChange={(value) =>
                  update((draft) => {
                    const target = getHomeSections(draft).find((s) => s.type === "productTabs");
                    if (target?.type === "productTabs") target.data.tabs[index].label = value;
                  })
                }
              />
              <TextField
                label="카테고리"
                value={tab.category}
                onChange={(value) =>
                  update((draft) => {
                    const target = getHomeSections(draft).find((s) => s.type === "productTabs");
                    if (target?.type === "productTabs") target.data.tabs[index].category = value;
                  })
                }
              />
            </div>
            <TextField
              label="제품명"
              value={tab.productName}
              onChange={(value) =>
                update((draft) => {
                  const target = getHomeSections(draft).find((s) => s.type === "productTabs");
                  if (target?.type === "productTabs") target.data.tabs[index].productName = value;
                })
              }
            />
            <TextAreaField
              label="설명"
              value={tab.description}
              rows={3}
              hint="줄바꿈(Enter)이 그대로 표시됩니다."
              onChange={(value) =>
                update((draft) => {
                  const target = getHomeSections(draft).find((s) => s.type === "productTabs");
                  if (target?.type === "productTabs") target.data.tabs[index].description = value;
                })
              }
            />
            <div className="grid grid-cols-2 gap-3">
              <TextField
                label="버튼 텍스트"
                value={tab.button.label}
                onChange={(value) =>
                  update((draft) => {
                    const target = getHomeSections(draft).find((s) => s.type === "productTabs");
                    if (target?.type === "productTabs") target.data.tabs[index].button.label = value;
                  })
                }
              />
              <TextField
                label="버튼 링크"
                value={tab.button.href}
                onChange={(value) =>
                  update((draft) => {
                    const target = getHomeSections(draft).find((s) => s.type === "productTabs");
                    if (target?.type === "productTabs") target.data.tabs[index].button.href = value;
                  })
                }
              />
            </div>
            <TextField
              label="로고 경로"
              value={tab.logo}
              onChange={(value) =>
                update((draft) => {
                  const target = getHomeSections(draft).find((s) => s.type === "productTabs");
                  if (target?.type === "productTabs") target.data.tabs[index].logo = value;
                })
              }
            />
            <TextField
              label="비주얼 에셋 경로"
              value={tab.visual.value}
              onChange={(value) =>
                update((draft) => {
                  const target = getHomeSections(draft).find((s) => s.type === "productTabs");
                  if (target?.type === "productTabs") target.data.tabs[index].visual.value = value;
                })
              }
            />
          </SortableRow>
        ))}
      </SortableList>
    </div>
  );
}

export function StatsPanel({ content, update }: PanelProps) {
  const section = getHomeSections(content).find((item) => item.type === "stats");
  if (section?.type !== "stats") {
    return <EmptyPanel />;
  }

  return (
    <div className="space-y-4">
      <SortableList
        ids={section.data.items.map((item) => item.id)}
        onReorder={(from, to) =>
          update((draft) => {
            const target = getHomeSections(draft).find((s) => s.type === "stats");
            if (target?.type === "stats") {
              target.data.items = arrayMove(target.data.items, from, to);
            }
          })
        }
      >
        {section.data.items.map((item, index) => (
          <SortableRow
            key={item.id}
            id={item.id}
            title={`통계 ${index + 1}`}
            onRemove={() =>
              update((draft) => {
                const target = getHomeSections(draft).find((s) => s.type === "stats");
                if (target?.type === "stats") target.data.items.splice(index, 1);
              })
            }
          >
            <div className="grid grid-cols-2 gap-3">
              <TextField
                label="라벨"
                value={item.label}
                onChange={(value) =>
                  update((draft) => {
                    const target = getHomeSections(draft).find((s) => s.type === "stats");
                    if (target?.type === "stats") target.data.items[index].label = value;
                  })
                }
              />
              <TextField
                label="값"
                value={item.value}
                onChange={(value) =>
                  update((draft) => {
                    const target = getHomeSections(draft).find((s) => s.type === "stats");
                    if (target?.type === "stats") target.data.items[index].value = value;
                  })
                }
              />
            </div>
          </SortableRow>
        ))}
      </SortableList>

      <AddButton
        label="통계 추가"
        onClick={() =>
          update((draft) => {
            const target = getHomeSections(draft).find((s) => s.type === "stats");
            if (target?.type === "stats") {
              target.data.items.push({ id: uid("stat"), label: "새 라벨", value: "0" });
            }
          })
        }
      />
    </div>
  );
}

export function AwardsPanel({ content, update }: PanelProps) {
  const section = getHomeSections(content).find((item) => item.type === "awards");
  if (section?.type !== "awards") {
    return <EmptyPanel />;
  }

  return (
    <div className="space-y-4">
      <SortableList
        ids={section.data.items.map((item) => item.id)}
        onReorder={(from, to) =>
          update((draft) => {
            const target = getHomeSections(draft).find((s) => s.type === "awards");
            if (target?.type === "awards") {
              target.data.items = arrayMove(target.data.items, from, to);
            }
          })
        }
      >
        {section.data.items.map((item, index) => (
          <SortableRow
            key={item.id}
            id={item.id}
            title={`수상 ${index + 1}`}
            onRemove={() =>
              update((draft) => {
                const target = getHomeSections(draft).find((s) => s.type === "awards");
                if (target?.type === "awards") target.data.items.splice(index, 1);
              })
            }
          >
            <TextAreaField
              label="제목"
              value={item.title}
              rows={2}
              onChange={(value) =>
                update((draft) => {
                  const target = getHomeSections(draft).find((s) => s.type === "awards");
                  if (target?.type === "awards") target.data.items[index].title = value;
                })
              }
            />
            <TextAreaField
              label="설명"
              value={item.description}
              rows={3}
              onChange={(value) =>
                update((draft) => {
                  const target = getHomeSections(draft).find((s) => s.type === "awards");
                  if (target?.type === "awards") target.data.items[index].description = value;
                })
              }
            />
            <TextField
              label="로고 경로"
              value={item.logo}
              onChange={(value) =>
                update((draft) => {
                  const target = getHomeSections(draft).find((s) => s.type === "awards");
                  if (target?.type === "awards") target.data.items[index].logo = value;
                })
              }
            />
          </SortableRow>
        ))}
      </SortableList>

      <AddButton
        label="수상 항목 추가"
        onClick={() =>
          update((draft) => {
            const target = getHomeSections(draft).find((s) => s.type === "awards");
            if (target?.type === "awards") {
              target.data.items.push({
                id: uid("award"),
                logo: "/assets/awards/placeholder.svg",
                title: "새 수상 기관",
                description: "수상 내용을 입력하세요.",
              });
            }
          })
        }
      />
    </div>
  );
}

export function FooterPanel({ content, update }: PanelProps) {
  const { footer } = content;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-bold">메뉴 그룹</h3>
        <p className="text-[11px] text-muted-foreground">
          그룹과 링크의 핸들(::)을 드래그해 순서를 바꿀 수 있고, 링크는 다른 그룹으로도 옮길 수 있습니다.
        </p>
        <FooterMenuEditor content={content} update={update} />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold">법무 / 회사 정보</h3>
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label="개인정보 라벨"
            value={footer.legal.privacy.label}
            onChange={(value) =>
              update((draft) => {
                draft.footer.legal.privacy.label = value;
              })
            }
          />
          <TextField
            label="개인정보 링크"
            value={footer.legal.privacy.href}
            onChange={(value) =>
              update((draft) => {
                draft.footer.legal.privacy.href = value;
              })
            }
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-muted-foreground">우측 링크</h4>
          <SortableList
            ids={footer.legal.utilityLinks.map((item) => item.id)}
            onReorder={(from, to) =>
              update((draft) => {
                draft.footer.legal.utilityLinks = arrayMove(
                  draft.footer.legal.utilityLinks,
                  from,
                  to,
                );
              })
            }
          >
            {footer.legal.utilityLinks.map((item, index) => (
              <SortableRow
                key={item.id}
                id={item.id}
                title={`링크 ${index + 1}`}
                onRemove={() =>
                  update((draft) => {
                    draft.footer.legal.utilityLinks.splice(index, 1);
                  })
                }
              >
                <TextField
                  label="라벨"
                  value={item.label}
                  onChange={(value) =>
                    update((draft) => {
                      draft.footer.legal.utilityLinks[index].label = value;
                    })
                  }
                />
                <TextField
                  label="링크"
                  value={item.href}
                  onChange={(value) =>
                    update((draft) => {
                      draft.footer.legal.utilityLinks[index].href = value;
                    })
                  }
                />
              </SortableRow>
            ))}
          </SortableList>
          <AddButton
            label="우측 링크 추가"
            onClick={() =>
              update((draft) => {
                draft.footer.legal.utilityLinks.push({ id: uid("ul"), label: "새 링크", href: "/" });
              })
            }
          />
        </div>

        <TextAreaField
          label="회사 정보"
          value={footer.legal.companyInfo}
          rows={2}
          hint="줄바꿈(Enter)이 그대로 표시됩니다."
          onChange={(value) =>
            update((draft) => {
              draft.footer.legal.companyInfo = value;
            })
          }
        />
        <TextField
          label="저작권 문구"
          value={footer.legal.copyright}
          onChange={(value) =>
            update((draft) => {
              draft.footer.legal.copyright = value;
            })
          }
        />
      </div>
    </div>
  );
}

function FooterMenuEditor({ content, update }: PanelProps) {
  const groups = content.footer.groups;
  const sensors = usePointerSortSensors();
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const id = String(event.active.id);
    if (id.startsWith("group:")) {
      const group = groups.find((g) => `group:${g.id}` === id);
      setActiveLabel(group ? `그룹: ${group.title}` : null);
      return;
    }
    if (id.startsWith("link:")) {
      const linkId = id.slice("link:".length);
      for (const group of groups) {
        const link = group.items.find((l) => l.id === linkId);
        if (link) {
          setActiveLabel(link.label);
          return;
        }
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveLabel(null);
    const { active, over } = event;
    if (!over) {
      return;
    }
    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) {
      return;
    }

    update((draft) => {
      const gs = draft.footer.groups;

      if (activeId.startsWith("group:")) {
        if (!overId.startsWith("group:")) {
          return;
        }
        const from = gs.findIndex((g) => `group:${g.id}` === activeId);
        const to = gs.findIndex((g) => `group:${g.id}` === overId);
        if (from === -1 || to === -1) {
          return;
        }
        draft.footer.groups = arrayMove(gs, from, to);
        return;
      }

      if (activeId.startsWith("link:")) {
        const linkId = activeId.slice("link:".length);
        let srcGroup = -1;
        let srcIndex = -1;
        gs.forEach((group, groupIndex) => {
          const linkIndex = group.items.findIndex((l) => l.id === linkId);
          if (linkIndex !== -1) {
            srcGroup = groupIndex;
            srcIndex = linkIndex;
          }
        });
        if (srcGroup === -1) {
          return;
        }

        let tgtGroup = -1;
        let tgtIndex = -1;
        if (overId.startsWith("link:")) {
          const overLinkId = overId.slice("link:".length);
          gs.forEach((group, groupIndex) => {
            const linkIndex = group.items.findIndex((l) => l.id === overLinkId);
            if (linkIndex !== -1) {
              tgtGroup = groupIndex;
              tgtIndex = linkIndex;
            }
          });
        } else if (overId.startsWith("zone:")) {
          const groupId = overId.slice("zone:".length);
          tgtGroup = gs.findIndex((g) => g.id === groupId);
          tgtIndex = tgtGroup !== -1 ? gs[tgtGroup].items.length : -1;
        } else if (overId.startsWith("group:")) {
          const groupId = overId.slice("group:".length);
          tgtGroup = gs.findIndex((g) => g.id === groupId);
          tgtIndex = tgtGroup !== -1 ? gs[tgtGroup].items.length : -1;
        }
        if (tgtGroup === -1) {
          return;
        }

        const [moved] = gs[srcGroup].items.splice(srcIndex, 1);
        let insertAt = tgtIndex;
        if (srcGroup === tgtGroup && srcIndex < tgtIndex) {
          insertAt -= 1;
        }
        if (insertAt < 0) {
          insertAt = 0;
        }
        gs[tgtGroup].items.splice(insertAt, 0, moved);
      }
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveLabel(null)}
    >
      <SortableContext
        items={groups.map((group) => `group:${group.id}`)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {groups.map((group, groupIndex) => (
            <FooterGroupRow key={group.id} group={group} groupIndex={groupIndex} update={update} />
          ))}
        </div>
      </SortableContext>

      <div className="mt-3">
        <AddButton
          label="메뉴 그룹 추가"
          onClick={() =>
            update((draft) => {
              draft.footer.groups.push({
                id: uid("fg"),
                title: "새 그룹",
                items: [{ id: uid("fl"), label: "새 링크", href: "/" }],
              });
            })
          }
        />
      </div>

      <DragOverlay>
        {activeLabel ? (
          <div className="rounded-lg border border-border bg-white px-3 py-2 text-xs font-bold shadow-lg">
            {activeLabel}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

type FooterGroupRowProps = {
  group: FooterContent["groups"][number];
  groupIndex: number;
  update: UpdateContent;
};

function FooterGroupRow({ group, groupIndex, update }: FooterGroupRowProps) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: `group:${group.id}`, data: { type: "group" } });
  const { setNodeRef: setZoneRef } = useDroppable({ id: `zone:${group.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "space-y-3 rounded-xl border border-border bg-background p-4",
        isDragging && "relative z-10 opacity-70 shadow-lg",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold text-muted-foreground">그룹 {groupIndex + 1}</p>
        <div className="flex items-center gap-1">
          <RemoveButton
            onClick={() =>
              update((draft) => {
                draft.footer.groups.splice(groupIndex, 1);
              })
            }
          />
          <DragHandle ref={setActivatorNodeRef} {...attributes} {...listeners} />
        </div>
      </div>
      <TextField
        label="그룹 제목"
        value={group.title}
        onChange={(value) =>
          update((draft) => {
            draft.footer.groups[groupIndex].title = value;
          })
        }
      />
      <div ref={setZoneRef} className="space-y-2 border-l-2 border-muted pl-3">
        <SortableContext
          items={group.items.map((item) => `link:${item.id}`)}
          strategy={verticalListSortingStrategy}
        >
          {group.items.map((item, itemIndex) => (
            <FooterLinkRow
              key={item.id}
              item={item}
              groupIndex={groupIndex}
              itemIndex={itemIndex}
              update={update}
            />
          ))}
        </SortableContext>
        <AddButton
          label="링크 추가"
          onClick={() =>
            update((draft) => {
              draft.footer.groups[groupIndex].items.push({ id: uid("fl"), label: "새 링크", href: "/" });
            })
          }
        />
      </div>
    </div>
  );
}

type FooterLinkRowProps = {
  item: IdentifiedLink;
  groupIndex: number;
  itemIndex: number;
  update: UpdateContent;
};

function FooterLinkRow({ item, groupIndex, itemIndex, update }: FooterLinkRowProps) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: `link:${item.id}`, data: { type: "link" } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "space-y-2 rounded-lg border border-border bg-white p-3",
        isDragging && "relative z-10 opacity-70 shadow-lg",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-bold text-muted-foreground">링크 {itemIndex + 1}</p>
        <div className="flex items-center gap-1">
          <RemoveButton
            onClick={() =>
              update((draft) => {
                draft.footer.groups[groupIndex].items.splice(itemIndex, 1);
              })
            }
          />
          <DragHandle ref={setActivatorNodeRef} {...attributes} {...listeners} />
        </div>
      </div>
      <TextField
        label="라벨"
        value={item.label}
        onChange={(value) =>
          update((draft) => {
            draft.footer.groups[groupIndex].items[itemIndex].label = value;
          })
        }
      />
      <TextField
        label="링크"
        value={item.href}
        onChange={(value) =>
          update((draft) => {
            draft.footer.groups[groupIndex].items[itemIndex].href = value;
          })
        }
      />
    </div>
  );
}

function EmptyPanel() {
  return (
    <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
      이 섹션이 현재 콘텐츠에 없습니다.
    </p>
  );
}
