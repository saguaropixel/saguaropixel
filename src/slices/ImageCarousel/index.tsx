// src/slices/ImageCarousel/index.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';

export type ImageCarouselProps =
  SliceComponentProps<Content.ImageCarouselSlice>;

const ImageCarousel: FC<ImageCarouselProps> = ({ slice }) => {
  const slides = (slice.primary.slides ?? []).filter((it) =>
    isFilled.image((it as any)?.image)
  );
  const showNav = Boolean((slice.primary as any)?.show_navigation);
  if (!slides.length) return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#eef2f5] py-12 md:py-20"
    >
      <div className="relative mx-auto w-full max-w-[1536px]">
        <Carousel
          opts={{
            align: 'start',
            loop: false,
            containScroll: 'trimSnaps', // keeps last slide aligned
          }}
          className="relative w-full px-4 md:px-12" // acts like offsetBefore/After
        >
          {/* add gutter at all sizes (small on mobile) */}
          <CarouselContent className="-ml-3 sm:-ml-4 md:-ml-6">
            {slides.map((item, idx) => {
              const img = (item as any).image;
              return (
                <CarouselItem
                  key={idx}
                  className="pl-3 sm:pl-4 md:pl-6 basis-2/3 sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <PrismicNextImage
                      field={img}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 66vw"
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {showNav && (
            <>
              {/* inside on mobile, outside from md+ */}
              <CarouselPrevious
                className="
                  absolute z-10 top-1/2 -translate-y-1/2
                  left-4 md:-left-4
                  h-10 w-10 rounded-full border-2 border-pink-500 text-pink-500
                  bg-white/90 hover:bg-white shadow-md backdrop-blur
                "
              />
              <CarouselNext
                className="
                  absolute z-10 top-1/2 -translate-y-1/2
                  right-2 md:-right-4
                  h-10 w-10 rounded-full border-2 border-pink-500 text-pink-500
                  bg-white/90 hover:bg-white shadow-md backdrop-blur
                "
              />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default ImageCarousel;
