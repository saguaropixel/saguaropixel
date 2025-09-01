// src/slices/FaqWithHeading/index.tsx
import { Heading } from '@/components/Heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { asText, Content, isFilled } from '@prismicio/client';
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from '@prismicio/react';
import { FC } from 'react';

export type FaqWithHeadingProps =
  SliceComponentProps<Content.FaqWithHeadingSlice>;

const FaqWithHeading: FC<FaqWithHeadingProps> = ({ slice }) => {
  const heading = slice.primary.heading;
  const backgroundHex = isFilled.contentRelationship(
    slice.primary.background_color
  )
    ? (slice.primary.background_color.data as any)?.value
    : undefined;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`relative py-16 md:py-24 text-off-white-500`}
      style={{ backgroundColor: backgroundHex ?? '#121212' }}
    >
      <div className="mx-auto max-w-[1536] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Heading */}
          <div className="md:col-span-1">
            <Heading as="h3" size="sm">
              <PrismicText field={heading} />
            </Heading>
          </div>

          {/* FAQ */}
          <div className="md:col-span-2">
            <Accordion type="single" collapsible className="w-full">
              {slice.primary.faq_items?.map((item, i) => {
                const id = `faq-${i}`;

                // ✅ Safely resolve question as a plain string (supports Key Text or Rich Text)
                const questionText = isFilled.richText(item.question as any)
                  ? asText(item.question as any)
                  : ((item.question as unknown as string) ??
                    'Untitled question');

                const hasAnswer = isFilled.richText(item.answer);

                return (
                  <AccordionItem key={id} value={id} className="px-4 sm:px-6">
                    <AccordionTrigger className="py-5 text-left text-base sm:text-2xl font-medium hover:no-underline [&[data-state=open]>svg]:rotate-180 font-nunito">
                      {questionText}
                    </AccordionTrigger>

                    {hasAnswer && (
                      <AccordionContent className="pb-6 text-sm leading-7 text-neutral-400">
                        <PrismicRichText
                          field={item.answer}
                          components={{
                            paragraph: ({ children }) => (
                              <p className="mb-4 last:mb-0">{children}</p>
                            ),
                            list: ({ children }) => (
                              <ul className="mb-4 list-disc pl-5 space-y-1">
                                {children}
                              </ul>
                            ),
                            oList: ({ children }) => (
                              <ol className="mb-4 list-decimal pl-5 space-y-1">
                                {children}
                              </ol>
                            ),
                            strong: ({ children }) => (
                              <strong className="text-neutral-200">
                                {children}
                              </strong>
                            ),
                          }}
                        />
                      </AccordionContent>
                    )}
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqWithHeading;
