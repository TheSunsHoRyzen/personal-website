"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { windowDefs, windowIds, type WindowId } from "./windows";

export type WinState = {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
  z: number;
};

type State = {
  windows: Record<WindowId, WinState>;
  focused: WindowId | null;
  nextZ: number;
};

export type Action =
  | { type: "open"; id: WindowId } // open (or restore) and bring to front
  | { type: "focus"; id: WindowId }
  | { type: "close"; id: WindowId }
  | { type: "minimize"; id: WindowId }
  | { type: "toggleMaximize"; id: WindowId }
  | { type: "move"; id: WindowId; x: number; y: number };

function topmost(windows: Record<WindowId, WinState>): WindowId | null {
  let best: WindowId | null = null;
  for (const id of windowIds) {
    const w = windows[id];
    if (!w.open || w.minimized) continue;
    if (best === null || w.z > windows[best].z) best = id;
  }
  return best;
}

function reducer(state: State, action: Action): State {
  const { id } = action;
  const w = state.windows[id];

  switch (action.type) {
    case "open":
    case "focus":
      return {
        windows: {
          ...state.windows,
          [id]: { ...w, open: true, minimized: false, z: state.nextZ },
        },
        focused: id,
        nextZ: state.nextZ + 1,
      };
    case "close":
    case "minimize": {
      const next =
        action.type === "close"
          ? { ...w, open: false, minimized: false, maximized: false }
          : { ...w, minimized: true };
      const windows = { ...state.windows, [id]: next };
      return { ...state, windows, focused: topmost(windows) };
    }
    case "toggleMaximize":
      return {
        windows: {
          ...state.windows,
          [id]: { ...w, maximized: !w.maximized, z: state.nextZ },
        },
        focused: id,
        nextZ: state.nextZ + 1,
      };
    case "move":
      return {
        ...state,
        windows: { ...state.windows, [id]: { ...w, x: action.x, y: action.y } },
      };
  }
}

function init(): State {
  const windows = Object.fromEntries(
    windowIds.map((id, i) => [
      id,
      {
        open: windowDefs[id].openAtStart,
        minimized: false,
        maximized: false,
        x: windowDefs[id].x,
        y: windowDefs[id].y,
        z: i + 1,
      } satisfies WinState,
    ]),
  ) as Record<WindowId, WinState>;

  return { windows, focused: topmost(windows), nextZ: windowIds.length + 1 };
}

const WindowsContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  return (
    <WindowsContext.Provider value={{ state, dispatch }}>
      {children}
    </WindowsContext.Provider>
  );
}

export function useWindows() {
  const ctx = useContext(WindowsContext);
  if (!ctx) throw new Error("useWindows must be used inside <WindowManagerProvider>");
  return ctx;
}
