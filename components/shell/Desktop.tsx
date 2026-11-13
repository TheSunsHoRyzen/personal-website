import type { ReactNode } from "react";
import { MenuBar } from "./MenuBar";

export function Desktop({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <div className="wallpaper fixed inset-0 -z-10" aria-hidden="true" />
      <MenuBar />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
