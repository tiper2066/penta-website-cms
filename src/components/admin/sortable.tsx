"use client";

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export { arrayMove };

// 드래그 전용(키보드 이동 미지원)이므로 PointerSensor만 사용합니다.
// activationConstraint로 약간의 이동 임계값을 둬 다른 버튼 클릭과 충돌을 피합니다.
export function usePointerSortSensors() {
  return useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
}

export const DragHandle = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function DragHandle({ className, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label="드래그하여 순서 변경"
        title="드래그하여 순서 변경"
        className={cn(
          "inline-flex h-7 w-7 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:cursor-grabbing",
          className,
        )}
        {...props}
      >
        <GripVertical className="h-4 w-4" />
      </button>
    );
  },
);

type RemoveButtonProps = {
  onClick: () => void;
  label?: string;
};

export function RemoveButton({ onClick, label = "삭제" }: RemoveButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

type SortableListProps = {
  ids: string[];
  onReorder: (from: number, to: number) => void;
  children: ReactNode;
  className?: string;
};

export function SortableList({ ids, onReorder, children, className }: SortableListProps) {
  const sensors = usePointerSortSensors();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    const from = ids.indexOf(String(active.id));
    const to = ids.indexOf(String(over.id));
    if (from === -1 || to === -1) {
      return;
    }
    onReorder(from, to);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className={cn("flex flex-col gap-3", className)}>{children}</div>
      </SortableContext>
    </DndContext>
  );
}

type SortableRowProps = {
  id: string;
  title: string;
  onRemove?: () => void;
  children: ReactNode;
};

export function SortableRow({ id, title, onRemove, children }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id });

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
        <p className="text-xs font-bold text-muted-foreground">{title}</p>
        <div className="flex items-center gap-1">
          {onRemove ? <RemoveButton onClick={onRemove} /> : null}
          <DragHandle ref={setActivatorNodeRef} {...attributes} {...listeners} />
        </div>
      </div>
      {children}
    </div>
  );
}
