import { useRef, type PointerEvent, type RefObject } from "react";

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

/** Keep at least this many px of a dragged window inside the layer so it can't be lost. */
const MIN_VISIBLE_X = 80;
const MIN_VISIBLE_Y = 40;

/**
 * Pointer-drag handlers for a window's title bar.
 * `elRef` is the window element; its offsetParent is the layer it floats in.
 * `canDrag` is checked at pointer-down (maximized or narrow screens opt out).
 * `onMove` receives the new top-left in layer coordinates.
 */
export function useDrag(
  elRef: RefObject<HTMLElement | null>,
  canDrag: () => boolean,
  onMove: (x: number, y: number) => void,
) {
  const grab = useRef<{ offX: number; offY: number } | null>(null);

  return {
    onPointerDown(e: PointerEvent<HTMLElement>) {
      if ((e.target as HTMLElement).closest("button") || !canDrag()) return;
      const el = elRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      grab.current = { offX: e.clientX - rect.left, offY: e.clientY - rect.top };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onPointerMove(e: PointerEvent<HTMLElement>) {
      const g = grab.current;
      const el = elRef.current;
      const layer = el?.offsetParent?.getBoundingClientRect();
      if (!g || !el || !layer) return;
      onMove(
        clamp(e.clientX - g.offX - layer.left, MIN_VISIBLE_X - el.offsetWidth, layer.width - MIN_VISIBLE_X),
        clamp(e.clientY - g.offY - layer.top, 0, layer.height - MIN_VISIBLE_Y),
      );
    },
    onPointerUp() {
      grab.current = null;
    },
    onPointerCancel() {
      grab.current = null;
    },
  };
}
