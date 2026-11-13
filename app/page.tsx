import type { ReactNode } from "react";
import { Desktop } from "@/components/shell/Desktop";
import { AboutContent } from "@/components/windows/AboutContent";
import { ProjectsContent } from "@/components/windows/ProjectsContent";
import { WritingsContent } from "@/components/windows/WritingsContent";

function Placeholder({ children }: { children: ReactNode }) {
  return <p className="p-6 text-fg-muted">{children}</p>;
}

export default function Home() {
  return (
    <Desktop
      contents={{
        terminal: <Placeholder>Terminal coming soon.</Placeholder>,
        projects: <ProjectsContent />,
        about: <AboutContent />,
        writings: <WritingsContent />,
      }}
    />
  );
}
