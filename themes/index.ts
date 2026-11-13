export const themes = [{ id: "macos-glass", label: "macOS Liquid Glass" }] as const;

export type ThemeId = (typeof themes)[number]["id"];

export const DEFAULT_THEME_ID: ThemeId = "macos-glass";

export const THEME_STORAGE_KEY = "theme";

export function isThemeId(value: string): value is ThemeId {
  return themes.some((t) => t.id === value);
}

/** The theme currently on <html> (client only). */
export function currentThemeId(): ThemeId {
  const value = document.documentElement.getAttribute("data-theme") ?? "";
  return isThemeId(value) ? value : DEFAULT_THEME_ID;
}

/** Switch themes and remember the choice (client only). The init script restores it on next load. */
export function applyTheme(id: ThemeId) {
  document.documentElement.setAttribute("data-theme", id);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

/**
 * Inline script that applies a saved theme before first paint (no flash).
 * Only ids present in the registry are accepted.
 */
export const themeInitScript = `(function(){try{var ids=${JSON.stringify(
  themes.map((t) => t.id),
)};var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t&&ids.indexOf(t)!==-1)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
