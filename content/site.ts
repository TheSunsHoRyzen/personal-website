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
  headline: "Aspiring Software Engineer",
  location: "Piscataway, New Jersey",

  links: [
    { label: "GitHub", href: "https://github.com/TheSunsHoRyzen" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hasan-ali-618021292/",
    },
  ] satisfies SiteLink[],

  summary:
    "Aspiring Software Engineer. Cares about desiging highly effective systems, AI engineering, and anything in between.",

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
    {
      school: "University Name",
      detail: "B.S. in Computer Science (placeholder)",
    },
  ],

  projects: [
    {
      title: "Project One",
      blurb:
        "Placeholder description of what this project does and why it exists.",
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
