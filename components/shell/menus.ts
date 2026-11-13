import { site } from "@/content/site";
import type { WindowId } from "./windows";

export type MenuItem = { label: string } & (
  | { open: WindowId }
  | { href: string }
);

export type Menu = { label: string } & (
  | { open: WindowId }
  | { items: MenuItem[] }
);

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
    items: site.links,
  },
];
