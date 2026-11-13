"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

// Minute resolution keeps the snapshot stable between ticks (no extra renders).
function getSnapshot() {
  return Math.floor(Date.now() / 60_000);
}

// null on the server: no locale/time mismatch at hydration.
function getServerSnapshot() {
  return null;
}

const formatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function Clock() {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <time
      className="tabular-nums"
      dateTime={minute === null ? undefined : new Date(minute * 60_000).toISOString()}
    >
      {minute === null ? " " : formatter.format(minute * 60_000)}
    </time>
  );
}
