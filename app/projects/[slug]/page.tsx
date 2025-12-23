import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProjectBySlug, getProjectContent } from "@/lib/projects";
import { MDXWrapper } from "@/components/mdx-wrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Chris Wylde Photography`,
    description: project.oneLine,
    openGraph: {
      title: project.title,
      description: project.oneLine,
      type: "article",
      images: [
        {
          url: project.coverImageUrl,
          width: 1200,
          height: 800,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const mdxContent = await getProjectContent(slug);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
      <p className="text-lg text-slate-600 mb-8">{project.oneLine}</p>

      <div className="aspect-[4/3] relative mb-8 overflow-hidden bg-slate-100 rounded-lg">
        <Image
          src={project.coverImageUrl}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          priority
        />
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-12">
        <div>
          <span className="font-medium">Date: </span>
          {formatDate(project.dateStart)}
          {project.dateEnd && ` - ${formatDate(project.dateEnd)}`}
        </div>
        {project.location && (
          <div>
            <span className="font-medium">Location: </span>
            {project.location}
          </div>
        )}
      </div>

      {mdxContent && (
        <article className="prose prose-slate max-w-none">
          <MDXWrapper content={mdxContent} printProduct={project.printProduct || null} />
        </article>
      )}
    </div>
  );
}

