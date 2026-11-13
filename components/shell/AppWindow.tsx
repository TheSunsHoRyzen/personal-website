"use client";

import {
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { useWindows, type WinState } from "./WindowManager";
import { windowDefs, type WindowId } from "./windows";

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

type AppWindowProps = {
  id: WindowId;
  win: WinState;
  focused: boolean;
  children: ReactNode;
};

export function AppWindow({ id, win, focused, children }: AppWindowProps) {
  const { dispatch } = useWindows();
  const def = windowDefs[id];
  const ref = useRef<HTMLElement>(null);
  const drag = useRef<{ offX: number; offY: number } | null>(null);

  const visible = win.open && !win.minimized;

  const style = {
    "--x": `${win.x}px`,
    "--y": `${win.y}px`,
    "--w": `${def.w}px`,
    "--h": `${def.h}px`,
    zIndex: win.z,
  } as CSSProperties;

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button")) return;
    // Dragging only applies to floating windows on wider screens.
    if (win.maximized || !window.matchMedia("(min-width: 640px)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    drag.current = { offX: e.clientX - rect.left, offY: e.clientY - rect.top };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const el = ref.current;
    const layer = el?.offsetParent?.getBoundingClientRect();
    if (!d || !el || !layer) return;
    // Keep at least part of the title bar reachable.
    const x = clamp(e.clientX - d.offX - layer.left, 80 - el.offsetWidth, layer.width - 80);
    const y = clamp(e.clientY - d.offY - layer.top, 0, layer.height - 40);
    dispatch({ type: "move", id, x, y });
  }

  function endDrag() {
    drag.current = null;
  }

  const lights = [
    { label: "Close", color: "bg-traffic-close", glyph: "×", action: "close" },
    { label: "Minimize", color: "bg-traffic-minimize", glyph: "–", action: "minimize" },
    {
      label: win.maximized ? "Restore" : "Maximize",
      color: "bg-traffic-maximize",
      glyph: "+",
      action: "toggleMaximize",
    },
  ] as const;

  return (
    <section
      ref={ref}
      hidden={!visible}
      aria-label={def.menuName}
      style={style}
      onPointerDownCapture={() => {
        if (!focused) dispatch({ type: "focus", id });
      }}
      className={`glass pointer-events-auto absolute flex max-h-full max-w-full flex-col overflow-hidden ${
        win.maximized
          ? "inset-0 rounded-none"
          : "rounded-window max-sm:inset-0 max-sm:rounded-none sm:top-(--y) sm:left-(--x) sm:h-(--h) sm:w-(--w)"
      }`}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest("button"))
            dispatch({ type: "toggleMaximize", id });
        }}
        className="relative flex h-11 shrink-0 touch-none items-center border-b border-glass-border px-4 select-none sm:cursor-grab"
      >
        <div className="group flex gap-2">
          {lights.map(({ label, color, glyph, action }) => (
            <button
              key={action}
              type="button"
              aria-label={`${label} ${def.menuName}`}
              onClick={() => dispatch({ type: action, id })}
              className={`flex size-3 items-center justify-center rounded-full ${color} text-[9px] leading-none text-traffic-glyph focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
            >
              <span
                aria-hidden="true"
                className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {glyph}
              </span>
            </button>
          ))}
        </div>
        <p
          className={`pointer-events-none absolute inset-x-0 text-center font-mono text-xs ${
            focused ? "text-fg" : "text-fg-muted"
          }`}
        >
          {def.title}
        </p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-auto">{children}</div>
    </section>
  );
}
