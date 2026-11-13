import type { ReactNode } from "react";
import { Desktop } from "@/components/shell/Desktop";

function Placeholder({ children }: { children: ReactNode }) {
  return <p className="p-6 text-fg-muted">{children}</p>;
}

export default function Home() {
  return (
    <Desktop
      contents={{
        terminal: <Placeholder>Terminal coming soon.</Placeholder>,
        projects: <Placeholder>Projects coming soon.</Placeholder>,
        about: <Placeholder>About coming soon.</Placeholder>,
        writings: <Placeholder>Writings coming soon.</Placeholder>,
      }}
    />
  );
}
