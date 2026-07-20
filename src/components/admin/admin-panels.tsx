"use client";

import { Label } from "@/components/ui/label";
import { getHomeSections, getPage } from "@/lib/content/helpers";
import type {
  BenefitsSection,
  FaqSection,
  HomeSection,
  LineupCardsSection,
  LineupDetailSection,
  PageHeaderSection,
  PlaceholderSection,
  ProductHeroSection,
  SiteContent,
  StatementSection,
} from "@/lib/content/types";

import {
  AddButton,
  TextAreaField,
  TextField,
  ToggleField,
  type UpdateContent,
} from "./admin-fields";
import { DrillInEditor, type DrillChildGroup } from "./drill-in";
import { arrayMove, SortableList, SortableRow } from "./sortable";

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
  productHero: "제품 히어로",
  statement: "서술 문단",
  benefits: "선택 이유 카드",
  lineupCards: "라인업 카드",
  placeholder: "플레이스홀더",
  faq: "FAQ",
  pageHeader: "페이지 헤더",
  lineupDetail: "라인업 상세",
};

// 페이지 섹션 편집 패널 공통 props. 특정 페이지의 특정 섹션(id)을 편집합니다.
export type SectionEditorProps = {
  content: SiteContent;
  update: UpdateContent;
  section: HomeSection;
  pageId: string;
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
  const groups = footer.groups;

  const root: DrillChildGroup = {
    label: "그룹",
    addLabel: "메뉴 그룹 추가",
    items: groups.map((group, gi) => ({
      id: group.id,
      title: group.title || `그룹 ${gi + 1}`,
      fields: (
        <TextField
          label="그룹 제목"
          value={group.title}
          onChange={(v) => update((d) => { d.footer.groups[gi].title = v; })}
        />
      ),
      childGroup: {
        label: "링크",
        addLabel: "링크 추가",
        items: group.items.map((link, ii) => ({
          id: link.id,
          title: link.label || `링크 ${ii + 1}`,
          fields: (
            <>
              <TextField
                label="라벨"
                value={link.label}
                onChange={(v) => update((d) => { d.footer.groups[gi].items[ii].label = v; })}
              />
              <TextField
                label="링크"
                value={link.href}
                onChange={(v) => update((d) => { d.footer.groups[gi].items[ii].href = v; })}
              />
              {groups.length > 1 ? (
                <div className="space-y-1.5">
                  <Label>그룹 이동</Label>
                  <select
                    value={group.id}
                    onChange={(event) => {
                      const targetId = event.target.value;
                      if (targetId === group.id) return;
                      update((d) => {
                        const [moved] = d.footer.groups[gi].items.splice(ii, 1);
                        const tgt = d.footer.groups.find((g) => g.id === targetId);
                        if (tgt && moved) tgt.items.push(moved);
                      });
                    }}
                    className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm"
                  >
                    {groups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.title}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
            </>
          ),
        })),
        onReorder: (from, to) =>
          update((d) => { d.footer.groups[gi].items = arrayMove(d.footer.groups[gi].items, from, to); }),
        onAdd: () =>
          update((d) => { d.footer.groups[gi].items.push({ id: uid("fl"), label: "새 링크", href: "/" }); }),
        onRemove: (idx) => update((d) => { d.footer.groups[gi].items.splice(idx, 1); }),
      },
    })),
    onReorder: (from, to) => update((d) => { d.footer.groups = arrayMove(d.footer.groups, from, to); }),
    onAdd: () =>
      update((d) => {
        d.footer.groups.push({
          id: uid("fg"),
          title: "새 그룹",
          items: [{ id: uid("fl"), label: "새 링크", href: "/" }],
        });
      }),
    onRemove: (idx) => update((d) => { d.footer.groups.splice(idx, 1); }),
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-bold">메뉴 그룹</h3>
        <DrillInEditor
          root={root}
          rootTitle="그룹"
          hint="그룹을 열어 링크를 편집합니다. 링크의 '그룹 이동'으로 다른 그룹으로 옮길 수 있습니다."
        />
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

function EmptyPanel() {
  return (
    <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
      이 섹션이 현재 콘텐츠에 없습니다.
    </p>
  );
}

// ── 서브 페이지 섹션 편집 패널 ─────────────────────────────────────────
// 특정 페이지(pageId)의 특정 섹션(section.id)을 직접 편집합니다.
// (홈 패널과 달리 타입 find가 아니라 id로 대상 섹션을 찾으므로 중복 타입도 안전)

export function ProductHeroPanel({ section, pageId, update }: SectionEditorProps) {
  if (section.type !== "productHero") return <EmptyPanel />;
  const data = section.data;
  const set = (mutator: (d: ProductHeroSection["data"]) => void) =>
    update((draft) => {
      const s = getPage(draft, pageId)?.sections.find((x) => x.id === section.id);
      if (s?.type === "productHero") mutator(s.data);
    });

  return (
    <div className="space-y-4">
      <TextField label="타이틀" value={data.title} onChange={(v) => set((d) => { d.title = v; })} />
      <TextField label="부제" value={data.subtitle} onChange={(v) => set((d) => { d.subtitle = v; })} />
      <TextAreaField
        label="설명"
        value={data.description}
        rows={3}
        hint="줄바꿈(Enter)이 그대로 표시됩니다."
        onChange={(v) => set((d) => { d.description = v; })}
      />
      <div className="grid grid-cols-2 gap-3">
        <TextField label="기본 버튼 라벨" value={data.primaryCta.label} onChange={(v) => set((d) => { d.primaryCta.label = v; })} />
        <TextField label="기본 버튼 링크" value={data.primaryCta.href} onChange={(v) => set((d) => { d.primaryCta.href = v; })} />
        <TextField label="보조 버튼 라벨" value={data.secondaryCta.label} onChange={(v) => set((d) => { d.secondaryCta.label = v; })} />
        <TextField label="보조 버튼 링크" value={data.secondaryCta.href} onChange={(v) => set((d) => { d.secondaryCta.href = v; })} />
      </div>
      <TextField
        label="제품 이미지 경로"
        value={data.image ?? ""}
        placeholder="/assets/products/damo-visual.svg"
        onChange={(v) => set((d) => { d.image = v.trim() ? v : null; })}
      />
      <TextField label="이미지 대체 텍스트" value={data.imageAlt} onChange={(v) => set((d) => { d.imageAlt = v; })} />
    </div>
  );
}

export function StatementPanel({ section, pageId, update }: SectionEditorProps) {
  if (section.type !== "statement") return <EmptyPanel />;
  const data = section.data;
  const set = (mutator: (d: StatementSection["data"]) => void) =>
    update((draft) => {
      const s = getPage(draft, pageId)?.sections.find((x) => x.id === section.id);
      if (s?.type === "statement") mutator(s.data);
    });

  return (
    <div className="space-y-4">
      <TextAreaField
        label="제목"
        value={data.title}
        rows={2}
        hint="줄바꿈(Enter)이 그대로 표시됩니다."
        onChange={(v) => set((d) => { d.title = v; })}
      />
      <TextAreaField
        label="본문"
        value={data.body}
        rows={4}
        hint="줄바꿈(Enter)이 그대로 표시됩니다."
        onChange={(v) => set((d) => { d.body = v; })}
      />
    </div>
  );
}

export function BenefitsPanel({ section, pageId, update }: SectionEditorProps) {
  if (section.type !== "benefits") return <EmptyPanel />;
  const data = section.data;
  const set = (mutator: (d: BenefitsSection["data"]) => void) =>
    update((draft) => {
      const s = getPage(draft, pageId)?.sections.find((x) => x.id === section.id);
      if (s?.type === "benefits") mutator(s.data);
    });

  return (
    <div className="space-y-5">
      <TextField label="제목" value={data.title} onChange={(v) => set((d) => { d.title = v; })} />
      <div className="space-y-3">
        <h3 className="text-sm font-bold">카드 목록</h3>
        <SortableList
          ids={data.items.map((item) => item.id)}
          onReorder={(from, to) => set((d) => { d.items = arrayMove(d.items, from, to); })}
        >
          {data.items.map((item, index) => (
            <SortableRow
              key={item.id}
              id={item.id}
              title={`카드 ${index + 1}`}
              onRemove={() => set((d) => { d.items.splice(index, 1); })}
            >
              <div className="grid grid-cols-[80px_1fr] gap-3">
                <TextField label="번호" value={item.number} onChange={(v) => set((d) => { d.items[index].number = v; })} />
                <TextField label="제목" value={item.title} onChange={(v) => set((d) => { d.items[index].title = v; })} />
              </div>
              <TextAreaField label="설명" value={item.description} rows={3} onChange={(v) => set((d) => { d.items[index].description = v; })} />
            </SortableRow>
          ))}
        </SortableList>
        <AddButton
          label="카드 추가"
          onClick={() =>
            set((d) => {
              d.items.push({ id: uid("benefit"), number: String(d.items.length + 1).padStart(2, "0"), title: "새 카드", description: "" });
            })
          }
        />
      </div>
      <TextField
        label="하단 이미지 플레이스홀더 문구"
        value={data.imagePlaceholder ?? ""}
        placeholder="비우면 표시하지 않습니다"
        onChange={(v) => set((d) => { d.imagePlaceholder = v.trim() ? v : null; })}
      />
    </div>
  );
}

export function LineupCardsPanel({ section, pageId, update }: SectionEditorProps) {
  if (section.type !== "lineupCards") return <EmptyPanel />;
  const data = section.data;
  const set = (mutator: (d: LineupCardsSection["data"]) => void) =>
    update((draft) => {
      const s = getPage(draft, pageId)?.sections.find((x) => x.id === section.id);
      if (s?.type === "lineupCards") mutator(s.data);
    });

  return (
    <div className="space-y-5">
      <TextField label="제목" value={data.title} onChange={(v) => set((d) => { d.title = v; })} />
      <div className="space-y-3">
        <h3 className="text-sm font-bold">라인업 카드</h3>
        <SortableList
          ids={data.items.map((item) => item.id)}
          onReorder={(from, to) => set((d) => { d.items = arrayMove(d.items, from, to); })}
        >
          {data.items.map((item, index) => (
            <SortableRow
              key={item.id}
              id={item.id}
              title={`카드 ${index + 1}`}
              onRemove={() => set((d) => { d.items.splice(index, 1); })}
            >
              <TextField label="이름" value={item.name} onChange={(v) => set((d) => { d.items[index].name = v; })} />
              <TextAreaField label="설명" value={item.description} rows={3} onChange={(v) => set((d) => { d.items[index].description = v; })} />
              <TextField label="링크" value={item.href} onChange={(v) => set((d) => { d.items[index].href = v; })} />
            </SortableRow>
          ))}
        </SortableList>
        <AddButton
          label="라인업 카드 추가"
          onClick={() => set((d) => { d.items.push({ id: uid("lineup"), name: "새 라인업", description: "", href: "#" }); })}
        />
      </div>
    </div>
  );
}

export function PlaceholderPanel({ section, pageId, update }: SectionEditorProps) {
  if (section.type !== "placeholder") return <EmptyPanel />;
  const data = section.data;
  const set = (mutator: (d: PlaceholderSection["data"]) => void) =>
    update((draft) => {
      const s = getPage(draft, pageId)?.sections.find((x) => x.id === section.id);
      if (s?.type === "placeholder") mutator(s.data);
    });

  return (
    <div className="space-y-4">
      <TextField
        label="제목(선택)"
        value={data.title ?? ""}
        placeholder="비우면 제목 없이 박스만 표시합니다"
        onChange={(v) => set((d) => { d.title = v.trim() ? v : null; })}
      />
      <TextField label="박스 안내 문구" value={data.label} onChange={(v) => set((d) => { d.label = v; })} />
    </div>
  );
}

export function FaqPanel({ section, pageId, update }: SectionEditorProps) {
  if (section.type !== "faq") return <EmptyPanel />;
  const data = section.data;
  const set = (mutator: (d: FaqSection["data"]) => void) =>
    update((draft) => {
      const s = getPage(draft, pageId)?.sections.find((x) => x.id === section.id);
      if (s?.type === "faq") mutator(s.data);
    });

  return (
    <div className="space-y-5">
      <TextField label="제목" value={data.title} onChange={(v) => set((d) => { d.title = v; })} />
      <div className="space-y-3">
        <h3 className="text-sm font-bold">FAQ 목록</h3>
        <SortableList
          ids={data.items.map((item) => item.id)}
          onReorder={(from, to) => set((d) => { d.items = arrayMove(d.items, from, to); })}
        >
          {data.items.map((item, index) => (
            <SortableRow
              key={item.id}
              id={item.id}
              title={`Q ${index + 1}`}
              onRemove={() => set((d) => { d.items.splice(index, 1); })}
            >
              <TextAreaField label="질문" value={item.question} rows={2} onChange={(v) => set((d) => { d.items[index].question = v; })} />
              <TextAreaField label="답변" value={item.answer} rows={4} onChange={(v) => set((d) => { d.items[index].answer = v; })} />
            </SortableRow>
          ))}
        </SortableList>
        <AddButton
          label="FAQ 추가"
          onClick={() => set((d) => { d.items.push({ id: uid("faq"), question: "새 질문", answer: "" }); })}
        />
      </div>
    </div>
  );
}

export function PageHeaderPanel({ section, pageId, update }: SectionEditorProps) {
  if (section.type !== "pageHeader") return <EmptyPanel />;
  const data = section.data;
  const set = (mutator: (d: PageHeaderSection["data"]) => void) =>
    update((draft) => {
      const s = getPage(draft, pageId)?.sections.find((x) => x.id === section.id);
      if (s?.type === "pageHeader") mutator(s.data);
    });

  return (
    <div className="space-y-4">
      <TextField label="제목" value={data.title} onChange={(v) => set((d) => { d.title = v; })} />
      <TextAreaField label="설명" value={data.description} rows={3} onChange={(v) => set((d) => { d.description = v; })} />
    </div>
  );
}

export function LineupDetailPanel({ section, pageId, update }: SectionEditorProps) {
  if (section.type !== "lineupDetail") return <EmptyPanel />;
  const data = section.data;
  const set = (mutator: (d: LineupDetailSection["data"]) => void) =>
    update((draft) => {
      const s = getPage(draft, pageId)?.sections.find((x) => x.id === section.id);
      if (s?.type === "lineupDetail") mutator(s.data);
    });

  const root: DrillChildGroup = {
    label: "라인업",
    addLabel: "라인업 추가",
    items: data.items.map((lineup, li) => ({
      id: lineup.id,
      title: lineup.label || `라인업 ${li + 1}`,
      fields: (
        <>
          <div className="grid grid-cols-2 gap-3">
            <TextField label="탭 라벨" value={lineup.label} onChange={(v) => set((d) => { d.items[li].label = v; })} />
            <TextField label="slug" value={lineup.slug} onChange={(v) => set((d) => { d.items[li].slug = v; })} />
          </div>
          <TextAreaField label="설명" value={lineup.description} rows={2} onChange={(v) => set((d) => { d.items[li].description = v; })} />
        </>
      ),
      childGroup: {
        label: "카드",
        addLabel: "카드 추가",
        items: lineup.cards.map((card, ci) => ({
          id: card.id,
          title: card.title || `카드 ${ci + 1}`,
          fields: (
            <TextField label="카드 제목" value={card.title} onChange={(v) => set((d) => { d.items[li].cards[ci].title = v; })} />
          ),
          childGroup: {
            label: "블록",
            addLabel: "블록 추가",
            items: card.blocks.map((block, bi) => ({
              id: block.id,
              title: block.heading || `블록 ${bi + 1}`,
              fields: (
                <>
                  <TextField
                    label="소제목(선택)"
                    value={block.heading ?? ""}
                    placeholder="비우면 소제목 없이 목록만"
                    onChange={(v) => set((d) => { d.items[li].cards[ci].blocks[bi].heading = v.trim() ? v : null; })}
                  />
                  <TextAreaField
                    label="항목 (한 줄에 하나)"
                    value={block.items.join("\n")}
                    rows={4}
                    onChange={(v) => set((d) => { d.items[li].cards[ci].blocks[bi].items = v.split("\n"); })}
                  />
                </>
              ),
            })),
            onReorder: (from, to) => set((d) => { d.items[li].cards[ci].blocks = arrayMove(d.items[li].cards[ci].blocks, from, to); }),
            onAdd: () => set((d) => { d.items[li].cards[ci].blocks.push({ id: uid("block"), heading: null, items: [] }); }),
            onRemove: (idx) => set((d) => { d.items[li].cards[ci].blocks.splice(idx, 1); }),
          },
        })),
        onReorder: (from, to) => set((d) => { d.items[li].cards = arrayMove(d.items[li].cards, from, to); }),
        onAdd: () => set((d) => { d.items[li].cards.push({ id: uid("card"), title: "새 카드", blocks: [] }); }),
        onRemove: (idx) => set((d) => { d.items[li].cards.splice(idx, 1); }),
      },
    })),
    onReorder: (from, to) => set((d) => { d.items = arrayMove(d.items, from, to); }),
    onAdd: () => set((d) => { d.items.push({ id: uid("lineup"), slug: uid("slug"), label: "새 라인업", description: "", cards: [] }); }),
    onRemove: (idx) => set((d) => { d.items.splice(idx, 1); }),
  };

  return (
    <DrillInEditor
      root={root}
      rootTitle="라인업"
      hint="라인업 → 카드 → 블록 순으로 열어 편집합니다. 카드 안 항목은 한 줄에 하나씩 입력하세요."
    />
  );
}
