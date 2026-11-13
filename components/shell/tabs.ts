export const tabs = [
  { href: "/", label: "Terminal" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/links", label: "Links" },
  { href: "/writings", label: "Writings" },
] as const;

export type Tab = (typeof tabs)[number];

export function isTabActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
