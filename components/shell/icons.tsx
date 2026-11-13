import type { ReactNode } from "react";
import type { WindowId } from "./windows";

/** Simple line glyphs (24x24, currentColor) for each window. Drawn once, themed by text color. */
const glyphs: Record<WindowId, ReactNode> = {
  terminal: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="m7.5 10 3 2.5-3 2.5M12.5 15.5h4" />
    </>
  ),
  projects: (
    <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2.5h6.5A2.5 2.5 0 0 1 21 10v7.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" />
  ),
  about: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.6-3.6 3.4-5.5 7-5.5s6.4 1.9 7 5.5" />
    </>
  ),
  writings: (
    <>
      <path d="M7 3.5h7.5L19 8v11a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7 3.5z" />
      <path d="M14 3.5V8h5M9 12.5h6M9 16h6" />
    </>
  ),
};

export function WindowIcon({ id }: { id: WindowId }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-7"
    >
      {glyphs[id]}
    </svg>
  );
}
