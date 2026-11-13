import type { ReactNode } from "react";
import { ExtLink } from "@/components/content/Prose";
import { site } from "@/content/site";
import { robotArt } from "./robot";

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

/** Inline command name, highlighted like the prompt. */
function Cmd({ children }: { children: ReactNode }) {
  return <span className="text-accent">{children}</span>;
}

/** Grouped, alphabetized list of every registered command. */
function CommandList() {
  return (
    <div className="space-y-3">
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

function Help() {
  return (
    <div className="space-y-3">
      <p>Available commands:</p>
      <CommandList />
    </div>
  );
}

function Welcome() {
  return (
    <div className="space-y-3">
      <pre
        role="img"
        aria-label="ASCII art of a friendly robot"
        className="overflow-x-auto leading-tight text-accent"
      >
        {robotArt}
      </pre>
      <p>
        Welcome. Type <Cmd>help</Cmd> for available commands.
      </p>
      <p>
        Available commands (also try <Cmd>help</Cmd>):
      </p>
      <CommandList />
    </div>
  );
}

function About() {
  return (
    <div className="space-y-2">
      <p className="font-semibold">{site.name}</p>
      <p className="text-fg-muted">
        {site.headline} · {site.location}
      </p>
      <p>{site.summary}</p>
      <p className="flex flex-wrap gap-4">
        {site.links.map((link) => (
          <ExtLink key={link.label} href={link.href}>
            {link.label}
          </ExtLink>
        ))}
      </p>
    </div>
  );
}

function Stack() {
  return (
    <div className="space-y-2">
      <p>This site is built with:</p>
      <dl className="grid grid-cols-[6rem_1fr] gap-x-3 gap-y-0.5 pl-2">
        {site.stack.map((item) => (
          <div key={item.label} className="contents">
            <dt className="text-accent">{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** The registry. `help` and `welcome` list this, so new commands show up automatically. */
export const commands: Command[] = [
  {
    name: "about",
    group: "Navigation",
    description: "About me",
    run: () => ({ output: <About /> }),
  },
  {
    name: "stack",
    group: "Portfolio",
    description: "Show this site's tech stack",
    run: () => ({ output: <Stack /> }),
  },
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
  {
    name: "welcome",
    group: "Session",
    description: "Reprint intro banner and MOTD",
    run: () => ({ output: <Welcome /> }),
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
          command not found: {name}. Type <Cmd>help</Cmd> for available commands.
        </p>
      ),
    };
  }
  return command.run(args);
}
