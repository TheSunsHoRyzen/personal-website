"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useDrag } from "./useDrag";
import { useWindows, type WinState } from "./WindowManager";
import { windowDefs, type WindowId } from "./windows";

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
  // Dragging only applies to floating windows on wider screens.
  const dragHandlers = useDrag(
    ref,
    () => !win.maximized && window.matchMedia("(min-width: 640px)").matches,
    (x, y) => dispatch({ type: "move", id, x, y }),
  );

  const visible = win.open && !win.minimized;

  // Geometry is clamped in CSS so a window always fits the screen it's on: never wider/taller than
  // the layer, and never positioned so far right/down that it hangs off the edge. (Percentages
  // resolve against the layer when used in left/top/width/height.)
  const style = {
    "--left": `min(${win.x}px, max(0px, calc(100% - min(${def.w}px, 100%))))`,
    "--top": `min(${win.y}px, max(0px, calc(100% - min(${def.h}px, 100%))))`,
    "--width": `min(${def.w}px, 100%)`,
    "--height": `min(${def.h}px, 100%)`,
    zIndex: win.z,
  } as CSSProperties;

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
          : "rounded-window max-sm:inset-0 max-sm:rounded-none sm:top-(--top) sm:left-(--left) sm:h-(--height) sm:w-(--width)"
      }`}
    >
      <div
        {...dragHandlers}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest("button"))
            dispatch({ type: "toggleMaximize", id });
        }}
        className="relative flex h-11 shrink-0 touch-none items-center border-b border-glass-border px-4 select-none sm:cursor-grab"
      >
        <div className="group flex gap-2 max-sm:gap-4 pointer-coarse:gap-4">
          {lights.map(({ label, color, glyph, action }) => (
            <button
              key={action}
              type="button"
              aria-label={`${label} ${def.menuName}`}
              onClick={() => dispatch({ type: action, id })}
              // The ::after pseudo-element enlarges the 12px dot's click/tap area without changing its look.
              className={`relative flex size-3 items-center justify-center rounded-full after:absolute after:-inset-1 after:content-[''] max-sm:after:-inset-2 pointer-coarse:after:-inset-2 ${color} text-[9px] leading-none text-traffic-glyph focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
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
