"use client";

import { getSiteContent } from "./site";
import type { SiteContent } from "./types";

export const ADMIN_STORAGE_KEY = "penta-cms:admin-demo:content";
export const ADMIN_BROADCAST_CHANNEL = "penta-cms:admin-demo";

const defaultSnapshot: SiteContent = structuredClone(getSiteContent());

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedContent: SiteContent = defaultSnapshot;
let channel: BroadcastChannel | null = null;
let initialized = false;

function emitChange(): void {
  for (const listener of listeners) {
    listener();
  }
}

function ensureInitialized(): void {
  if (initialized || typeof window === "undefined") {
    return;
  }
  initialized = true;

  // 이전 스키마 등 호환되지 않는 stale 저장 데이터는 한 번 정리합니다.
  try {
    const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    if (raw && !isValidContent(JSON.parse(raw))) {
      window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  } catch {
    window.localStorage.removeItem(ADMIN_STORAGE_KEY);
  }

  window.addEventListener("storage", (event) => {
    if (event.key === ADMIN_STORAGE_KEY) {
      emitChange();
    }
  });

  if (typeof BroadcastChannel !== "undefined") {
    channel = new BroadcastChannel(ADMIN_BROADCAST_CHANNEL);
    channel.onmessage = () => emitChange();
  }
}

export function subscribeContent(listener: () => void): () => void {
  ensureInitialized();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getContentSnapshot(): SiteContent {
  if (typeof window === "undefined") {
    return defaultSnapshot;
  }

  const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
  if (raw === cachedRaw) {
    return cachedContent;
  }

  cachedRaw = raw;
  try {
    const parsed = raw ? JSON.parse(raw) : null;
    // 이전 스키마(pages가 { home } 객체 맵)로 저장된 stale 데이터 등
    // 현재 형식과 맞지 않으면 기본 스냅샷으로 되돌립니다.
    cachedContent = parsed && isValidContent(parsed) ? (parsed as SiteContent) : defaultSnapshot;
  } catch {
    cachedContent = defaultSnapshot;
  }
  return cachedContent;
}

// 저장된 콘텐츠가 현재 스키마(pages 배열)와 호환되는지 최소 검증합니다.
function isValidContent(value: unknown): value is SiteContent {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as { pages?: unknown; navigation?: unknown; footer?: unknown };
  return (
    Array.isArray(candidate.pages) &&
    typeof candidate.navigation === "object" &&
    candidate.navigation !== null &&
    typeof candidate.footer === "object" &&
    candidate.footer !== null
  );
}

export function getServerContentSnapshot(): SiteContent {
  return defaultSnapshot;
}

export function getDefaultContent(): SiteContent {
  return structuredClone(defaultSnapshot);
}

export function writeContent(next: SiteContent): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(next));
    channel?.postMessage("updated");
  }
  emitChange();
}

export function resetContent(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    channel?.postMessage("updated");
  }
  emitChange();
}

// 편집기 UI 상태(선택한 편집 대상, 아코디언 펼침 상태)를 저장할 필요는 있으나
// 콘텐츠와 성격이 다르므로 별도 키/구독으로 관리합니다. 새로고침 후에도 유지됩니다.
export const ADMIN_UI_TARGET_KEY = "penta-cms:admin-demo:ui:target";
export const ADMIN_UI_EXPANDED_KEY = "penta-cms:admin-demo:ui:expanded";

const uiListeners = new Set<() => void>();
let uiInitialized = false;

function emitUiChange(): void {
  for (const listener of uiListeners) {
    listener();
  }
}

function ensureUiInitialized(): void {
  if (uiInitialized || typeof window === "undefined") {
    return;
  }
  uiInitialized = true;

  window.addEventListener("storage", (event) => {
    if (event.key === ADMIN_UI_TARGET_KEY || event.key === ADMIN_UI_EXPANDED_KEY) {
      emitUiChange();
    }
  });
}

export function subscribeUi(listener: () => void): () => void {
  ensureUiInitialized();
  uiListeners.add(listener);
  return () => {
    uiListeners.delete(listener);
  };
}

export function getUiTargetSnapshot(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(ADMIN_UI_TARGET_KEY);
}

export function getServerUiTargetSnapshot(): string | null {
  return null;
}

export function writeUiTarget(value: string): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ADMIN_UI_TARGET_KEY, value);
  }
  emitUiChange();
}

const EMPTY_EXPANDED: Record<string, string[]> = {};
let cachedExpandedRaw: string | null | undefined;
let cachedExpanded: Record<string, string[]> = EMPTY_EXPANDED;

export function getUiExpandedSnapshot(): Record<string, string[]> {
  if (typeof window === "undefined") {
    return EMPTY_EXPANDED;
  }

  const raw = window.localStorage.getItem(ADMIN_UI_EXPANDED_KEY);
  if (raw === cachedExpandedRaw) {
    return cachedExpanded;
  }

  cachedExpandedRaw = raw;
  try {
    cachedExpanded = raw ? (JSON.parse(raw) as Record<string, string[]>) : EMPTY_EXPANDED;
  } catch {
    cachedExpanded = EMPTY_EXPANDED;
  }
  return cachedExpanded;
}

export function getServerUiExpandedSnapshot(): Record<string, string[]> {
  return EMPTY_EXPANDED;
}

export function writeUiExpanded(next: Record<string, string[]>): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ADMIN_UI_EXPANDED_KEY, JSON.stringify(next));
  }
  emitUiChange();
}
