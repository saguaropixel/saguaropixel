// src/lib/projects.ts
import { createClient } from '@/prismicio';
import type { Content } from '@prismicio/client';
import * as prismic from '@prismicio/client';

const PROJECTS_TAG = 'project_post';

// Helper to attach Next.js tag-based caching to any Prismic call
const tag = (tags: string[]) => ({ fetchOptions: { next: { tags } } });

// ---- Types ------------------------------------------------------------------
export type ProjectDoc = Content.ProjectPostDocument;

// ---- Queries ----------------------------------------------------------------

/** Paginated list of project posts ordered by project_date desc. */
export async function getProjects(opts?: { page?: number; pageSize?: number }) {
  const client = createClient();
  const page = opts?.page ?? 1;
  const pageSize = opts?.pageSize ?? 9;

  const res = await client.get<ProjectDoc>({
    filters: [prismic.filter.at('document.type', 'project_post')],
    orderings: [{ field: 'my.project_post.project_date', direction: 'desc' }],
    page,
    pageSize,
    ...tag([PROJECTS_TAG]),
  });

  return res; // { results, page, total_pages, total_results_size, ... }
}

/** Prefer a project marked `featured = true`; otherwise return the newest by date. */
export async function getLatestProject(): Promise<ProjectDoc | undefined> {
  const client = createClient();

  // 1) Prefer "featured"
  const featured = await client.get<ProjectDoc>({
    filters: [prismic.filter.at('my.project_post.featured', true)],
    pageSize: 1,
    orderings: [{ field: 'my.project_post.project_date', direction: 'desc' }],
    ...tag([PROJECTS_TAG]),
  });

  if (featured.results.length) return featured.results[0];

  // 2) Fallback to latest by date
  const latest = await client.get<ProjectDoc>({
    filters: [prismic.filter.at('document.type', 'project_post')],
    pageSize: 1,
    orderings: [{ field: 'my.project_post.project_date', direction: 'desc' }],
    ...tag([PROJECTS_TAG]),
  });

  return latest.results[0];
}

/** Fetch a single project by UID. */
export async function getProjectByUID(uid: string): Promise<ProjectDoc | null> {
  const client = createClient();
  const doc = await client
    .getByUID<ProjectDoc>('project_post', uid, {
      ...tag([PROJECTS_TAG, `project_post:${uid}`]),
    })
    .catch(() => null);
  return doc;
}
