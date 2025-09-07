'use client';

import { Card, CardContent } from '@/components/ui/card';
import { isFilled } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';
import LaptopMock from './LaptopMock';
import { Button } from './ui/button';

// function readText(field: unknown): string {
//   // if (Array.isArray(field)) return asText(field); // Rich Text / Title
//   if (typeof field === 'string') return field; // Key Text
//   return '';
// }

export function ProjectCard({ doc }: { doc: any }) {
  console.log(doc);
  // const title = readText(doc?.data?.project_title) || 'Untitled';
  // const excerpt = readText(doc?.data?.excerpt);
  const href = `/projects/${doc?.uid}`;
  return (
    <Card className="rounded-none shadow-none border-none">
      <CardContent className="p-4">
        {isFilled.image(doc?.data?.meta_image) && (
          <LaptopMock img={doc?.data?.meta_image} />
          //  tech={techNames as string[]}
        )}

        <h3 className="font-[var(--font-tiny5)] text-2xl mt-4">
          {doc?.data?.project_title}
        </h3>

        {/* {doc && ( */}
        <PrismicRichText field={doc?.data?.excerpt} />
        {/* <p className="text-sm opacity-80 line-clamp-3">{excerpt}</p> */}
        {/* )} */}

        <div className="mt-4 flex items-center justify-between">
          <Button variant="solid" asChild tone={'magenta'}>
            <Link href="/contact">Start a project</Link>
          </Button>
          {/* {doc?.data?.featured && <Badge>Featured</Badge>} */}
        </div>
      </CardContent>
    </Card>
  );
}
