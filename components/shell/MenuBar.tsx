"use client";

import { useEffect, useRef, useState } from "react";
import { Clock } from "./Clock";
import { menus } from "./menus";
import { useWindows } from "./WindowManager";
import { windowDefs, type WindowId } from "./windows";

const itemClass =
  "block w-full rounded-control px-2.5 py-0.5 text-left text-xs whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-accent";

export function MenuBar() {
  const { state, dispatch } = useWindows();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close an open dropdown on outside press or Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: globalThis.PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const openWindow = (id: WindowId) => {
    dispatch({ type: "open", id });
    setOpenMenu(null);
  };

  const focusedName = state.focused ? windowDefs[state.focused].menuName : "Desktop";

  return (
    <header className="menubar sticky top-0 z-20 flex items-center gap-4 px-4 text-xs text-fg">
      <span className="shrink-0 font-semibold">{focusedName}</span>

      <nav ref={navRef} aria-label="Primary" className="flex min-w-0 flex-1 items-center gap-1">
        {menus.map((menu) => {
          const hasItems = "items" in menu;
          const isOpen = openMenu === menu.label;
          return (
            <div key={menu.label} className="relative">
              <button
                type="button"
                aria-haspopup={hasItems ? "menu" : undefined}
                aria-expanded={hasItems ? isOpen : undefined}
                onClick={() =>
                  hasItems
                    ? setOpenMenu(isOpen ? null : menu.label)
                    : openWindow(menu.open)
                }
                // Like a desktop menu bar: while one menu is open, hovering another switches to it.
                onPointerEnter={() => {
                  if (openMenu !== null) setOpenMenu(hasItems ? menu.label : null);
                }}
                className={`${itemClass} ${
                  isOpen ? "bg-tab-active text-fg" : "text-fg-muted hover:bg-tab-hover hover:text-fg"
                }`}
              >
                {menu.label}
              </button>

              {hasItems && isOpen && (
                <div
                  role="menu"
                  aria-label={menu.label}
                  className="glass rounded-control absolute top-full left-0 mt-1 min-w-40 p-1"
                >
                  {menu.items.map((item) =>
                    "href" in item ? (
                      <a
                        key={item.label}
                        role="menuitem"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpenMenu(null)}
                        className={`${itemClass} text-fg hover:bg-tab-hover`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <button
                        key={item.label}
                        type="button"
                        role="menuitem"
                        onClick={() => openWindow(item.open)}
                        className={`${itemClass} text-fg hover:bg-tab-hover`}
                      >
                        {item.label}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="hidden shrink-0 sm:block">
        <Clock />
      </div>
    </header>
  );
}
