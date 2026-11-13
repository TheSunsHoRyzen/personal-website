import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Projects</h1>
      <p className="mt-2 text-fg-muted">Coming soon.</p>
    </div>
  );
}
