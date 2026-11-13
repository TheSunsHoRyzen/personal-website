import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">About</h1>
      <p className="mt-2 text-fg-muted">Coming soon.</p>
    </div>
  );
}
