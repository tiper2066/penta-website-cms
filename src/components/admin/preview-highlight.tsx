"use client";

import { useEffect, useRef, useState } from "react";

// 편집기(부모 창)와 미리보기(iframe) 사이의 하이라이트 통신 규약.
// 콘텐츠 동기화(admin-store)와 분리된, 저장 불필요한 일시적 UI 상태입니다.
const MESSAGE_SOURCE = "penta-admin";

type ActiveTarget = {
  id: string;
  label: string;
};

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

function rectsEqual(a: Rect | null, b: Rect | null): boolean {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return (
    Math.abs(a.top - b.top) < 0.5 &&
    Math.abs(a.left - b.left) < 0.5 &&
    Math.abs(a.width - b.width) < 0.5 &&
    Math.abs(a.height - b.height) < 0.5
  );
}

export function PreviewHighlight() {
  const [active, setActive] = useState<ActiveTarget | null>(null);
  const [rect, setRect] = useState<Rect | null>(null);
  const rectRef = useRef<Rect | null>(null);

  // 부모 창의 활성 대상 메시지를 구독하고, 마운트 시 준비 완료를 알립니다.
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) {
        return;
      }
      const data = event.data;
      if (!data || data.source !== MESSAGE_SOURCE || data.type !== "active-target") {
        return;
      }
      if (typeof data.target === "string" && data.target.length > 0) {
        setActive({ id: data.target, label: typeof data.label === "string" ? data.label : "" });
      } else {
        setActive(null);
      }
    }

    window.addEventListener("message", onMessage);

    // 핸드셰이크: 리스너 등록 후 부모에게 준비 완료를 알려 초기 메시지 유실을 방지합니다.
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ source: MESSAGE_SOURCE, type: "preview-ready" }, window.location.origin);
    }

    return () => window.removeEventListener("message", onMessage);
  }, []);

  // 활성 대상 위치를 매 프레임 추적(스크롤/리플로우/이미지 로드 대응)하고 스크롤 이동합니다.
  useEffect(() => {
    if (!active) {
      rectRef.current = null;
      // 이펙트 본문에서 동기 setState를 피하기 위해 다음 프레임으로 지연합니다.
      const clear = requestAnimationFrame(() => setRect(null));
      return () => cancelAnimationFrame(clear);
    }

    const selector = `[data-preview-id="${active.id.replace(/"/g, '\\"')}"]`;
    const initial = document.querySelector<HTMLElement>(selector);
    if (initial) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      initial.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }

    let frame = 0;
    let mounted = true;

    const measure = () => {
      if (!mounted) {
        return;
      }
      const node = document.querySelector<HTMLElement>(selector);
      const next = node
        ? (() => {
            const box = node.getBoundingClientRect();
            return { top: box.top, left: box.left, width: box.width, height: box.height };
          })()
        : null;

      if (!rectsEqual(rectRef.current, next)) {
        rectRef.current = next;
        setRect(next);
      }
      frame = requestAnimationFrame(measure);
    };

    frame = requestAnimationFrame(measure);

    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
    };
  }, [active]);

  if (!active || !rect) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-9999"
      style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
    >
      <div className="absolute inset-0 rounded-[4px] bg-brand-blue/5 ring-2 ring-inset ring-brand-blue" />
      <span className="absolute left-2 top-2 rounded-full bg-brand-blue px-2 py-0.5 text-[11px] font-bold text-white shadow-md">
        편집 중: {active.label}
      </span>
    </div>
  );
}
