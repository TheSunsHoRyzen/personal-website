"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isTabActive, tabs } from "./tabs";

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none]"
    >
      {tabs.map(({ href, label }) => {
        const active = isTabActive(href, pathname);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`rounded-control px-2.5 py-0.5 text-xs whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
              active
                ? "bg-tab-active text-fg"
                : "text-fg-muted hover:bg-tab-hover hover:text-fg"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
