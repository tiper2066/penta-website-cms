"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment, useState, type ReactNode } from "react";

import { AddButton } from "./admin-fields";
import { SortableList, SortableRow } from "./sortable";

// 깊게 중첩된 목록(예: 라인업 → 카드 → 블록, 그룹 → 링크)을 한 번에 한 레벨씩만
// 보여주는 드릴-인(drill-in) 편집기. 각 레벨은 DrillChildGroup으로 기술하고,
// 자식이 있는 노드는 "열기"로 파고들어 편집합니다.
export type DrillChildGroup = {
  label: string;
  addLabel: string;
  items: DrillNode[];
  onReorder: (from: number, to: number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

export type DrillNode = {
  id: string;
  title: string;
  // 이 노드 자체의 편집 폼. 자식이 없는 leaf는 목록에서 바로 인라인으로 표시하고,
  // 자식이 있는 노드는 드릴-인해 들어갔을 때 상단에 표시합니다.
  fields?: ReactNode;
  childGroup?: DrillChildGroup;
};

type DrillInEditorProps = {
  root: DrillChildGroup;
  rootTitle: string;
  hint?: string;
};

// path(노드 id 배열)를 현재 트리에 대해 해석합니다. 중간에 삭제된 노드가 있으면
// 해석 가능한 지점까지만 반환합니다.
function resolvePath(root: DrillChildGroup, path: string[]): DrillNode[] {
  const nodes: DrillNode[] = [];
  let group: DrillChildGroup | undefined = root;
  for (const id of path) {
    if (!group) {
      break;
    }
    const node: DrillNode | undefined = group.items.find((item) => item.id === id);
    if (!node || !node.childGroup) {
      break;
    }
    nodes.push(node);
    group = node.childGroup;
  }
  return nodes;
}

export function DrillInEditor({ root, rootTitle, hint }: DrillInEditorProps) {
  const [path, setPath] = useState<string[]>([]);

  // path는 노드 id 배열이지만, 삭제 등으로 중간이 사라지면 trail이 짧아집니다.
  // 렌더링은 항상 파생된 trail/effectivePath만 사용하므로 stale한 path는 무해하며
  // 다음 탐색(뒤로/열기/브레드크럼) 시 effectivePath 기준으로 자연히 정리됩니다.
  const trail = resolvePath(root, path);
  const effectivePath = trail.map((node) => node.id);

  const currentNode = trail.length > 0 ? trail[trail.length - 1] : null;
  const currentGroup = currentNode ? currentNode.childGroup : root;
  const currentFields = currentNode?.fields ?? null;
  const crumbs = [rootTitle, ...trail.map((node) => node.title)];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-1 text-xs">
        {crumbs.map((label, index) => (
          <Fragment key={index}>
            {index > 0 ? <ChevronRight className="h-3 w-3 text-muted-foreground" /> : null}
            {index === crumbs.length - 1 ? (
              <span className="font-bold">{label}</span>
            ) : (
              <button
                type="button"
                onClick={() => setPath(effectivePath.slice(0, index))}
                className="text-primary transition-colors hover:underline"
              >
                {label}
              </button>
            )}
          </Fragment>
        ))}
      </div>

      {trail.length > 0 ? (
        <button
          type="button"
          onClick={() => setPath(effectivePath.slice(0, -1))}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          뒤로
        </button>
      ) : hint ? (
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      ) : null}

      {currentFields ? (
        <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-3">{currentFields}</div>
      ) : null}

      {currentGroup ? (
        <div className="space-y-3">
          <SortableList ids={currentGroup.items.map((node) => node.id)} onReorder={currentGroup.onReorder}>
            {currentGroup.items.map((node, index) => (
              <SortableRow
                key={node.id}
                id={node.id}
                title={node.title || `${currentGroup.label} ${index + 1}`}
                onRemove={() => currentGroup.onRemove(index)}
              >
                {node.childGroup ? (
                  <button
                    type="button"
                    onClick={() => setPath([...effectivePath, node.id])}
                    className="flex w-full items-center justify-between rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                  >
                    <span>
                      {node.childGroup.label} {node.childGroup.items.length}개 편집
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  node.fields
                )}
              </SortableRow>
            ))}
          </SortableList>
          <AddButton label={currentGroup.addLabel} onClick={currentGroup.onAdd} />
        </div>
      ) : null}
    </div>
  );
}
