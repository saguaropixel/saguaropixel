// app/projects/page.tsx
import { Heading } from '@/components/Heading';
import { ProjectCard } from '@/components/ProjectCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getProjects } from '@/lib/projects';

export const revalidate = 60; // safety net; webhook will do the heavy lifting

type SearchParams = {
  page?: string | string[];
};

export default async function ProjectsPage({
  searchParams,
}: {
  // Next.js 15 passes searchParams as a Promise
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const rawPage = params?.page;
  const page = Number(Array.isArray(rawPage) ? rawPage[0] : (rawPage ?? '1'));

  const {
    results,
    page: current,
    total_pages,
  } = await getProjects({
    page,
    pageSize: 9,
  });

  return (
    <main className="container mx-auto px-4 py-20">
      <Heading as="h1" size="d2" className="text-center my-20">
        PROJECTS
      </Heading>
      {/* <h1 className="font-[var(--font-tiny5)] text-4xl md:text-6xl tracking-tight mb-10">
        Projects
      </h1> */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {results.map((doc) => (
          <ProjectCard key={doc.id} doc={doc} />
        ))}
      </div>

      {/* Shadcn Pagination */}
      <div className="mt-12 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/projects?page=${Math.max(1, current - 1)}`}
                aria-disabled={current <= 1}
              />
            </PaginationItem>

            {/* Page numbers */}
            {Array.from({ length: total_pages }, (_, i) => i + 1).map((p) => {
              // limit numbers (show first, last, current, +/- 1, with ellipsis)
              if (
                p === 1 ||
                p === total_pages ||
                (p >= current - 1 && p <= current + 1)
              ) {
                return (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href={`/projects?page=${p}`}
                      isActive={p === current}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              if (p === current - 2 || p === current + 2) {
                return (
                  <PaginationItem key={p}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href={`/projects?page=${Math.min(total_pages, current + 1)}`}
                aria-disabled={current >= total_pages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
