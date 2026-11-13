import { Clock } from "./Clock";

// Decorative only: these labels are not interactive, so they're hidden from assistive tech.
const menuLabels = ["File", "Edit", "View", "Go", "Window", "Help"];

export function MenuBar() {
  return (
    <header className="menubar sticky top-0 z-20 flex items-center justify-between px-4 text-xs text-fg">
      <div className="flex items-center gap-4" aria-hidden="true">
        <span className="font-semibold">Hasan Ali</span>
        <span className="hidden items-center gap-4 text-fg-muted sm:flex">
          {menuLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </span>
      </div>
      <Clock />
    </header>
  );
}
