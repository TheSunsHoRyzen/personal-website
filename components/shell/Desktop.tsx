import type { ReactNode } from "react";
import { MenuBar } from "./MenuBar";
import { WindowLayer } from "./WindowLayer";
import { WindowManagerProvider } from "./WindowManager";
import type { WindowId } from "./windows";

/** Server component: wallpaper plus the window manager. Window contents are passed in from the page. */
export function Desktop({ contents }: { contents: Record<WindowId, ReactNode> }) {
  return (
    <div className="h-dvh overflow-hidden">
      <div className="wallpaper fixed inset-0 -z-10" aria-hidden="true" />
      <WindowManagerProvider>
        <MenuBar />
        <WindowLayer contents={contents} />
      </WindowManagerProvider>
    </div>
  );
}
