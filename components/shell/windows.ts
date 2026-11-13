export const windowIds = ["terminal", "projects", "about", "writings"] as const;

export type WindowId = (typeof windowIds)[number];

export type WindowDef = {
  /** Text in the window's title bar. */
  title: string;
  /** Name shown in bold at the left of the menu bar while this window is focused. */
  menuName: string;
  /** Initial position (px, relative to the area under the menu bar) and size. Positions start below the desktop icon row (~130px). */
  x: number;
  y: number;
  w: number;
  h: number;
  openAtStart: boolean;
};

export const windowDefs: Record<WindowId, WindowDef> = {
  terminal: {
    title: "guest@hasan: ~",
    menuName: "Terminal",
    x: 40,
    y: 130,
    w: 820,
    h: 600,
    openAtStart: true,
  },
  projects: {
    title: "Projects",
    menuName: "Projects",
    x: 480,
    y: 130,
    w: 560,
    h: 520,
    openAtStart: false,
  },
  about: {
    title: "About",
    menuName: "About",
    x: 220,
    y: 150,
    w: 560,
    h: 540,
    openAtStart: false,
  },
  writings: {
    title: "Writings",
    menuName: "Writings",
    x: 320,
    y: 170,
    w: 520,
    h: 440,
    openAtStart: false,
  },
};
