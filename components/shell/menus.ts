import type { WindowId } from "./windows";

export type MenuItem = { label: string } & (
  | { open: WindowId }
  | { href: string }
);

export type Menu = { label: string } & (
  | { open: WindowId }
  | { items: MenuItem[] }
);

// Placeholder URLs: replace with real ones (they move to content/site.ts later).
export const menus: Menu[] = [
  {
    label: "Projects",
    items: [
      { label: "Desktop", open: "terminal" },
      { label: "Projects", open: "projects" },
    ],
  },
  { label: "About", open: "about" },
  { label: "Writings", open: "writings" },
  {
    label: "Links",
    items: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
    ],
  },
];
