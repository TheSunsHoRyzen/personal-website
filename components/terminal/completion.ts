export type Completion =
  | { kind: "none" }
  /** Replace the input with `value`. */
  | { kind: "complete"; value: string }
  /** Several commands match and no further prefix is shared: show them. */
  | { kind: "list"; matches: string[] };

function commonPrefix(words: string[]): string {
  let prefix = words[0];
  for (const w of words.slice(1)) {
    while (!w.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

/**
 * Shell-style Tab completion of the command name (first word only).
 *  - one match      -> complete it and add a space
 *  - several        -> extend to their common prefix, or list them if already at it
 *  - none / args    -> nothing
 */
export function complete(input: string, names: string[]): Completion {
  const typed = input.trimStart();
  if (/\s/.test(typed)) return { kind: "none" }; // already past the command name

  const prefix = typed.toLowerCase();
  const matches = names.filter((n) => n.startsWith(prefix)).sort();

  if (matches.length === 0) return { kind: "none" };
  if (matches.length === 1) return { kind: "complete", value: `${matches[0]} ` };

  const common = commonPrefix(matches);
  if (common.length > prefix.length) return { kind: "complete", value: common };
  return { kind: "list", matches };
}
