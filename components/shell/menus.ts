import type { SiteLink } from "@/content/site"; // type-only: erased, adds nothing to the client bundle
import type { WindowId } from "./windows";

export type MenuItem = { label: string } & (
  | { open: WindowId }
  | { href: string }
);

export type Menu = { label: string } & (
  | { open: WindowId }
  | { items: MenuItem[] }
);

/** Links come in as data (from the server page) so this file doesn't pull site content into client JS. */
export function getMenus(links: SiteLink[]): Menu[] {
  return [
    {
      label: "Projects",
      items: [
        { label: "Desktop", open: "terminal" },
        { label: "Projects", open: "projects" },
      ],
    },
    { label: "About", open: "about" },
    { label: "Writings", open: "writings" },
    { label: "Links", items: links },
  ];
}
