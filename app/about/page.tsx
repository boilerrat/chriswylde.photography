import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Chris Wylde Photography",
  description: "About Chris Wylde and contact information",
  openGraph: {
    title: "About | Chris Wylde Photography",
    description: "About Chris Wylde and contact information",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      <p className="text-slate-600">Bio and contact information coming soon...</p>
    </div>
  );
}

