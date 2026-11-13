# Hasan Ali — personal website

A personal site styled as a liquid-glass macOS desktop. It has a menu bar, draggable windows, a dock for
minimized windows, desktop icons, and a working terminal. Built with Next.js (App Router), React,
TypeScript and Tailwind CSS.

## What's in it

- **Menu bar**: the focused window's name, then `Projects` (a dropdown: Desktop / Projects), `About`,
  `Writings` and `Links` (external links). Fully keyboard-navigable (arrow keys, Home/End, Escape).
- **Windows**: drag by the title bar, click to focus, and use the traffic lights to close (red),
  minimize (yellow) or maximize (green). Double-click a title bar to maximize. On phones windows are
  full-screen.
- **Dock**: minimized windows collect as small boxes at the bottom-left; click one to restore it.
- **Terminal**: `about`, `stack`, `theme`, `clear`, `help`, `welcome`. Tab completes command names,
  Up/Down browse history, Ctrl+L clears the screen. Closing the terminal window resets it; minimizing
  keeps its state.
- **Theming**: all colors, blur and radii are CSS variables, so a new theme is one CSS file.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint
```

No environment variables or secrets are needed to build or run the site.

## Editing content

Everything the site says lives in [`content/site.ts`](content/site.ts): your name and headline, links,
summary, experience, education, projects, writings and the "stack" list. The About, Projects and
Writings windows, the menu bar's Links menu, and the terminal's `about` and `stack` commands all read
from it.

## Project structure

```
app/                  layout, the single page, global CSS, icons
components/shell/     desktop shell: menu bar, windows, window manager, dock, desktop icons
components/terminal/  terminal UI, command registry (commands.tsx), Tab completion, robot banner
components/windows/   content shown inside the About / Projects / Writings windows
components/content/   shared text styles for those windows (headings, sections, links, tags)
content/site.ts       all site content
themes/               theme registry and per-theme CSS tokens
```

How it fits together:

- `app/page.tsx` (a server component) builds each window's content and passes it to `<Desktop>`.
- `components/shell/WindowManager.tsx` is the one client-side store for window state (open, minimized,
  maximized, position, stacking order, dock order).
- Adding a terminal command means adding an entry to the `commands` array in
  `components/terminal/commands.tsx`; `help` and `welcome` pick it up automatically.
- Adding a window means adding an id and defaults in `components/shell/windows.ts`, content in
  `app/page.tsx`, and (optionally) a menu entry in `components/shell/menus.ts`.

## Adding a theme

1. Copy `themes/macos-glass.css`, change the `[data-theme="..."]` selector and the token values.
2. Import it in `app/globals.css` and add an entry to `themes` in `themes/index.ts`.
3. Switch with the terminal's `theme <name>` command. The choice is remembered in `localStorage`.

Components only use the tokens (never raw colors), so no component changes are needed. Check text
contrast over the glass whenever you change the palette.

## Deploying

Any Node host works; Vercel is the simplest. The build is fully static and uses no server secrets.
Baseline security headers are set in `next.config.ts`. A Content-Security-Policy is intentionally not
set, because the theme script is inline and a CSP would need per-request nonces.

## Note for contributors and agents

This project uses a recent Next.js with breaking changes. See `AGENTS.md` and read the relevant guide in
`node_modules/next/dist/docs/` before changing framework-level code.
