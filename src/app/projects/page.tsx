// app/projects/page.tsx
import { ProjectCard } from '@/components/ProjectCard';
import { getProjects } from '@/lib/projects';

export const revalidate = 60; // safety net; webhook will do the heavy lifting

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams?.page ?? '1');
  const {
    results,
    page: current,
    total_pages,
  } = await getProjects({ page, pageSize: 9 });

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="font-[var(--font-tiny5)] text-4xl md:text-6xl tracking-tight mb-10">
        Projects
      </h1>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {results.map((doc) => (
          <ProjectCard key={doc.id} doc={doc} />
        ))}
      </div>

      {/* Simple pager */}
      <div className="mt-12 flex items-center justify-center gap-3">
        <a
          aria-disabled={current <= 1}
          className="px-3 py-2 border rounded disabled:opacity-40"
          href={`/projects?page=${Math.max(1, current - 1)}`}
        >
          Prev
        </a>
        <span className="text-sm opacity-70">
          Page {current} / {total_pages}
        </span>
        <a
          aria-disabled={current >= total_pages}
          className="px-3 py-2 border rounded disabled:opacity-40"
          href={`/projects?page=${Math.min(total_pages, current + 1)}`}
        >
          Next
        </a>
      </div>
    </main>
  );
}
