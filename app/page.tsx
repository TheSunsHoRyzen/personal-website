import { Desktop } from "@/components/shell/Desktop";
import { Terminal } from "@/components/terminal/Terminal";
import { AboutContent } from "@/components/windows/AboutContent";
import { ProjectsContent } from "@/components/windows/ProjectsContent";
import { WritingsContent } from "@/components/windows/WritingsContent";
import { site } from "@/content/site";

export default function Home() {
  return (
    <Desktop
      name={site.name}
      links={site.links}
      contents={{
        terminal: <Terminal />,
        projects: <ProjectsContent />,
        about: <AboutContent />,
        writings: <WritingsContent />,
      }}
    />
  );
}
