export const themes = [{ id: "macos-glass", label: "macOS Liquid Glass" }] as const;

export type ThemeId = (typeof themes)[number]["id"];

export const DEFAULT_THEME_ID: ThemeId = "macos-glass";

export const THEME_STORAGE_KEY = "theme";

/**
 * Inline script that applies a saved theme before first paint (no flash).
 * Only ids present in the registry are accepted.
 */
export const themeInitScript = `(function(){try{var ids=${JSON.stringify(
  themes.map((t) => t.id),
)};var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t&&ids.indexOf(t)!==-1)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
