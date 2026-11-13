"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type { SiteLink } from "@/content/site";
import { Clock } from "./Clock";
import { getMenus } from "./menus";
import { useWindows } from "./WindowManager";
import { windowDefs, type WindowId } from "./windows";

const itemClass =
  "block w-full rounded-control px-2.5 py-0.5 max-sm:py-2.5 text-left text-xs whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-accent";

/** `name` becomes the page's single (visually hidden) h1, inside the banner landmark. */
export function MenuBar({ links, name }: { links: SiteLink[]; name: string }) {
  const { state, dispatch } = useWindows();
  const menus = getMenus(links);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  // Set by keyboard handlers: after the dropdown renders, focus its first/last item.
  const pendingFocus = useRef<"first" | "last" | null>(null);

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

  // After a keyboard-driven open, move focus into the freshly rendered dropdown.
  useEffect(() => {
    const which = pendingFocus.current;
    if (!openMenu || !which) return;
    pendingFocus.current = null;
    const items = navRef.current?.querySelectorAll<HTMLElement>(
      `[role=menu][data-menu="${openMenu}"] [role=menuitem]`,
    );
    if (items?.length) items[which === "first" ? 0 : items.length - 1].focus();
  }, [openMenu]);

  const openWindow = (id: WindowId) => {
    dispatch({ type: "open", id });
    setOpenMenu(null);
  };

  const menuButtons = () =>
    Array.from(navRef.current?.querySelectorAll<HTMLElement>("[data-menu-button]") ?? []);

  /** Open `label`'s dropdown from the keyboard and focus an item in it. */
  const openFromKeyboard = (label: string, which: "first" | "last") => {
    if (openMenu === label) {
      const items = navRef.current?.querySelectorAll<HTMLElement>(
        `[role=menu][data-menu="${label}"] [role=menuitem]`,
      );
      if (items?.length) items[which === "first" ? 0 : items.length - 1].focus();
    } else {
      pendingFocus.current = which;
      setOpenMenu(label);
    }
  };

  /** Move to the neighboring top-level menu (dir = ±1), mirroring hover-switch behavior. */
  const stepMenu = (fromLabel: string, dir: 1 | -1, keepOpen: boolean) => {
    const buttons = menuButtons();
    const i = buttons.findIndex((b) => b.dataset.menuButton === fromLabel);
    const next = buttons[(i + dir + buttons.length) % buttons.length];
    const nextLabel = next.dataset.menuButton!;
    const nextHasItems = menus.some((m) => m.label === nextLabel && "items" in m);
    if (keepOpen && nextHasItems) openFromKeyboard(nextLabel, "first");
    else {
      if (keepOpen) setOpenMenu(null);
      next.focus();
    }
  };

  // Keyboard model (WAI-ARIA menubar): Left/Right between menus; Down/Up open a menu or
  // move within it; Home/End jump; Escape closes and returns focus to the menu button.
  const onKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const menuEl = target.closest<HTMLElement>("[role=menu]");

    if (menuEl) {
      const items = Array.from(menuEl.querySelectorAll<HTMLElement>("[role=menuitem]"));
      const i = items.indexOf(target);
      const owner = menuEl.dataset.menu!;
      const go = (n: number) => items[(n + items.length) % items.length].focus();
      switch (e.key) {
        case "ArrowDown": e.preventDefault(); go(i + 1); break;
        case "ArrowUp": e.preventDefault(); go(i - 1); break;
        case "Home": e.preventDefault(); go(0); break;
        case "End": e.preventDefault(); go(items.length - 1); break;
        case "ArrowRight": e.preventDefault(); stepMenu(owner, 1, true); break;
        case "ArrowLeft": e.preventDefault(); stepMenu(owner, -1, true); break;
        case "Tab": setOpenMenu(null); break;
        case "Escape":
          e.preventDefault();
          setOpenMenu(null);
          menuButtons().find((b) => b.dataset.menuButton === owner)?.focus();
          break;
      }
      return;
    }

    const label = target.dataset.menuButton;
    if (!label) return;
    const hasItems = menus.some((m) => m.label === label && "items" in m);
    switch (e.key) {
      case "ArrowRight": e.preventDefault(); stepMenu(label, 1, openMenu !== null); break;
      case "ArrowLeft": e.preventDefault(); stepMenu(label, -1, openMenu !== null); break;
      case "ArrowDown": if (hasItems) { e.preventDefault(); openFromKeyboard(label, "first"); } break;
      case "ArrowUp": if (hasItems) { e.preventDefault(); openFromKeyboard(label, "last"); } break;
    }
  };

  const focusedName = state.focused ? windowDefs[state.focused].menuName : "Desktop";

  return (
    <header className="menubar sticky top-0 z-20 flex items-center gap-4 px-4 text-xs text-fg max-sm:gap-2 max-sm:px-3">
      <h1 className="sr-only">{name}</h1>
      <span className="shrink-0 font-semibold">{focusedName}</span>

      <nav
        ref={navRef}
        aria-label="Primary"
        onKeyDown={onKeyDown}
        className="flex min-w-0 flex-1 items-center gap-1"
      >
        {menus.map((menu) => {
          const hasItems = "items" in menu;
          const isOpen = openMenu === menu.label;
          return (
            <div key={menu.label} className="relative">
              <button
                type="button"
                data-menu-button={menu.label}
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
                  data-menu={menu.label}
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
                        <span className="sr-only"> (opens in a new tab)</span>
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
