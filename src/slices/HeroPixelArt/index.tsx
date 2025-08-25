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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="
        relative w-full overflow-hidden py-24 bg-dark-brown-500 text-brand-black"
    >
      {/* Content container */}
      <div className="relative z-10 mx-auto grid h-full max-w-[1400px] grid-rows-[1fr_auto] px-6 py-10 md:px-10 lg:px-16">
        {/* Headline block */}
        <div className="self-center">
          <Heading
            as="h1"
            size="xl"
            className="
              block font-heading uppercase text-magenta-500
              leading-[0.9] tracking-tight
              text-[clamp(44px,8vw,140px)]
            "
          >
            {first_line}
          </Heading>

          <Heading
            as="h1"
            size="xl"
            className="
              mt-4 block font-heading uppercase text-magenta-500
              leading-[0.9] tracking-tight
              text-[clamp(44px,8vw,140px)]
            "
          >
            {second_line}
          </Heading>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-4 self-start">
          {primary_action?.link_type && (
            <Button variant="solid" tone="yellow" asChild>
              <PrismicNextLink field={primary_action}>
                {/* If you store a label on the link’s text, use it; fallback below */}
                {((primary_action as any).text as string) || 'VIEW MY WORK'}
              </PrismicNextLink>
            </Button>
          )}

          {secondary_action?.link_type && (
            <Button variant="solid" tone="magenta" asChild>
              <PrismicNextLink field={secondary_action}>
                {((secondary_action as any).text as string) ||
                  'START A PROJECT'}
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
          className="
            pointer-events-none select-none
            absolute bottom-0 right-0 z-0 h-[90%] w-auto
            translate-y-[6%] sm:translate-y-[4%]
          "
          // Decorative only; don’t announce to screen readers
          alt=""
        />
      )}

      {/* Pixel confetti */}
      {/* <PixelConfetti /> */}
    </section>
  );
};

export default HeroPixelArt;

/* ———————————————————————————————— */
/* Tiny pixel confetti sprinkled around */
/* ———————————————————————————————— */
const PixelConfetti = () => {
  // A handful of absolutely-positioned squares (no layout thrash)
  const dots = [
    'top-[12%] left-[9%]',
    'top-[22%] left-[40%]',
    'top-[30%] left-[63%]',
    'top-[48%] left-[28%]',
    'top-[58%] left-[52%]',
    'top-[72%] left-[36%]',
    'top-[78%] left-[18%]',
    'top-[20%] left-[84%]',
    'top-[66%] left-[72%]',
  ];

  const colors = [
    'bg-cyan-400',
    'bg-magenta-500',
    'bg-yellow-400',
    'bg-white',
    'bg-cyan-500',
  ];

  return (
    <div aria-hidden className="absolute inset-0 z-0">
      {dots.map((pos, i) => (
        <span
          key={i}
          className={`
            absolute ${pos}
            block h-2 w-2 md:h-5 md:w-5
            ${colors[i % colors.length]}
            animate-bounce
            [animation-duration:${1200 + (i % 5) * 150}ms]
            [animation-delay:${(i % 7) * 90}ms]
          `}
        />
      ))}
    </div>
  );
};
