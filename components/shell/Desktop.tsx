import type { ReactNode } from "react";
import { MenuBar } from "./MenuBar";
import { Window } from "./Window";

export function Desktop({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <div className="wallpaper fixed inset-0 -z-10" aria-hidden="true" />
      <MenuBar />
      <main className="flex flex-1 items-stretch justify-center p-3 sm:p-8">
        <Window title="guest@hasan: ~">{children}</Window>
      </main>
    </div>
  );
}
