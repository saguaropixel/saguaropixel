// src/slices/HeroShowcase/index.tsx
import LaptopMock from '@/components/LaptopMock'; // adjust path if needed
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';

export type HeroShowcaseProps = SliceComponentProps<Content.HeroShowcaseSlice>;

const HeroShowcase: FC<HeroShowcaseProps> = ({ slice }) => {
  const tech = slice.primary.tech_stack ?? [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[--hero-bg,#EEF3F6] py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        {/* Title */}
        <div className="mx-auto max-w-4xl">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading1: ({ children }) => (
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none text-neutral-900 uppercase">
                  {children}
                </h1>
              ),
            }}
          />
        </div>

        {/* Subtitle */}
        <div className="mx-auto mt-3 max-w-3xl text-balance">
          <PrismicRichText
            field={slice.primary.subtitle}
            components={{
              paragraph: ({ children }) => (
                <p className="text-base md:text-lg text-neutral-600">
                  {children}
                </p>
              ),
            }}
          />
        </div>

        {/* Tech stack logos */}
        {tech.length > 0 && (
          <div className="mx-auto mt-5 flex w-full max-w-xl items-center justify-center gap-6 opacity-90">
            {tech.map((item, i) => (
              <div key={i} className="h-5 w-auto shrink-0 grayscale">
                <PrismicNextImage
                  field={item.logo}
                  className="h-5 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        )}

        {/* Device mockup via LaptopMock */}
        <div className="mx-auto mt-10 w-full max-w-5xl">
          {isFilled.image(slice.primary.device_mockup) && (
            <LaptopMock img={slice.primary.device_mockup} />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroShowcase;
