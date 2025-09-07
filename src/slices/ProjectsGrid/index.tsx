// src/slices/ProjectsGrid/index.tsx
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
import { createClient } from '@/prismicio';
import type { Content } from '@prismicio/client';
import * as prismic from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';

type Ctx = {
  projects?: {
    page?: number;
    pageSize?: number;
    basePath?: string;
  };
};

type Props = SliceComponentProps<Content.ProjectsGridSlice, Ctx>;

export default async function ProjectsGridSlice({ slice, context }: Props) {
  const client = createClient();

  // normalize: "Dynamic" / "Curated" → "dynamic" / "curated"
  const modeRaw = (slice.primary as any)?.mode ?? 'dynamic';
  const mode = String(modeRaw).toLowerCase();

  const defaultPageSize =
    (slice.primary as any)?.page_size &&
    Number((slice.primary as any).page_size) > 0
      ? Number((slice.primary as any).page_size)
      : 9;

  const page = Math.max(1, context?.projects?.page ?? 1);
  const pageSize = context?.projects?.pageSize ?? defaultPageSize;
  const basePath = context?.projects?.basePath ?? '/projects';

  let results: prismic.PrismicDocument[] = [];
  let total_pages = 1;
  let current = page;

  if (mode === 'curated') {
    // relationship stubs
    const links = (slice.items ?? [])
      .map((it: any) => it?.curated_projects)
      .filter((l: any) => l?.id);

    total_pages = Math.max(1, Math.ceil(links.length / pageSize));
    const start = (page - 1) * pageSize;
    const pageIds = links.slice(start, start + pageSize).map((l: any) => l.id);

    if (pageIds.length) {
      const res = await client.getByIDs(pageIds);
      // keep original order from pageIds
      const byId = new Map(res.results.map((d) => [d.id, d]));
      results = pageIds
        .map((id) => byId.get(id))
        .filter(Boolean) as prismic.PrismicDocument[];
    }
  } else {
    // dynamic: all project_post docs
    const res = await client.get({
      filters: [prismic.filter.at('document.type', 'project_post')],
      page,
      pageSize,
      orderings: [{ field: 'my.project_post.date', direction: 'desc' }],
    });
    results = res.results;
    total_pages = res.total_pages;
    current = res.page;
  }

  return (
    <section className="container mx-auto px-4 py-20">
      <Heading as="h1" size="d2" className="text-center my-20">
        PROJECTS
      </Heading>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {results.map((doc) => (
          <ProjectCard key={doc.id} doc={doc as any} />
        ))}
      </div>

      {total_pages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`${basePath}?page=${Math.max(1, current - 1)}`}
                  aria-disabled={current <= 1}
                />
              </PaginationItem>

              {Array.from({ length: total_pages }, (_, i) => i + 1).map((p) => {
                if (
                  p === 1 ||
                  p === total_pages ||
                  (p >= current - 1 && p <= current + 1)
                ) {
                  return (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href={`${basePath}?page=${p}`}
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
                  href={`${basePath}?page=${Math.min(total_pages, current + 1)}`}
                  aria-disabled={current >= total_pages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}
