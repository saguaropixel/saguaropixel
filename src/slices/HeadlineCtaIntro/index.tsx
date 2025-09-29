import { Button } from '@/components/ui/button';
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';

export type HeadlineCtaIntroProps =
  SliceComponentProps<Content.HeadlineCtaIntroSlice>;

const HeadlineCtaIntro: FC<HeadlineCtaIntroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-neutral-900 text-white py-24 px-4"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Headline */}
        {isFilled.richText(slice.primary.headline) && (
          <PrismicRichText
            field={slice.primary.headline}
            components={{
              heading1: ({ children }) => (
                <h1 className="mb-6 font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight font-['Tiny5']">
                  {children}
                </h1>
              ),
            }}
          />
        )}

        {/* CTA Buttons */}
        {slice.primary.cta_buttons?.length > 0 && (
          <div className="mb-6 flex flex-wrap justify-center gap-4">
            {slice.primary.cta_buttons.map((cta: any, i: number) => {
              // Assign magenta for first, blue for second
              const colorClasses =
                i === 0
                  ? 'bg-blue-500 hover:bg-blue-700 text-white'
                  : 'bg-magenta-500 hover:bg-magenta-700 text-white';

              return (
                <Button key={i} asChild className={`px-6 ${colorClasses}`}>
                  <PrismicNextLink field={cta}>
                    {cta.text || 'Learn More'}
                  </PrismicNextLink>
                </Button>
              );
            })}
          </div>
        )}

        {/* Description */}
        {isFilled.richText(slice.primary.description) && (
          <PrismicRichText
            field={slice.primary.description}
            // components={{
            //   paragraph: ({ children }) => (
            //     <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto">
            //       {children}
            //     </p>
            //   ),
            // }}
          />
        )}
      </div>
    </section>
  );
};

export default HeadlineCtaIntro;
