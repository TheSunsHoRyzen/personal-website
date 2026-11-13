import type { ReactNode } from "react";

type WindowProps = {
  title: string;
  children: ReactNode;
};

// Traffic lights are decorative for now (hidden from assistive tech).
const trafficLights = [
  "bg-traffic-close",
  "bg-traffic-minimize",
  "bg-traffic-maximize",
];

export function Window({ title, children }: WindowProps) {
  return (
    <section className="glass rounded-window flex min-h-0 w-full max-w-4xl flex-1 flex-col overflow-hidden">
      <div className="relative flex h-11 shrink-0 items-center border-b border-glass-border px-4">
        <div className="flex gap-2" aria-hidden="true">
          {trafficLights.map((color) => (
            <span key={color} className={`size-3 rounded-full ${color}`} />
          ))}
        </div>
        <p className="pointer-events-none absolute inset-x-0 text-center font-mono text-xs text-fg-muted">
          {title}
        </p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-auto">{children}</div>
    </section>
  );
}
