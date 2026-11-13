import { Clock } from "./Clock";
import { TabBar } from "./TabBar";

export function MenuBar() {
  return (
    <header className="menubar sticky top-0 z-20 flex items-center gap-4 px-4 text-xs text-fg">
      <span className="shrink-0 font-semibold">Hasan Ali</span>
      <TabBar />
      <div className="hidden shrink-0 sm:block">
        <Clock />
      </div>
    </header>
  );
}
