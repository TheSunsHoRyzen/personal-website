"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type SubmitEvent,
} from "react";
import { useWindows } from "@/components/shell/WindowManager";
import { runCommand } from "./commands";

export const PROMPT = "guest@hasan:~$";

type Entry = {
  id: number;
  /** The typed command; null for output with no prompt line (the welcome shown on load). */
  command: string | null;
  output?: ReactNode;
  exitCode: number;
};

/** What the terminal shows on first load: `welcome`'s output with no prompt line above it. */
function initialEntries(): Entry[] {
  return [{ id: 0, command: null, exitCode: 0, output: runCommand("welcome").output }];
}

const isWideScreen = () => window.matchMedia("(min-width: 640px)").matches;

export function Terminal() {
  const { state } = useWindows();
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [input, setInput] = useState("");
  const nextId = useRef(1);
  // Auto-scroll only follows commands the user submits, so the welcome banner is visible on load.
  const followOutput = useRef(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the prompt whenever the terminal window becomes the focused one.
  // Skipped on narrow screens so the on-screen keyboard doesn't pop up uninvited.
  const terminalFocused = state.focused === "terminal";
  useEffect(() => {
    // preventScroll: focusing the off-screen prompt must not scroll the banner out of view.
    if (terminalFocused && isWideScreen()) inputRef.current?.focus({ preventScroll: true });
  }, [terminalFocused]);

  // Keep the newest output in view after the user runs a command.
  useEffect(() => {
    const el = scrollerRef.current;
    if (el && followOutput.current) el.scrollTop = el.scrollHeight;
  }, [entries]);

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const typed = input.trim();
    setInput("");
    followOutput.current = true;

    if (typed === "") {
      setEntries((prev) => [...prev, { id: nextId.current++, command: "", exitCode: 0 }]);
      return;
    }

    const result = runCommand(typed);
    if (result.clear) {
      setEntries([]);
      return;
    }
    setEntries((prev) => [
      ...prev,
      {
        id: nextId.current++,
        command: typed,
        output: result.output,
        exitCode: result.exitCode ?? 0,
      },
    ]);
  }

  // Clicking anywhere in the terminal focuses the prompt, unless the user is selecting text.
  function onScrollerClick(e: MouseEvent) {
    if (e.target instanceof HTMLElement && e.target.closest("a, button")) return;
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  }

  return (
    <div
      ref={scrollerRef}
      onClick={onScrollerClick}
      className="min-h-0 flex-1 cursor-text overflow-auto p-4 font-mono text-[13px] leading-relaxed"
    >
      <div role="log" aria-live="polite" aria-label="Terminal output" className="space-y-2">
        {entries.map((entry) => (
          <div key={entry.id}>
            {entry.command !== null && (
              <p className="wrap-break-word whitespace-pre-wrap">
                <span className="text-accent">{PROMPT}</span> {entry.command}
              </p>
            )}
            {entry.output ? <div className="mt-1 wrap-break-word">{entry.output}</div> : null}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
        <label htmlFor="terminal-input" className="shrink-0 text-accent">
          {PROMPT}
        </label>
        <input
          ref={inputRef}
          id="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-fg caret-accent outline-none"
        />
      </form>
    </div>
  );
}
