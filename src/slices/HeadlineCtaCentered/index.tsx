// src/slices/HeadlineCtaCentered/index.tsx
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { createClient } from '@/prismicio';
import {
  asText,
  Content,
  isFilled,
  type ContentRelationshipField,
} from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { SliceComponentProps } from '@prismicio/react';

/** Props */
export type HeadlineCtaCenteredProps =
  SliceComponentProps<Content.HeadlineCtaCenteredSlice>;

/** Read hex from a Content Relationship to a Color token doc (expects a `value` field) */
async function readRelHex(rel: ContentRelationshipField | null | undefined) {
  if (!isFilled.contentRelationship(rel)) return undefined;

  // If you fetched with `fetchLinks: ['design_token_color.value']`, it will be inlined here:
  const inlined = (rel as any)?.data?.value as string | undefined;
  if (inlined) return inlined;

  // Fallback: one manual fetch (avoid doing this in big lists)
  const client = createClient();
  const linked = await client.getByID(rel.id);
  return (linked.data as any)?.value as string | undefined;
}

/** Component */
export default async function HeadlineCtaCentered({
  slice,
}: HeadlineCtaCenteredProps) {
  // Background color comes from a Color token document via Relationship
  const backgroundHex =
    (await readRelHex(slice.primary.background_color)) ?? '#171515'; // sensible dark fallback

  // Texts (accept Key Text or Rich Text)
  const headline = asText(slice.primary.headline) || '';
  const subtitle = asText(slice.primary.subtitle) || '';

  // CTA
  const hasCTA = isFilled.link(slice.primary.cta);
  const ctaLabel =
    ((slice.primary as any)?.cta_label as string | undefined) ?? 'Work with us';

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      style={{ backgroundColor: backgroundHex }}
      className="relative text-off-white-500"
    >
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        {/* hero block */}
        <div className="py-16 md:py-20 lg:py-40 flex flex-col items-center justify-center text-center gap-8 md:gap-10">
          {/* Filled top line */}
          <Heading
            as="h1"
            size="d4"
            tight={false}
            className={[
              'leading-[0.9] tracking-tight',
              // 'font-Tiny5',
              // fluid size: ~72px → ~200px
              // 'text-[clamp(3.5rem,9vw,12.5rem)]',
              'uppercase',
            ].join(' ')}
          >
            {headline}
          </Heading>

          {/* Outlined bottom line */}
          <Heading
            as="h1"
            size="d4"
            tight={false}
            className={[
              // 'leading-[0.9] font-pixel',
              // 'text-[clamp(3rem,9vw,11rem)]',
              // outline effect
              'text-transparent',
              'uppercase',
              'rounded-none',
            ].join(' ')}
            style={{
              WebkitTextStrokeWidth: 3,
              WebkitTextStrokeColor: '#fff',
            }}
          >
            {subtitle}
            <span style={{ WebkitTextFillColor: '#fff' }}>.</span>
          </Heading>

          {/* CTA */}
          {hasCTA && (
            <Button asChild tone={'magenta'} className="mt-12">
              <PrismicNextLink field={slice.primary.cta}>
                <span className="inline-flex items-center gap-2">
                  {ctaLabel}
                </span>
              </PrismicNextLink>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
