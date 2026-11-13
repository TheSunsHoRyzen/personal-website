import { site } from "@/content/site";
import {
  BulletList,
  ContentPage,
  Entry,
  ExtLink,
  Meta,
  P,
  PageTitle,
  Section,
} from "@/components/content/Prose";

export function AboutContent() {
  return (
    <ContentPage>
      <PageTitle>{site.name}</PageTitle>
      <Meta>{site.headline}</Meta>
      <Meta>{site.location}</Meta>
      <p className="mt-3 flex flex-wrap gap-4">
        {site.links.map((link) => (
          <ExtLink key={link.label} href={link.href}>
            {link.label}
          </ExtLink>
        ))}
      </p>

      <Section title="Summary">
        <P>{site.summary}</P>
      </Section>

      <Section title="Experience">
        {site.experience.map((job) => (
          <Entry
            key={`${job.org}-${job.role}`}
            as="h4"
            title={`${job.role} — ${job.org}`}
            meta={[job.period, job.location].filter(Boolean).join(" · ")}
          >
            {job.stack ? (
              <p className="text-fg-muted">Stack: {job.stack.join(" · ")}</p>
            ) : null}
            <BulletList items={job.highlights} />
          </Entry>
        ))}
      </Section>

      <Section title="Education">
        {site.education.map((e) => (
          <Entry key={e.school} as="h4" title={e.school} meta={e.detail} />
        ))}
      </Section>
    </ContentPage>
  );
}
