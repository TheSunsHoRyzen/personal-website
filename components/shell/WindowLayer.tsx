"use client";

import type { ReactNode } from "react";
import { AppWindow } from "./AppWindow";
import { useWindows } from "./WindowManager";
import { windowIds, type WindowId } from "./windows";

/**
 * Area under the menu bar where windows float. Windows stay mounted while
 * closed/minimized (just hidden), so their internal state (terminal scrollback) survives.
 */
export function WindowLayer({
  contents,
}: {
  contents: Record<WindowId, ReactNode>;
}) {
  const { state } = useWindows();

  return (
    <main className="pointer-events-none fixed inset-x-0 top-(--menubar-height) bottom-0">
      {windowIds.map((id) => (
        <AppWindow
          key={id}
          id={id}
          win={state.windows[id]}
          focused={state.focused === id}
        >
          {contents[id]}
        </AppWindow>
      ))}
    </main>
  );
}
