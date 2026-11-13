"use client";

import { WindowIcon } from "./icons";
import { useWindows } from "./WindowManager";
import { windowDefs, windowIds } from "./windows";

/** Row of launcher icons on the desktop, behind the windows. Same "open" action as the menu bar. */
export function DesktopIcons() {
  const { state, dispatch } = useWindows();

  return (
    <ul className="pointer-events-none fixed top-(--menubar-height) left-0 flex flex-wrap gap-2 p-4">
      {windowIds.map((id) => {
        const { menuName } = windowDefs[id];
        const isOpen = state.windows[id].open;
        return (
          <li key={id} className="pointer-events-auto">
            <button
              type="button"
              onClick={() => dispatch({ type: "open", id })}
              aria-label={`Open ${menuName}`}
              className="group flex w-20 flex-col items-center gap-1.5 rounded-control p-1.5 text-fg transition-colors hover:bg-tab-hover focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span className="glass rounded-window flex size-14 items-center justify-center">
                <WindowIcon id={id} />
              </span>
              <span className="text-xs [text-shadow:var(--icon-label-shadow)]">{menuName}</span>
              {/* Dot under the label while the window is open. */}
              <span
                aria-hidden="true"
                className={`size-1 rounded-full bg-fg ${isOpen ? "opacity-80" : "opacity-0"}`}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
