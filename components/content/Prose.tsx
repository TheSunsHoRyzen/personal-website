import type { ReactNode } from "react";

/**
 * Shared building blocks for content windows (About, Projects, Writings).
 * Styling uses theme tokens only, so every theme restyles them together.
 */

export function ContentPage({ children }: { children: ReactNode }) {
  return <article className="px-6 py-5 text-sm leading-relaxed text-fg">{children}</article>;
}

/** Window title. h2 because the page's single h1 is the (visually hidden) site name in Desktop. */
export function PageTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>;
}

/** Muted line under a title (role, location, dates). */
export function Meta({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-fg-muted">{children}</p>;
}

/** Major section with a small-caps heading and a rule, like the reference. */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-7">
      <h3 className="mb-3 border-b border-glass-border pb-1 text-[11px] font-semibold tracking-widest text-fg-muted uppercase">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

/**
 * An item inside a window or section: bold title, optional meta line, then body.
 * `as` is the heading level: h3 directly under a window title, h4 inside a Section.
 */
export function Entry({
  title,
  href,
  meta,
  as: Heading = "h3",
  children,
}: {
  title: string;
  href?: string;
  meta?: ReactNode;
  as?: "h3" | "h4";
  children?: ReactNode;
}) {
  return (
    <div>
      <Heading className="font-semibold">
        {href ? <ExtLink href={href}>{title}</ExtLink> : title}
      </Heading>
      {meta ? <p className="text-fg-muted">{meta}</p> : null}
      {children}
    </div>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-1">{children}</p>;
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-1 list-disc space-y-1 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Tags">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-control bg-tab-hover px-2 py-0.5 text-xs text-fg-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline underline-offset-2 hover:brightness-125 focus-visible:outline-2 focus-visible:outline-accent"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-fg-muted">{children}</p>;
}
