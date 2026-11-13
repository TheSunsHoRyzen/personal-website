// PLACEHOLDER CONTENT: replace with real details. Everything the site displays comes from here.

export type Project = {
  title: string;
  blurb: string;
  href?: string;
  tags: string[];
};

export type Experience = {
  role: string;
  org: string;
  period: string;
  location?: string;
  stack?: string[];
  highlights: string[];
};

export type Writing = {
  title: string;
  date: string; // ISO date
  summary: string;
  href?: string;
};

export type SiteLink = { label: string; href: string };

export const site = {
  name: "Hasan Ali",
  headline: "Software Engineer (placeholder)",
  location: "Somewhere, Earth (placeholder)",

  links: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ] satisfies SiteLink[],

  summary:
    "Placeholder summary. A couple of sentences about what you do, what you care about, and what you are working on right now.",

  experience: [
    {
      role: "Role Title",
      org: "Company Name",
      period: "2023 – Present",
      location: "City, ST",
      stack: ["TypeScript", "React", "Node.js"],
      highlights: [
        "Placeholder highlight describing something you built or improved.",
        "Another placeholder highlight, ideally with a concrete result.",
      ],
    },
  ] satisfies Experience[],

  education: [
    { school: "University Name", detail: "B.S. in Computer Science (placeholder)" },
  ],

  projects: [
    {
      title: "Project One",
      blurb: "Placeholder description of what this project does and why it exists.",
      href: "https://github.com/",
      tags: ["Next.js", "TypeScript"],
    },
    {
      title: "Project Two",
      blurb: "Placeholder description of a second project.",
      tags: ["React"],
    },
  ] satisfies Project[],

  writings: [] as Writing[],
};
