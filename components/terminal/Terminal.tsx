"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type SubmitEvent,
} from "react";
import { useWindows } from "@/components/shell/WindowManager";
import { commandNames, runCommand } from "./commands";
import { complete } from "./completion";

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
  /** Exit code of the last command, like `$?` in a shell. */
  const [lastExit, setLastExit] = useState(0);
  const nextId = useRef(1);
  // Auto-scroll only follows commands the user submits, so the welcome banner is visible on load.
  const followOutput = useRef(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Command history (Up/Down). `cursor` is an index into `history`, or null while typing fresh text.
  const history = useRef<string[]>([]);
  const cursor = useRef<number | null>(null);
  const draft = useRef("");
  // Where to put the caret after a programmatic paste.
  const pendingCaret = useRef<number | null>(null);

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

  useLayoutEffect(() => {
    if (pendingCaret.current !== null) {
      inputRef.current?.setSelectionRange(pendingCaret.current, pendingCaret.current);
      pendingCaret.current = null;
    }
  }, [input]);

  function addEntry(entry: Omit<Entry, "id">) {
    followOutput.current = true;
    setEntries((prev) => [...prev, { id: nextId.current++, ...entry }]);
  }

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const typed = input.trim();
    setInput("");
    cursor.current = null;

    // A bare Enter just starts a new prompt line and leaves `$?` alone, like a shell.
    if (typed === "") {
      addEntry({ command: "", exitCode: 0 });
      return;
    }

    if (history.current.at(-1) !== typed) history.current.push(typed);

    const result = runCommand(typed);
    setLastExit(result.exitCode ?? 0);
    if (result.clear) {
      setEntries([]);
      return;
    }
    addEntry({ command: typed, output: result.output, exitCode: result.exitCode ?? 0 });
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const plain = !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey;

    // Ctrl+L: clear the screen (history and `$?` untouched).
    if (e.ctrlKey && !e.altKey && !e.metaKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setEntries([]);
      return;
    }

    if (e.key === "ArrowUp" && plain) {
      e.preventDefault();
      if (history.current.length === 0) return;
      if (cursor.current === null) {
        draft.current = input;
        cursor.current = history.current.length - 1;
      } else {
        cursor.current = Math.max(0, cursor.current - 1);
      }
      setInput(history.current[cursor.current]);
      return;
    }

    if (e.key === "ArrowDown" && plain) {
      e.preventDefault();
      if (cursor.current === null) return;
      if (cursor.current < history.current.length - 1) {
        cursor.current += 1;
        setInput(history.current[cursor.current]);
      } else {
        cursor.current = null;
        setInput(draft.current);
      }
      return;
    }

    // Tab completes the command name. With an empty prompt Tab is left alone so keyboard users
    // can still move focus out of the terminal; Shift+Tab always moves focus.
    if (e.key === "Tab" && plain && input.trim() !== "") {
      e.preventDefault();
      const result = complete(input, commandNames);
      if (result.kind === "complete") setInput(result.value);
      if (result.kind === "list") {
        addEntry({
          command: input,
          exitCode: 0,
          output: (
            <p className="flex flex-wrap gap-x-4">
              {result.matches.map((name) => (
                <span key={name} className="text-accent">
                  {name}
                </span>
              ))}
            </p>
          ),
        });
      }
    }
  }

  // Pasting uses only the first line, so a multi-line paste can't run several commands at once.
  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text");
    if (!/[\r\n]/.test(text)) return; // single line: let the browser handle it normally
    e.preventDefault();
    const firstLine = text.split(/\r?\n/)[0];
    const el = e.currentTarget;
    const start = el.selectionStart ?? input.length;
    const end = el.selectionEnd ?? input.length;
    pendingCaret.current = start + firstLine.length;
    setInput(input.slice(0, start) + firstLine + input.slice(end));
  }

  // Clicking anywhere in the terminal focuses the prompt, unless the user is selecting text.
  function onScrollerClick(e: MouseEvent) {
    if (e.target instanceof HTMLElement && e.target.closest("a, button")) return;
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
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

        {/* On phones the prompt is 16px: smaller inputs make iOS Safari zoom the page on focus. */}
        <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2 max-sm:text-base">
          <label htmlFor="terminal-input" className="shrink-0 text-accent">
            {PROMPT}
          </label>
          <input
            ref={inputRef}
            id="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-fg caret-accent outline-none"
          />
        </form>
      </div>

      <div
        data-terminal-status
        className="flex shrink-0 items-center gap-2 border-t border-glass-border px-4 py-1.5 font-mono text-[11px] text-fg-muted"
      >
        <span className={lastExit === 0 ? undefined : "text-danger"}>$? = {lastExit}</span>
        <span className="hidden sm:inline">· Tab completes · paste uses first line only</span>
      </div>
    </div>
  );
}
