import type { ReactNode } from "react";

export type CommandResult = {
  output?: ReactNode;
  /** Shell-style exit code. 0 (default) = success. */
  exitCode?: number;
  /** Wipe the scrollback (including this command's own line). */
  clear?: boolean;
};

const groups = ["Navigation", "Portfolio", "Session", "System", "Fun"] as const;
export type CommandGroup = (typeof groups)[number];

export type Command = {
  name: string;
  group: CommandGroup;
  description: string;
  run: (args: string[]) => CommandResult;
};

function Help() {
  return (
    <div className="space-y-3">
      <p>Available commands:</p>
      {groups.map((group) => {
        const inGroup = commands
          .filter((c) => c.group === group)
          .sort((a, b) => a.name.localeCompare(b.name));
        if (inGroup.length === 0) return null;
        return (
          <div key={group}>
            <p className="text-fg-muted">[{group}]</p>
            <dl className="mt-1 grid grid-cols-[7rem_1fr] gap-x-3 gap-y-0.5 pl-2">
              {inGroup.map((c) => (
                <div key={c.name} className="contents">
                  <dt className="text-accent">{c.name}</dt>
                  <dd className="text-fg-muted">{c.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}
    </div>
  );
}

/** The registry. `help` is generated from this list, so new commands show up automatically. */
export const commands: Command[] = [
  {
    name: "clear",
    group: "Session",
    description: "Clear terminal scrollback",
    run: () => ({ clear: true }),
  },
  {
    name: "help",
    group: "Session",
    description: "Print command catalog",
    run: () => ({ output: <Help /> }),
  },
];

export function runCommand(input: string): CommandResult {
  const [name, ...args] = input.trim().split(/\s+/);
  const command = commands.find((c) => c.name === name.toLowerCase());

  if (!command) {
    return {
      exitCode: 127,
      output: (
        <p className="text-danger">
          command not found: {name}. Type <span className="text-accent">help</span> for available
          commands.
        </p>
      ),
    };
  }
  return command.run(args);
}
