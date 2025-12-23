import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
      <p className="text-slate-600 mb-8">The project you're looking for doesn't exist.</p>
      <Link
        href="/projects"
        className="text-slate-900 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 rounded"
      >
        ← Back to Projects
      </Link>
    </div>
  );
}

