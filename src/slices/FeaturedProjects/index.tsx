import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/ui/button';
import { createClient } from '@/prismicio';
import type { Content } from '@prismicio/client';
import * as prismic from '@prismicio/client';
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react';
import Link from 'next/link';

import LaptopMock from '@/components/LaptopMock';

import {
  asArrayOfObjects,
  pickRelationship,
  readBool,
  readImage,
  readKeyText,
  readRichText,
} from '@/lib/prismic-helpers';

const tag = (t: string[]) => ({ fetchOptions: { next: { tags: t } } });

export type FeaturedProjectsProps =
  SliceComponentProps<Content.FeaturedProjectsSlice>;

export default async function FeaturedProjects({
  slice,
}: FeaturedProjectsProps) {
  const client = createClient();

  // Collect up to 3 picked IDs from BOTH possible shapes (`project` or `projects`)
  const fromItems: string[] = (slice.items ?? [])
    .map(
      (it) =>
        pickRelationship<'project_post'>(it as Record<string, unknown>, [
          'project',
          'projects',
        ])?.id
    )
    .filter((v): v is string => !!v);

  const primaryItems =
    (slice.primary as unknown as { items?: unknown[] })?.items ?? [];

  const fromPrimaryGroup: string[] = Array.isArray(primaryItems)
    ? primaryItems
        .map(
          (it) =>
            pickRelationship<'project_post'>(it as Record<string, unknown>, [
              'project',
              'projects',
            ])?.id
        )
        .filter((v): v is string => !!v)
    : [];

  const selectedIds = [...fromItems, ...fromPrimaryGroup].slice(0, 3);

  // Fetch selected docs (keep order later)
  let selected: Content.ProjectPostDocument[] =
    selectedIds.length > 0
      ? await client
          .getByIDs<Content.ProjectPostDocument>(selectedIds, {
            ...tag(['project_post']),
          })
          .then((r) => r.results)
      : [];

  // Fallback with latest to fill remaining
  const useLatest = readBool(
    (slice.primary as unknown as { use_latest_when_empty?: unknown })
      ?.use_latest_when_empty
  );

  if (selected.length < 3 && useLatest) {
    const latest = await client.get<Content.ProjectPostDocument>({
      filters: [prismic.filter.at('document.type', 'project_post')],
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

  // Keep editor order first, then fallbacks
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

  const headingText =
    readKeyText((slice.primary as unknown as { heading?: unknown })?.heading) ||
    'Featured Projects';

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-16 md:py-24 overflow-x-clip">
      <SectionHeading title={headingText} lineColor="#E7A917" as="h1" />

      {/* bigger vertical rhythm to match the comp */}
      <div className="grid gap-20 md:gap-28">
        {selected.slice(0, 3).map((doc, i) => {
          const href = `/projects/${doc.uid}`;
          const reverse = i % 2 === 1;
          // 1) Row stagger (layout offset)
          const rowStagger =
            i === 1 ? 'md:mt-8' : i === 2 ? 'md:mt-16' : 'md:mt-0';

          // 2) Micro image-only bump (visual)
          const imgBump =
            i === 1 ? 'md:translate-y-8' : i === 2 ? 'md:translate-y-16' : '';

          // 3) Bleed with TRANSFORM (doesn't alter layout width)
          const bleed = reverse
            ? // bleed to the RIGHT when image is on the right
              'md:translate-x-[calc(50vw-50%)] md:translate-x-8 lg:translate-x-12'
            : // bleed to the LEFT when image is on the left
              'md:translate-x-[calc(-1*(50vw-50%))] md:-translate-x-8 lg:-translate-x-12';

          // 4) Side-aware padding for the text column (keeps it off the edge)
          const textGutter = reverse ? 'md:pl-8 lg:pl-16' : 'md:pr-8 lg:pr-16';

          // 5) Order on md+
          const imgOrder = reverse ? 'md:order-2' : 'md:order-1';
          const textOrder = reverse ? 'md:order-1' : 'md:order-2';

          // ✅ only pass a filled image to LaptopMock
          // ✅ read image and only pass a filled image to LaptopMock
          const img = readImage(doc.data.meta_image);
          const safeImg = prismic.isFilled.image(img) ? img : null;
          const title = readKeyText(doc.data.project_title);
          const excerpt = readRichText(doc.data.excerpt);

          // technology: optional array of objects with optional `name`
          type Tech = { name?: string | null };
          const tech: Tech[] = asArrayOfObjects<Tech>(
            (doc.data as unknown as { technology?: unknown }).technology
          )
            ? ((doc.data as unknown as { technology?: Tech[] })
                .technology as Tech[])
            : [];

          const techNames = tech
            .map((t) => (t?.name ?? '').trim())
            .filter(Boolean);
          return (
            <article
              key={doc.id}
              className={`grid gap-y-10 md:grid-cols-12 md:gap-x-12 md:items-center ${rowStagger}`}
            >
              {/* Laptop + image */}
              <div className={`md:col-span-6 ${imgOrder}`}>
                <div className={`md:transform-gpu ${imgBump}`}>
                  {/* Use transform-only bleed; do NOT use ml/mr calc here */}
                  <div className={`md:transform ${bleed}`}>
                    <LaptopMock img={safeImg} tech={techNames as string[]} />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div
                className={`md:col-span-6 ${textOrder} ${textGutter} md:self-center flex flex-col justify-center`}
              >
                <h3 className="font-[var(--font-tiny5)] text-4xl md:text-5xl mb-3">
                  {title || 'Project'}
                </h3>

                <div className="opacity-80 mb-5 max-w-prose">
                  {excerpt && <PrismicRichText field={excerpt} />}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild tone={'blue'}>
                    <Link href={href}>View this project</Link>
                  </Button>
                  <Button variant="solid" asChild tone={'magenta'}>
                    <Link href="/contact">Start a project</Link>
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
