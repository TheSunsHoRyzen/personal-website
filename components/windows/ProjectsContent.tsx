import { site } from "@/content/site";
import { ContentPage, Entry, P, PageTitle, TagList } from "@/components/content/Prose";

export function ProjectsContent() {
  return (
    <ContentPage>
      <PageTitle>Projects</PageTitle>
      <div className="mt-5 space-y-5">
        {site.projects.map((project) => (
          <Entry key={project.title} title={project.title} href={project.href}>
            <P>{project.blurb}</P>
            <TagList tags={project.tags} />
          </Entry>
        ))}
      </div>
    </ContentPage>
  );
}
