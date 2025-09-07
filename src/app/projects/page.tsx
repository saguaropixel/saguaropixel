// app/projects/page.tsx
import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { asImageSrc } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 60;

type SearchParams = { page?: string | string[] };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const raw = params?.page;
  const page = Number(Array.isArray(raw) ? raw[0] : (raw ?? '1'));

  const client = createClient();
  const doc = await client.getSingle('projects').catch(() => notFound());

  return (
    <SliceZone
      slices={doc.data.slices}
      components={components}
      context={{ projects: { page, pageSize: 9, basePath: '/projects' } }}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('projects').catch(() => notFound());
  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: { images: [{ url: asImageSrc(page.data.meta_image) ?? '' }] },
  };
}
