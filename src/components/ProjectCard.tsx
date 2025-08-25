'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';

// function readText(field: unknown): string {
//   // if (Array.isArray(field)) return asText(field); // Rich Text / Title
//   if (typeof field === 'string') return field; // Key Text
//   return '';
// }

export function ProjectCard({ doc }: { doc: any }) {
  // const title = readText(doc?.data?.project_title) || 'Untitled';
  // const excerpt = readText(doc?.data?.excerpt);
  const href = `/projects/${doc?.uid}`;
  console.log(doc);
  return (
    <Card className="border-2 rounded-none">
      <CardContent className="p-4">
        {isFilled.image(doc?.data?.featured_image) && (
          <div className="mb-4 overflow-hidden rounded-none">
            <PrismicNextImage
              field={doc.data.featured_image}
              className="w-full h-auto"
            />
          </div>
        )}

        <h3 className="font-[var(--font-tiny5)] text-2xl mb-2">
          {doc?.data?.project_title}
        </h3>

        {/* {doc && ( */}
        <PrismicRichText field={doc?.data?.excerpt} />
        {/* <p className="text-sm opacity-80 line-clamp-3">{excerpt}</p> */}
        {/* )} */}

        <div className="mt-4 flex items-center justify-between">
          <Link href={href} className="underline">
            View project
          </Link>
          {doc?.data?.featured && <Badge>Featured</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}
