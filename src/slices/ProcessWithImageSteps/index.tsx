// src/slices/ProcessWithImageSteps/index.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

export type ProcessWithImageStepsProps =
  SliceComponentProps<Content.ProcessWithImageStepsSlice>;

// const STAGGERS = [0, 48, 24]; // px

// --- helper: detect dark hex colors ---
function isDarkHex(hex?: string) {
  if (!hex) return false;
  let h = hex.replace('#', '');
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  const int = parseInt(h, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  // relative luminance
  const L = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return L < 0.55; // tweak threshold if needed
}

export default function ProcessWithImageSteps({
  slice,
}: ProcessWithImageStepsProps) {
  const images = (slice.primary as any)?.images ?? [];
  const steps = (slice.primary as any)?.steps ?? [];
  const backgroundHex = isFilled.contentRelationship(
    slice.primary.background_color
  )
    ? (slice.primary.background_color.data as any)?.value
    : undefined;

  const darkBg = isDarkHex(backgroundHex ?? '#121212');

  // scoped typography + accents based on background
  const fgBase = darkBg ? 'text-white' : 'text-neutral-900';
  const fgMuted = darkBg ? 'text-white/70' : 'text-muted-foreground';
  const ringCls = darkBg ? 'ring-white/10' : 'ring-neutral-800/20';

  // Consistent 433x317 box for each image
  const ImageBox = ({
    field,
    priority = false,
  }: {
    field: any;
    priority?: boolean;
  }) => (
    <PrismicNextImage
      field={field}
      width={433}
      height={317}
      className="w-full max-w-[433px] h-auto object-cover shadow-lg"
      priority={priority}
      imgixParams={{
        auto: ['format', 'compress'],
        fit: 'crop',
        ar: '433:317',
        q: 75,
      }}
      sizes="(max-width: 768px) 100vw, 433px"
    />
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // Base spacing + scoped text color
      className={`w-full px-4 py-16 md:py-24 ${fgBase}`}
      style={{ backgroundColor: backgroundHex ?? '#121212' }}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Title & Subheading */}
        <header className="mb-10 md:mb-14">
          {isFilled.richText(slice.primary.heading) && (
            <PrismicRichText
              field={slice.primary.heading}
              // components={{
              //   heading1: ({ children }) => (
              //     <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-wide">
              //       {children}
              //     </h2>
              //   ),
              //   paragraph: ({ children }) => (
              //     <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-wide">
              //       {children}
              //     </h2>
              //   ),
              // }}
            />
          )}

          {isFilled.richText(slice.primary.sub_heading) && (
            <div className="mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
              <PrismicRichText field={slice.primary.sub_heading} />
            </div>
          )}
        </header>

        {/* Layout: stacks on mobile, 2-col on desktop */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {/* LEFT column */}
          <div className="relative">
            {/* Mobile: horizontal carousel of ALL images (no cap) */}
            <div className="md:hidden">
              {images.length > 0 ? (
                <Carousel
                  opts={{ align: 'start', loop: true }}
                  className="w-full"
                  aria-label="Process images"
                >
                  <CarouselContent className="-ml-3">
                    {images.map(
                      (it: any, i: number) =>
                        isFilled.image(it?.image) && (
                          <CarouselItem
                            key={i}
                            className="basis-auto pl-3 flex justify-center"
                          >
                            <ImageBox field={it.image} priority={i === 0} />
                          </CarouselItem>
                        )
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                </Carousel>
              ) : (
                <div className="w-full h-[317px] ring-1 ring-neutral-800/30" />
              )}
            </div>

            {/* Desktop: staggered stack, capped at 3 */}
            <div className="hidden md:block">
              <div
                className="
                  hidden md:grid gap-10
                  md:[&>div]:w-full md:[&>div]:flex
                  md:[&>div:nth-child(odd)]:justify-start
                  md:[&>div:nth-child(even)]:justify-end
                "
              >
                {images.slice(0, 3).map((it: any, i: number) => {
                  if (!isFilled.image(it?.image)) return null;
                  // const staggerClass =
                  //   i % 3 === 0 ? 'pt-0' : i % 3 === 1 ? 'pt-0' : 'pt-0';
                  return (
                    <div key={i}>
                      <ImageBox field={it.image} priority={i === 0} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT column: steps */}
          <div className="grid content-center gap-24">
            {steps.map((step: any, i: number) => (
              <article key={i} className="max-w-prose">
                {step?.heading ? (
                  typeof step.heading === 'string' ? (
                    <h3 className="mb-3 font-semibold tracking-wide">
                      {step.heading}
                    </h3>
                  ) : (
                    <PrismicRichText
                      field={step.heading}
                      // components={{
                      //   heading3: ({ children }) => (
                      //     <h3 className="mb-3 text-xl md:text-2xl font-semibold tracking-wide">
                      //       {children}
                      //     </h3>
                      //   ),
                      //   paragraph: ({ children }) => (
                      //     <h3 className="mb-3 text-xl md:text-2xl font-semibold tracking-wide">
                      //       {children}
                      //     </h3>
                      //   ),
                      // }}
                    />
                  )
                ) : null}

                {isFilled.richText(step?.description) && (
                  <div className="text-sm md:text-base leading-relaxed">
                    <PrismicRichText field={step.description} />
                  </div>
                )}
              </article>
            ))}

            {steps.length === 0 && (
              <p className="text-sm">
                Add items to the “Steps” group to populate this column.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
