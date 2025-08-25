'use client';

import { ServiceCard } from '@/components/ServiceCard';
import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import useEmblaCarousel from 'embla-carousel-react';
import * as React from 'react';

export type ServicesCarouselProps =
  SliceComponentProps<Content.ServicesCarouselSlice>;

export default function ServicesCarousel({ slice }: ServicesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 'auto',
    containScroll: 'trimSnaps',
  });

  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative bg-dark-brown-500 py-24"
    >
      {/* {slice.primary.section_title && (
        <h2 className="font-heading text-2xl md:text-7xl text-off-white-500">
          {slice.primary.section_title}
        </h2>
      )} */}

      {/* Embla viewport */}
      <div className="overflow-hidden pl-4 m:pl-20" ref={emblaRef}>
        <div className="flex gap-8">
          {/* slices/ServicesCarousel/index.tsx (inside your map) */}
          {slice.primary.items.map((item, i) => {
            const rel = item.service_ref as any;
            const data = rel?.data as any | undefined;

            const title = data?.title ?? rel?.uid ?? 'Untitled';
            const summary = data?.summary;
            const link = data?.link;

            // color: hex or from a related brand_color doc
            const color =
              (typeof data?.color === 'string' && data.color) ||
              data?.color?.data?.value ||
              data?.color?.data?.hex ||
              '#ff2e7a';

            return (
              <article
                key={i}
                className="
                shrink-0
                basis-[88%]     /* 1 per view on mobile */
                sm:basis-[50%]   /* 2 per view */
                lg:basis-[40%]   /* 2.5 per view */
                xl:basis-[33.3333%] /* 3 per view */
              "
              >
                <ServiceCard
                  title={title}
                  summary={summary}
                  link={link}
                  color={color}
                  highlighted={item.highlight === true}
                />
              </article>
            );
          })}
        </div>
      </div>
      {/* <div className="my-4 flex justify-end gap-2 max-w-screen-2xl px-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
        >
          <ChevronLeft className="size-5 text-off-white-500" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
        >
          <ChevronRight className="size-5 text-off-white-500" />
        </Button>
      </div> */}
    </section>
  );
}
