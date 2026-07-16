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
    cachedContent = raw ? (JSON.parse(raw) as SiteContent) : defaultSnapshot;
  } catch {
    cachedContent = defaultSnapshot;
  }
  return cachedContent;
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
