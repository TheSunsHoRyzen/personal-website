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
    "I’m a Computer Science and Physics student at Rutgers University Honors College (graduating May 2027) interested in distributed systems, cloud infrastructure, and applied machine learning. I enjoy understanding how systems work under the hood, whether that means benchmarking TCP throughput across Linux clusters, building serverless event pipelines, or shipping full-stack tools that solve problems I encounter. Outside of engineering, I lead career-related programming for the Coding and Social Lounge and have taken on leadership roles in several orgs, play jazz saxophone, and spend time on the tennis court.",
  experience: [
    {
      role: "Software Engineering Intern",
      org: "Vanguard",
      period: "May 2026 – Jul 2026",
      location: "Malvern, PA",
      stack: [
        "AWS Lambda",
        "S3",
        "DynamoDB",
        "Angular",
        "API Gateway",
        "Python",
        "Claude Code",
      ],
      highlights: [
        "Architected an event-driven serverless pipeline using Lambda, S3, and DynamoDB to parse client mapping data and automate financial report delivery across email and internal systems to clients within Vanguard, eliminating over 5 hours of weekly manual operations.",
        "Built a full-stack internal portal with Angular, API Gateway, and Lambda so international teams could dynamically update report-to-client metadata without the bottleneck of a single person, saving 10+ hours a month.",
        "Introduced self-correcting agentic testing workflows using Claude Code to generate and verify unit and integration tests across Lambda microservices, cutting debugging cycles by 35%.",
      ],
    },
    {
      role: "Machine Learning Intern",
      org: "Wireless Information Network Laboratory (WINLAB)",
      period: "May 2025 – Aug 2025",
      location: "North Brunswick, NJ",
      stack: ["Python", "NumPy", "TCP Sockets", "Multi-threading", "Linux"],
      highlights: [
        "Implemented and deployed four distributed streaming Principal Component Analysis (PCA) algorithms across a multi-node Linux cluster using a custom multi-threaded TCP framework built from scratch in Python.",
        "Benchmarked convergence speed and network overhead across varying bandwidths, MTU sizes, and topologies using high-dimensional datasets like MNIST.",
        "Reduced end-to-end wall-clock runtime by 30% by introducing periodic consensus synchronization, allowing nodes to process high-throughput streams without constant communication bottlenecks.",
      ],
    },
    {
      role: "Software Engineering Intern",
      org: "Mercator Partners LP",
      period: "May 2024 – Aug 2024",
      location: "Princeton, NJ",
      stack: [
        "RedwoodJS",
        "React",
        "GraphQL",
        "Prisma",
        "Elasticsearch",
        "Flask",
        "OpenAI & Gemini APIs",
        "Selenium",
      ],
      highlights: [
        "Built a hybrid search engine combining full-text and vector retrieval in Elasticsearch to help analysts reconcile portfolio company carbon emissions data.",
        "Automated financial research workflows with Selenium scraping pipelines and LLM-based earnings call summarization (OpenAI and Gemini APIs), cutting analyst review time by 40%.",
        "Developed an internal research portal in RedwoodJS that unified carbon emissions search with scheduled AI earnings digests.",
      ],
    },
    {
      role: "Student Community Manager",
      org: "Rutgers Coding & Social Lounge (CSL)",
      period: "2024 – Present",
      location: "New Brunswick, NJ",
      highlights: [
        "Manage DRIs on three initatives: Scarlet Labs, a semester-long agile project accelerator for student engineering teams, a Rutgers CS led podcast and an alumni event series.",
        "Tutor students across 100–400 level computer science courses and help maintain a cluster of 30+ iLab Linux machines",
      ],
    },
    {
      role: "Education Director",
      org: "Undergraduate Student Alliance of Computer Science (USACS)",
      period: "September 2024 – May 2026",
      location: "Piscataway, NJ",
      highlights: [
        "Organized and led technical workshops, faculty research panels, and alumni mock interviews for Rutgers' 3,000+ member computer science community with three committee chairs.",
        "Led student mentorship program, managed team rewriting the org's website, created a set of Software Engineering Internship guides, led judging for 150+ member hackathon.",
      ],
    },
    {
      role: "Day-of Operations Director",
      org: "HackRU",
      period: "September 2024 – May 2026",
      location: "Piscataway, NJ",
      highlights: [
        "Lead day-of logistics for New Jersey's largest collegiate hackathon (500+ participants), coordinating sponsor workshops, team formation, and hacker experience events.",
        "Recruited 20+ alumni and industry judges and overhauled the judging process to be 2x faster and more fair",
      ],
    },
  ] satisfies Experience[],

  education: [
    {
      school: "Rutgers University – Honors College",
      detail:
        "B.S. Computer Science, B.A. Physics · Expected May 2027 · AWS Certified Cloud Practitioner",
    },
  ],

  projects: [
    {
      title: "Spotify Clip Saver",
      href: "https://github.com/TheSunsHoRyzen",
      blurb:
        "Built a full-stack web app for musicians to isolate and loop specific sections of Spotify tracks while transcribing solos or learning arrangements by ear. Designed a Firestore NoSQL schema to map tracks to timestamped user clips and deployed the containerized React and Express.js stack on AWS.",
      tags: ["React", "Express.js", "Firestore", "Docker", "AWS"],
    },
    {
      title: "CS Advising RAG Chatbot",
      href: "https://github.com/TheSunsHoRyzen",
      blurb:
        "Engineered an academic advising assistant for Rutgers CS students that answers degree requirement, prerequisite, and course-planning questions using official department documentation. Built a hybrid retrieval pipeline pairing dense vector search in PostgreSQL (pgvector) with keyword matching, served via FastAPI and Next.js with Gemini API synthesis.",
      tags: [
        "Next.js",
        "FastAPI",
        "PostgreSQL",
        "pgvector",
        "Docker",
        "Gemini API",
      ],
    },
    {
      title: "LLM Knowledge Distillation Engine",
      href: "https://github.com/TheSunsHoRyzen",
      blurb:
        "Built a distillation pipeline to transfer chain-of-thought reasoning capabilities from 70B+ parameter teacher models (including Llama 4 Maverick on SciBench) into compact 3B student models. Wrote a custom token-alignment algorithm to reconcile cross-model vocabulary mismatches, improving downstream reasoning accuracy by +3.9% while running local training loops on Apple MPS.",
      tags: ["Python", "PyTorch", "Hugging Face", "PEFT / LoRA", "Apple MPS"],
    },
    {
      title: "Distributed Replicated Object Store",
      href: "https://github.com/TheSunsHoRyzen",
      blurb:
        "Designed and implemented a fault-tolerant, multi-node key-value and object storage engine from the ground up to explore consensus, replication, and consistency trade-offs. Implemented leader election, write-ahead logging, and state-machine replication over TCP so the cluster maintains availability and data durability even under simulated node crashes and network partitions.",
      tags: [
        "C++ / Go",
        "Distributed Systems",
        "Raft / Consensus",
        "TCP",
        "Linux",
      ],
    },
  ] satisfies Project[],

  writings: [] as Writing[],

  // What this site is built with (shown by the terminal's `stack` command).
  stack: [
    { label: "Framework", value: "Next.js (App Router)" },
    { label: "UI", value: "React" },
    { label: "Language", value: "TypeScript" },
    { label: "Styling", value: "Tailwind CSS with CSS-variable themes" },
    { label: "Fonts", value: "Geist via next/font" },
    {
      label: "Design",
      value: "macOS liquid-glass desktop with a window manager",
    },
  ],
};
