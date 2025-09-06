// src/slices/HeroPixelArt/index.tsx
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
    <section className="relative w-full overflow-hidden bg-dark-brown-500 py-20 md:py-24">
      {/* Top layer: first line */}
      <div className="full-bleed pointer-events-none relative z-30">
        <MarqueeLine text={first_line} />
      </div>

      {/* Middle layer: cactus image */}
      {graphic && (
        <PrismicNextImage
          field={graphic}
          priority
          alt=""
          className="pointer-events-none absolute bottom-0 right-0 z-20 h-[88%] w-auto translate-y-[6%] sm:translate-y-[4%] select-none"
        />
      )}

      {/* Bottom layer: second line (flows behind cactus) */}
      <div className="full-bleed pointer-events-none relative z-10 mt-2 md:mt-4">
        <MarqueeLine text={second_line} reverse />
      </div>

      {/* Contained CTAs (above everything for clickability) */}
      <div className="relative z-40 mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="mt-8 md:mt-10 flex flex-wrap gap-4">
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
    </section>
  );
};

export default HeroPixelArt;

/* ——— Marquee (stable, no-wrap, 2-lane, slow) ——— */
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

  const Lane = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-baseline whitespace-nowrap gap-[clamp(2rem,4vw,3rem)] pr-[clamp(2rem,4vw,3rem)]"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Heading
          key={i}
          as="h1"
          size="d2"
          className="inline-block whitespace-nowrap uppercase text-magenta-500 leading-none"
        >
          {text}
        </Heading>
      ))}
    </div>
  );

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} flex w-max will-change-transform`}
        style={{ animationDuration: reverse ? '90s' : '75s' }}
      >
        <Lane />
        <Lane ariaHidden />
      </div>
    </div>
  );
}
