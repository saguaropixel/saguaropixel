'use client';

import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Content } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';

export type HeroPixelArtProps = SliceComponentProps<Content.HeroPixelArtSlice>;

const HeroPixelArt: FC<HeroPixelArtProps> = ({ slice }) => {
  const { first_line, second_line, graphic, primary_action, secondary_action } =
    slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full overflow-hidden bg-dark-brown-500 py-24 text-brand-black"
    >
      {/* Headline block */}
      <div className="full-bleed relative z-10">
        <MarqueeLine text={first_line} />
        <MarqueeLine text={second_line} reverse className="mt-2 md:mt-4" />
      </div>

      <div className="relative z-20 mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4">
          {primary_action?.link_type && (
            <Button variant="solid" tone="yellow" asChild>
              <PrismicNextLink field={primary_action}>
                {(primary_action as any).text || 'VIEW MY WORK'}
              </PrismicNextLink>
            </Button>
          )}

          {secondary_action?.link_type && (
            <Button variant="solid" tone="magenta" asChild>
              <PrismicNextLink field={secondary_action}>
                {(secondary_action as any).text || 'START A PROJECT'}
              </PrismicNextLink>
            </Button>
          )}
        </div>
      </div>

      {/* Decorative cactus image from Prismic */}
      {graphic && (
        <PrismicNextImage
          field={graphic}
          priority
          className="pointer-events-none absolute bottom-0 right-0 z-0 h-[90%] w-auto translate-y-[6%] sm:translate-y-[4%] select-none"
          alt=""
        />
      )}
    </section>
  );
};

export default HeroPixelArt;

/* ———————————————————————————————— */
/* Marquee Component for each line */
/* ———————————————————————————————— */
function MarqueeLine({
  text,
  reverse = false,
  className = '',
}: {
  text: any;
  reverse?: boolean;
  className?: string;
}) {
  if (!text) return null;

  // One lane (no wrapping), duplicated once for seamless scroll.
  const Lane = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <div
      aria-hidden={ariaHidden}
      className="
        flex shrink-0 items-baseline whitespace-nowrap
        gap-[clamp(2rem,4vw,3rem)] pr-[clamp(2rem,4vw,3rem)]
      "
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Heading
          key={i}
          as="h1"
          size="d3"
          className="
            inline-block whitespace-nowrap
            font-heading uppercase text-magenta-500
            leading-none
          "
        >
          {text}
        </Heading>
      ))}
    </div>
  );

  // Nice slow speeds — second line a bit slower for parallax feel
  const duration = reverse ? '90s' : '75s';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={[
          'flex w-max will-change-transform',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        ].join(' ')}
        style={{ animationDuration: duration }}
      >
        <Lane />
        <Lane ariaHidden />
      </div>
    </div>
  );
}
