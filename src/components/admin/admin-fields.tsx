"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteContent } from "@/lib/content/types";

export type UpdateContent = (mutator: (draft: SiteContent) => void) => void;

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
};

export function TextField({ label, value, onChange, placeholder, hint }: TextFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg bg-white"
      />
      {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

type TextAreaFieldProps = TextFieldProps & {
  rows?: number;
};

export function TextAreaField({ label, value, onChange, placeholder, hint, rows = 3 }: TextAreaFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg bg-white"
      />
      {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

type ToggleFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function ToggleField({ label, checked, onChange }: ToggleFieldProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 text-xs font-semibold"
      aria-pressed={checked}
    >
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
      {label}
    </button>
  );
}

type RepeaterItemProps = {
  title: string;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove?: () => void;
  children: ReactNode;
};

export function RepeaterItem({
  title,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
  children,
}: RepeaterItemProps) {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold text-muted-foreground">{title}</p>
        <div className="flex items-center gap-1">
          <IconButton label="위로 이동" disabled={index === 0} onClick={onMoveUp}>
            <ArrowUp className="h-4 w-4" />
          </IconButton>
          <IconButton label="아래로 이동" disabled={index === total - 1} onClick={onMoveDown}>
            <ArrowDown className="h-4 w-4" />
          </IconButton>
          {onRemove ? (
            <IconButton label="삭제" onClick={onRemove} variant="danger">
              <Trash2 className="h-4 w-4" />
            </IconButton>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
}

type IconButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "danger";
  children: ReactNode;
};

export function IconButton({ label, onClick, disabled, variant = "default", children }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors disabled:opacity-30 ${
        variant === "danger"
          ? "text-red-500 hover:bg-red-50"
          : "text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

type AddButtonProps = {
  label: string;
  onClick: () => void;
};

export function AddButton({ label, onClick }: AddButtonProps) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick} className="w-full">
      <Plus className="h-4 w-4" />
      {label}
    </Button>
  );
}

export function moveItem<T>(items: T[], index: number, direction: -1 | 1): void {
  const target = index + direction;
  if (target < 0 || target >= items.length) {
    return;
  }
  const [moved] = items.splice(index, 1);
  items.splice(target, 0, moved);
}
