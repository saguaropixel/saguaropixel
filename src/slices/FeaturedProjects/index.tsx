import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/ui/button';
import { createClient } from '@/prismicio';
import * as prismic from '@prismicio/client';
import { isFilled, type Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react';
import Link from 'next/link';

const tag = (t: string[]) => ({ fetchOptions: { next: { tags: t } } });

// function readText(field: unknown): string {
//   if (Array.isArray(field)) return asText(field); // Rich Text
//   if (typeof field === 'string') return field; // Key Text
//   return '';
// }

export type FeaturedProjectsProps =
  SliceComponentProps<Content.FeaturedProjectsSlice>;

export default async function FeaturedProjects({
  slice,
}: FeaturedProjectsProps) {
  const client = createClient();

  // --- collect up to 3 picked IDs from BOTH possible shapes ---
  const fromItems = (
    Array.isArray((slice as any).items) ? (slice as any).items : []
  )
    .map((it: any) => {
      const link = it.project ?? it.projects; // support "project" or "projects"
      return isFilled.contentRelationship(link) ? (link.id as string) : null;
    })
    .filter(Boolean) as string[];

  const fromPrimaryGroup = (
    Array.isArray((slice as any).primary?.items)
      ? (slice as any).primary.items
      : []
  )
    .map((it: any) => {
      const link = it.project ?? it.projects;
      return isFilled.contentRelationship(link) ? (link.id as string) : null;
    })
    .filter(Boolean) as string[];

  const selectedIds = [...fromItems, ...fromPrimaryGroup].slice(0, 3);

  // --- fetch selected docs (keep order later) ---
  let selected = selectedIds.length
    ? await client
        .getByIDs(selectedIds, { ...tag(['project_post']) })
        .then((r) => r.results)
    : [];

  // --- fallback with latest to fill remaining ---
  if (selected.length < 3 && (slice as any).primary?.use_latest_when_empty) {
    const latest = await client.get({
      filters: [prismic.filter.at('document.type', 'project_post')], // ✅ correct filter helper
      pageSize: 6,
      orderings: [{ field: 'my.project_post.project_date', direction: 'desc' }],
      ...tag(['project_post']),
    });

    const seen = new Set(selected.map((d) => d.id));
    const fillers = latest.results
      .filter((d) => !seen.has(d.id))
      .slice(0, 3 - selected.length);
    selected = selected.concat(fillers);
  }

  if (!selected.length) return null;

  // keep editor order first, then fallbacks
  if (selectedIds.length) {
    selected.sort((a, b) => {
      const ia = selectedIds.indexOf(a.id);
      const ib = selectedIds.indexOf(b.id);
      if (ia === -1 && ib === -1) return 0;
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }

  const heading = (slice as any).primary?.heading || 'Featured Projects';

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      {/* <h2 className="font-[var(--font-tiny5)] text-4xl md:text-6xl tracking-tight mb-10">
        {heading}
      </h2> */}

      <SectionHeading
        title={heading}
        lineColor="#E7A917" // or "rgb(231 169 23)" or "hsl(var(--brand-yellow))"
        as="h1"
        // className="text-4xl md:text-6xl tracking-tight"
      />

      <div className="grid gap-10 md:gap-12">
        {selected.slice(0, 3).map((doc: any, i: number) => {
          // const title = readText(doc?.data?.project_title) || 'Project';
          // const excerpt = readText(doc?.data?.excerpt);
          const href = `/projects/${doc?.uid}`;

          // inside the .map(...)
          const reverse = i % 2 === 1;

          // stagger only the IMAGE content (not the grid item)
          const imgBump =
            i === 1 ? 'md:translate-y-6' : i === 2 ? 'md:translate-y-12' : '';

          // swap columns with order on md+
          const imgOrder = reverse ? 'md:order-2' : 'md:order-1';
          const textOrder = reverse ? 'md:order-1' : 'md:order-2';

          return (
            <article
              key={doc.id}
              className="grid md:grid-cols-12 md:gap-x-12 gap-y-8 md:items-center" // ⬅️ center vertically
            >
              {/* Image */}
              <div className={`md:col-span-6 ${imgOrder} md:self-center`}>
                {isFilled.image(doc?.data?.featured_image) ? (
                  <div className={`relative ${imgBump} md:transform-gpu`}>
                    {/* ⬅️ stagger here */}
                    <div className="overflow-hidden rounded-2xl border-2">
                      <PrismicNextImage
                        field={doc.data.featured_image}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[16/10] rounded-2xl border-2 grid place-items-center text-sm opacity-60">
                    No image selected
                  </div>
                )}
              </div>

              {/* Text */}
              <div
                className={`md:col-span-6 ${textOrder} md:self-center flex flex-col justify-center`}
              >
                <h3 className="font-[var(--font-tiny5)] text-3xl md:text-5xl mb-3">
                  {doc?.data?.project_title}
                </h3>
                {/* {excerpt && <p className="opacity-80 mb-5">{excerpt}</p>} */}
                <div className="opacity-80 mb-5">
                  <PrismicRichText field={doc?.data?.excerpt} />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href={href}>View this project</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Start a project</Link>
                  </Button>
                </div>
                {Array.isArray(doc?.data?.technology) &&
                  doc.data.technology.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs opacity-70">
                      {doc.data.technology.map((t: any, idx: number) => (
                        <span key={idx} className="uppercase tracking-wide">
                          {t?.name || t?.name}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
