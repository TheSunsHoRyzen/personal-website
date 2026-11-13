"use client";

import { WindowIcon } from "./icons";
import { useWindows } from "./WindowManager";
import { windowDefs } from "./windows";

/**
 * Minimized windows, as small glass boxes along the bottom-left of the screen. Boxes are added
 * left to right in the order windows were minimized; clicking one restores that window.
 */
export function Dock() {
  const { state, dispatch } = useWindows();
  if (state.dock.length === 0) return null;

  return (
    <nav
      aria-label="Minimized windows"
      className="pointer-events-none fixed bottom-0 left-0 z-10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <ul className="flex flex-wrap-reverse gap-2">
        {state.dock.map((id) => (
          <li key={id} className="pointer-events-auto">
            <button
              type="button"
              onClick={() => dispatch({ type: "open", id })}
              aria-label={`Restore ${windowDefs[id].menuName}`}
              className="glass rounded-control flex items-center gap-2 px-3 py-2 text-xs text-fg transition-colors hover:bg-tab-hover focus-visible:outline-2 focus-visible:outline-accent max-sm:py-2.5 pointer-coarse:py-2.5"
            >
              <WindowIcon id={id} className="size-4" />
              {windowDefs[id].menuName}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
