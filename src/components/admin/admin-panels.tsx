"use client";

import type { SiteContent } from "@/lib/content/types";

import {
  AddButton,
  moveItem,
  RepeaterItem,
  TextAreaField,
  TextField,
  ToggleField,
  type UpdateContent,
} from "./admin-fields";

type PanelProps = {
  content: SiteContent;
  update: UpdateContent;
};

const SECTION_TYPE_LABELS: Record<string, string> = {
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

        {navigation.items.map((item, index) => (
          <RepeaterItem
            key={index}
            title={`메뉴 ${index + 1}`}
            index={index}
            total={navigation.items.length}
            onMoveUp={() => update((draft) => moveItem(draft.navigation.items, index, -1))}
            onMoveDown={() => update((draft) => moveItem(draft.navigation.items, index, 1))}
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
          </RepeaterItem>
        ))}

        <AddButton
          label="메뉴 추가"
          onClick={() =>
            update((draft) => {
              draft.navigation.items.push({ label: "새 메뉴", href: "/" });
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

export function SectionsPanel({ content, update }: PanelProps) {
  const sections = content.pages.home.sections;

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        순서를 바꾸면 공개 페이지의 섹션 노출 순서가 함께 바뀝니다. 토글로 노출 여부를 조정할 수 있습니다.
      </p>
      {sections.map((section, index) => (
        <RepeaterItem
          key={section.id}
          title={`${index + 1}. ${SECTION_TYPE_LABELS[section.type] ?? section.type}`}
          index={index}
          total={sections.length}
          onMoveUp={() => update((draft) => moveItem(draft.pages.home.sections, index, -1))}
          onMoveDown={() => update((draft) => moveItem(draft.pages.home.sections, index, 1))}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground">{section.id}</p>
            <ToggleField
              label={section.enabled ? "노출" : "숨김"}
              checked={section.enabled}
              onChange={(checked) =>
                update((draft) => {
                  draft.pages.home.sections[index].enabled = checked;
                })
              }
            />
          </div>
        </RepeaterItem>
      ))}
    </div>
  );
}

export function HeroPanel({ content, update }: PanelProps) {
  const section = content.pages.home.sections.find((item) => item.type === "hero");
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
            const target = draft.pages.home.sections.find((item) => item.type === "hero");
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
            const target = draft.pages.home.sections.find((item) => item.type === "hero");
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
  const section = content.pages.home.sections.find((item) => item.type === "news");
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
              const target = draft.pages.home.sections.find((item) => item.type === "news");
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
              const target = draft.pages.home.sections.find((item) => item.type === "news");
              if (target?.type === "news") {
                target.data.moreLink.href = value;
              }
            })
          }
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold">뉴스 목록</h3>
        {section.data.items.map((item, index) => (
          <RepeaterItem
            key={item.id}
            title={`뉴스 ${index + 1}`}
            index={index}
            total={section.data.items.length}
            onMoveUp={() =>
              update((draft) => {
                const target = draft.pages.home.sections.find((s) => s.type === "news");
                if (target?.type === "news") moveItem(target.data.items, index, -1);
              })
            }
            onMoveDown={() =>
              update((draft) => {
                const target = draft.pages.home.sections.find((s) => s.type === "news");
                if (target?.type === "news") moveItem(target.data.items, index, 1);
              })
            }
            onRemove={() =>
              update((draft) => {
                const target = draft.pages.home.sections.find((s) => s.type === "news");
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
                  const target = draft.pages.home.sections.find((s) => s.type === "news");
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
                    const target = draft.pages.home.sections.find((s) => s.type === "news");
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
                    const target = draft.pages.home.sections.find((s) => s.type === "news");
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
                  const target = draft.pages.home.sections.find((s) => s.type === "news");
                  if (target?.type === "news") target.data.items[index].href = value;
                })
              }
            />
          </RepeaterItem>
        ))}

        <AddButton
          label="뉴스 추가"
          onClick={() =>
            update((draft) => {
              const target = draft.pages.home.sections.find((s) => s.type === "news");
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
  const section = content.pages.home.sections.find((item) => item.type === "subscribe");
  if (section?.type !== "subscribe") {
    return <EmptyPanel />;
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        요소 순서를 바꾸면 구독 영역의 텍스트/입력/버튼 배치 순서가 바뀝니다.
      </p>
      {section.data.items.map((item, index) => (
        <RepeaterItem
          key={item.id}
          title={`${index + 1}. ${item.type}`}
          index={index}
          total={section.data.items.length}
          onMoveUp={() =>
            update((draft) => {
              const target = draft.pages.home.sections.find((s) => s.type === "subscribe");
              if (target?.type === "subscribe") moveItem(target.data.items, index, -1);
            })
          }
          onMoveDown={() =>
            update((draft) => {
              const target = draft.pages.home.sections.find((s) => s.type === "subscribe");
              if (target?.type === "subscribe") moveItem(target.data.items, index, 1);
            })
          }
        >
          {item.type === "text" ? (
            <TextAreaField
              label="텍스트"
              value={item.value}
              rows={2}
              onChange={(value) =>
                update((draft) => {
                  const target = draft.pages.home.sections.find((s) => s.type === "subscribe");
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
                    const target = draft.pages.home.sections.find((s) => s.type === "subscribe");
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
                    const target = draft.pages.home.sections.find((s) => s.type === "subscribe");
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
                    const target = draft.pages.home.sections.find((s) => s.type === "subscribe");
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
                    const target = draft.pages.home.sections.find((s) => s.type === "subscribe");
                    const field = target?.type === "subscribe" ? target.data.items[index] : undefined;
                    if (field?.type === "button") field.href = value;
                  })
                }
              />
            </div>
          ) : null}
        </RepeaterItem>
      ))}
    </div>
  );
}

export function ProductTabsPanel({ content, update }: PanelProps) {
  const section = content.pages.home.sections.find((item) => item.type === "productTabs");
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
            const target = draft.pages.home.sections.find((item) => item.type === "productTabs");
            if (target?.type === "productTabs") target.data.headline = value;
          })
        }
      />

      {section.data.tabs.map((tab, index) => (
        <RepeaterItem
          key={tab.id}
          title={`${index + 1}. ${tab.productName}`}
          index={index}
          total={section.data.tabs.length}
          onMoveUp={() =>
            update((draft) => {
              const target = draft.pages.home.sections.find((s) => s.type === "productTabs");
              if (target?.type === "productTabs") moveItem(target.data.tabs, index, -1);
            })
          }
          onMoveDown={() =>
            update((draft) => {
              const target = draft.pages.home.sections.find((s) => s.type === "productTabs");
              if (target?.type === "productTabs") moveItem(target.data.tabs, index, 1);
            })
          }
        >
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="탭 라벨"
              value={tab.label}
              onChange={(value) =>
                update((draft) => {
                  const target = draft.pages.home.sections.find((s) => s.type === "productTabs");
                  if (target?.type === "productTabs") target.data.tabs[index].label = value;
                })
              }
            />
            <TextField
              label="카테고리"
              value={tab.category}
              onChange={(value) =>
                update((draft) => {
                  const target = draft.pages.home.sections.find((s) => s.type === "productTabs");
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
                const target = draft.pages.home.sections.find((s) => s.type === "productTabs");
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
                const target = draft.pages.home.sections.find((s) => s.type === "productTabs");
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
                  const target = draft.pages.home.sections.find((s) => s.type === "productTabs");
                  if (target?.type === "productTabs") target.data.tabs[index].button.label = value;
                })
              }
            />
            <TextField
              label="버튼 링크"
              value={tab.button.href}
              onChange={(value) =>
                update((draft) => {
                  const target = draft.pages.home.sections.find((s) => s.type === "productTabs");
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
                const target = draft.pages.home.sections.find((s) => s.type === "productTabs");
                if (target?.type === "productTabs") target.data.tabs[index].logo = value;
              })
            }
          />
          <TextField
            label="비주얼 에셋 경로"
            value={tab.visual.value}
            onChange={(value) =>
              update((draft) => {
                const target = draft.pages.home.sections.find((s) => s.type === "productTabs");
                if (target?.type === "productTabs") target.data.tabs[index].visual.value = value;
              })
            }
          />
        </RepeaterItem>
      ))}
    </div>
  );
}

