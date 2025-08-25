// app/projects/[uid]/page.tsx
import { asImageSrc, asText } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

type Params = { uid: string };
export const revalidate = 60;

const tagOpts = (tags: string[]) => ({ fetchOptions: { next: { tags } } });

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();

  const page = await client
    .getByUID(
      'project_post',
      uid,
      tagOpts(['project_post', `project_post:${uid}`])
    )
    .catch(() => null);

  if (!page) return notFound();
  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();

  const page = await client
    .getByUID(
      'project_post',
      uid,
      tagOpts(['project_post', `project_post:${uid}`])
    )
    .catch(() => null);

  if (!page) return {};

  const fallbackTitle =
    (Array.isArray(page.data.project_title)
      ? asText(page.data.project_title)
      : page.data.project_title) || 'Project';
  const fallbackDescription =
    (Array.isArray(page.data.excerpt)
      ? asText(page.data.excerpt)
      : page.data.excerpt) || 'Project details and highlights.';

  const title = page.data.meta_title || fallbackTitle;
  const description = page.data.meta_description || fallbackDescription;
  const ogImage =
    asImageSrc(page.data.meta_image) ||
    asImageSrc(page.data.featured_image) ||
    '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType(
    'project_post',
    tagOpts(['project_post']) // ⬅️ fixed
  );
  return pages.map((page) => ({ uid: page.uid }));
}
