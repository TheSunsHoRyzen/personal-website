import type { ReactNode } from "react";
import type { SiteLink } from "@/content/site";
import { DesktopIcons } from "./DesktopIcons";
import { MenuBar } from "./MenuBar";
import { WindowLayer } from "./WindowLayer";
import { WindowManagerProvider } from "./WindowManager";
import type { WindowId } from "./windows";

/** Server component: wallpaper plus the window manager. Window contents and menu links are passed in from the page. */
export function Desktop({
  contents,
  links,
}: {
  contents: Record<WindowId, ReactNode>;
  links: SiteLink[];
}) {
  return (
    <div className="h-dvh overflow-hidden">
      <div className="wallpaper fixed inset-0 -z-10" aria-hidden="true" />
      <WindowManagerProvider>
        <MenuBar links={links} />
        <DesktopIcons />
        <WindowLayer contents={contents} />
      </WindowManagerProvider>
    </div>
  );
}
