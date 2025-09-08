// src/slices/HeadlineRichtextImage/index.tsx
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';
// Optional: if you already have this component in your project.
// Remove the import (and the usage) if you don't use it.
// import LaptopMock from "@/components/LaptopMock";

export type HeadlineRichtextImageProps =
  SliceComponentProps<Content.ShowcaseSplitSlice>;

const HeadlineRichtextImage: FC<HeadlineRichtextImageProps> = ({ slice }) => {
  const { headline, subtitle, section_title, body, media } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#eef2f5] py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1536px] px-4 md:px-6">
        {/* Top headline + subtitle */}
        <div className="max-w-3xl">
          {isFilled.richText(headline) && (
            <PrismicRichText
              field={headline}
              // components={{
              //   heading1: ({ children }) => (
              //     <h2 className="mb-2 text-4xl font-extrabold tracking-[0.02em] md:text-5xl">
              //       {children}
              //     </h2>
              //   ),
              //   paragraph: ({ children }) => (
              //     <p className="text-4xl font-extrabold tracking-[0.02em] md:text-5xl">
              //       {children}
              //     </p>
              //   ),
              // }}
            />
          )}

          {isFilled.keyText(subtitle) && (
            <p className="mt-1 text-base font-medium opacity-80 md:text-lg">
              {subtitle}
            </p>
          )}
        </div>

        {/* Split content */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 md:mt-20 lg:grid-cols-[minmax(0,560px)_1fr]">
          {/* Left: Section title + body */}
          <div>
            {isFilled.richText(section_title) && (
              <PrismicRichText
                field={section_title}
                // components={{
                //   heading2: ({ children }) => (
                //     <h3 className="mb-4 text-3xl font-extrabold md:text-4xl">
                //       {children}
                //     </h3>
                //   ),
                //   paragraph: ({ children }) => (
                //     <p className="mb-4 text-3xl font-extrabold md:text-4xl">
                //       {children}
                //     </p>
                //   ),
                // }}
              />
            )}

            {isFilled.richText(body) && (
              <div className="prose prose-neutral max-w-none text-[15px] leading-relaxed md:text-base">
                <PrismicRichText field={body} />
              </div>
            )}
          </div>

          {/* Right: Laptop mock with image */}
          <div className="relative">
            {/* If you have a LaptopMock component, uncomment below and remove the fallback */}
            {/* {isFilled.image(media) && <LaptopMock img={media} />} */}

            {/* Fallback “laptop” frame (pure CSS) */}
            {isFilled.image(media) && (
              <PrismicNextImage
                field={media}
                className="aspect-[16/10] h-auto w-full object-cover"
                loading="lazy"
                // simple alt fallback
                // alt={media.alt ?? 'Showcase image'}
              />
              // <LaptopMock img={media} />
              // <div className="relative mx-auto w-full max-w-[920px]">
              //   {/* Bezel */}
              //   <div className="rounded-2xl border border-neutral-800 bg-neutral-900 shadow-xl">
              //     <div className="border-b border-neutral-800 px-4 py-3" />
              //     <div className="p-0">
              //       <PrismicNextImage
              //         field={media}
              //         className="aspect-[16/9] h-auto w-full rounded-b-2xl object-cover"
              //         loading="lazy"
              //         // simple alt fallback
              //         alt={media.alt ?? 'Showcase image'}
              //       />
              //     </div>
              //   </div>
              //   {/* Base/trackpad hint */}
              //   <div className="mx-auto h-[10px] w-[85%] rounded-b-2xl bg-neutral-800/80" />
              // </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadlineRichtextImage;
