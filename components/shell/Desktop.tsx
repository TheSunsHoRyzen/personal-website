import type { ReactNode } from "react";
import type { SiteLink } from "@/content/site";
import { DesktopIcons } from "./DesktopIcons";
import { MenuBar } from "./MenuBar";
import { WindowLayer } from "./WindowLayer";
import { WindowManagerProvider } from "./WindowManager";
import type { WindowId } from "./windows";

/**
 * Server component: wallpaper plus the window manager. Window contents, menu links, and the
 * site name are passed in from the page.
 */
export function Desktop({
  contents,
  links,
  name,
}: {
  contents: Record<WindowId, ReactNode>;
  links: SiteLink[];
  name: string;
}) {
  return (
    <div className="h-dvh overflow-hidden">
      <div className="wallpaper fixed inset-0 -z-10" aria-hidden="true" />
      <WindowManagerProvider>
        <MenuBar links={links} name={name} />
        <DesktopIcons />
        <WindowLayer contents={contents} />
      </WindowManagerProvider>
    </div>
  );
}
