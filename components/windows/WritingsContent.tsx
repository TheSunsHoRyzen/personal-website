import { site } from "@/content/site";
import { ContentPage, EmptyState, Entry, P, PageTitle } from "@/components/content/Prose";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC", // fixed zone so server and browser render identically
});

export function WritingsContent() {
  return (
    <ContentPage>
      <PageTitle>Writings</PageTitle>
      {site.writings.length === 0 ? (
        <EmptyState>Nothing here yet. Essays are on the way.</EmptyState>
      ) : (
        <div className="mt-5 space-y-5">
          {site.writings.map((w) => (
            <Entry
              key={w.title}
              title={w.title}
              href={w.href}
              meta={dateFormat.format(new Date(w.date))}
            >
              <P>{w.summary}</P>
            </Entry>
          ))}
        </div>
      )}
    </ContentPage>
  );
}