export function StatsPanel({ content, update }: PanelProps) {
  const section = content.pages.home.sections.find((item) => item.type === "stats");
  if (section?.type !== "stats") {
    return <EmptyPanel />;
  }

  return (
    <div className="space-y-4">
      {section.data.items.map((item, index) => (
        <RepeaterItem
          key={item.id}
          title={`통계 ${index + 1}`}
          index={index}
          total={section.data.items.length}
          onMoveUp={() =>
            update((draft) => {
              const target = draft.pages.home.sections.find((s) => s.type === "stats");
              if (target?.type === "stats") moveItem(target.data.items, index, -1);
            })
          }
          onMoveDown={() =>
            update((draft) => {
              const target = draft.pages.home.sections.find((s) => s.type === "stats");
              if (target?.type === "stats") moveItem(target.data.items, index, 1);
            })
          }
          onRemove={() =>
            update((draft) => {
              const target = draft.pages.home.sections.find((s) => s.type === "stats");
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
                  const target = draft.pages.home.sections.find((s) => s.type === "stats");
                  if (target?.type === "stats") target.data.items[index].label = value;
                })
              }
            />
            <TextField
              label="값"
              value={item.value}
              onChange={(value) =>
                update((draft) => {
                  const target = draft.pages.home.sections.find((s) => s.type === "stats");
                  if (target?.type === "stats") target.data.items[index].value = value;
                })
              }
            />
          </div>
        </RepeaterItem>
      ))}

      <AddButton
        label="통계 추가"
        onClick={() =>
          update((draft) => {
            const target = draft.pages.home.sections.find((s) => s.type === "stats");
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
  const section = content.pages.home.sections.find((item) => item.type === "awards");
  if (section?.type !== "awards") {
    return <EmptyPanel />;
  }

  return (
    <div className="space-y-4">
      {section.data.items.map((item, index) => (
        <RepeaterItem
          key={item.id}
          title={`수상 ${index + 1}`}
          index={index}
          total={section.data.items.length}
          onMoveUp={() =>
            update((draft) => {
              const target = draft.pages.home.sections.find((s) => s.type === "awards");
              if (target?.type === "awards") moveItem(target.data.items, index, -1);
            })
          }
          onMoveDown={() =>
            update((draft) => {
              const target = draft.pages.home.sections.find((s) => s.type === "awards");
              if (target?.type === "awards") moveItem(target.data.items, index, 1);
            })
          }
          onRemove={() =>
            update((draft) => {
              const target = draft.pages.home.sections.find((s) => s.type === "awards");
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
                const target = draft.pages.home.sections.find((s) => s.type === "awards");
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
                const target = draft.pages.home.sections.find((s) => s.type === "awards");
                if (target?.type === "awards") target.data.items[index].description = value;
              })
            }
          />
          <TextField
            label="로고 경로"
            value={item.logo}
            onChange={(value) =>
              update((draft) => {
                const target = draft.pages.home.sections.find((s) => s.type === "awards");
                if (target?.type === "awards") target.data.items[index].logo = value;
              })
            }
          />
        </RepeaterItem>
      ))}

      <AddButton
        label="수상 항목 추가"
        onClick={() =>
          update((draft) => {
            const target = draft.pages.home.sections.find((s) => s.type === "awards");
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
        {footer.groups.map((group, groupIndex) => (
          <RepeaterItem
            key={groupIndex}
            title={`그룹 ${groupIndex + 1}: ${group.title}`}
            index={groupIndex}
            total={footer.groups.length}
            onMoveUp={() => update((draft) => moveItem(draft.footer.groups, groupIndex, -1))}
            onMoveDown={() => update((draft) => moveItem(draft.footer.groups, groupIndex, 1))}
            onRemove={() =>
              update((draft) => {
                draft.footer.groups.splice(groupIndex, 1);
              })
            }
          >
            <TextField
              label="그룹 제목"
              value={group.title}
              onChange={(value) =>
                update((draft) => {
                  draft.footer.groups[groupIndex].title = value;
                })
              }
            />
            <div className="space-y-2 border-l-2 border-muted pl-3">
              {group.items.map((item, itemIndex) => (
                <RepeaterItem
                  key={itemIndex}
                  title={`링크 ${itemIndex + 1}`}
                  index={itemIndex}
                  total={group.items.length}
                  onMoveUp={() =>
                    update((draft) => moveItem(draft.footer.groups[groupIndex].items, itemIndex, -1))
                  }
                  onMoveDown={() =>
                    update((draft) => moveItem(draft.footer.groups[groupIndex].items, itemIndex, 1))
                  }
                  onRemove={() =>
                    update((draft) => {
                      draft.footer.groups[groupIndex].items.splice(itemIndex, 1);
                    })
                  }
                >
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
                </RepeaterItem>
              ))}
              <AddButton
                label="링크 추가"
                onClick={() =>
                  update((draft) => {
                    draft.footer.groups[groupIndex].items.push({ label: "새 링크", href: "/" });
                  })
                }
              />
            </div>
          </RepeaterItem>
        ))}

        <AddButton
          label="메뉴 그룹 추가"
          onClick={() =>
            update((draft) => {
              draft.footer.groups.push({ title: "새 그룹", items: [{ label: "새 링크", href: "/" }] });
            })
          }
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
          {footer.legal.utilityLinks.map((item, index) => (
            <RepeaterItem
              key={index}
              title={`링크 ${index + 1}`}
              index={index}
              total={footer.legal.utilityLinks.length}
              onMoveUp={() => update((draft) => moveItem(draft.footer.legal.utilityLinks, index, -1))}
              onMoveDown={() => update((draft) => moveItem(draft.footer.legal.utilityLinks, index, 1))}
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
            </RepeaterItem>
          ))}
          <AddButton
            label="우측 링크 추가"
            onClick={() =>
              update((draft) => {
                draft.footer.legal.utilityLinks.push({ label: "새 링크", href: "/" });
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
