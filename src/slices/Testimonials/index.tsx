// src/slices/Testimonials/index.tsx
import { Heading } from '@/components/Heading';
import type { Testimonial } from '@/components/testimonials/TestimonialCard';
import TestimonialsCarousel from '@/components/testimonials/TestimonialsCarousel';
import { createClient } from '@/prismicio';
import { asText, type Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';

type Props = SliceComponentProps<Content.TestimonialsSlice>;

const DEFAULT_CARD_ACCENT = '#0E748A';

export default async function TestimonialsSlice({ slice }: Props) {
  const client = createClient();

  let items: Testimonial[] = [];

  // Section background (Content Relationship -> brand_color with { name, value })
  const sectionBgHex: string | undefined =
    (slice.primary as any)?.background_color?.data?.value || undefined;

  // const isManual = slice.variation === 'manual' || slice.variation === 'Manual';

  if (slice.variation === 'default') {
    // Manual: items[] contain relationships to testimonial + (optional) color override
    const rows = (slice.items ?? []) as any[];

    const testimonialIds = rows
      .map((it) => it.testimonial?.id)
      .filter(Boolean) as string[];

    const tDocs = testimonialIds.length
      ? await client.getByIDs(testimonialIds)
      : { results: [] as any[] };

    const tById = new Map(tDocs.results.map((d) => [d.id, d]));

    items = rows
      .map((it, i) => {
        const tDoc = tById.get(it.testimonial?.id);
        if (!tDoc) return null;
        const d: any = tDoc.data;

        // 1) Per-item override color from the slice row
        const itemAccent: string | undefined = it?.color?.data?.value;
        // 2) Fallback to the testimonial doc's own color relationship
        const docAccent: string | undefined = d?.color?.data?.value;
        const accent: string = itemAccent ?? docAccent ?? DEFAULT_CARD_ACCENT;
        const quote: string = Array.isArray(d.quote)
          ? (asText(d.quote) ?? '')
          : '';

        const mapped: Testimonial = {
          quote,
          name: d.author_name ?? '',
          company: d.company ?? d.author_title ?? '', // your card renders "company" under name
          avatarUrl: d.avatar?.url ?? undefined,
          accent,
          textColor: undefined, // brand_color only has {name, value}; remove if you later add a text color
        };

        return mapped;
      })
      .filter(Boolean) as Testimonial[];
  } else {
    // AUTO: testimonials have their own color relationship (data.color -> brand_color)
    const limit = Number((slice.primary as any)?.limit) || 6;
    const order = ((slice.primary as any)?.order as string) || 'Newest';

    const params: any = { pageSize: limit };

    if (order === 'Newest') {
      params.orderings = [
        { field: 'document.first_publication_date', direction: 'desc' },
      ];
    } else if (order === 'Oldest') {
      params.orderings = [
        { field: 'document.first_publication_date', direction: 'asc' },
      ];
    }
    // "Random" => we’ll shuffle after fetch

    const docs = await client.getByType('testimonial', params);

    const list =
      order === 'Random'
        ? [...docs.results].sort(() => Math.random() - 0.5).slice(0, limit)
        : docs.results;

    items = list.map((d: any, i: number) => {
      const quote = Array.isArray(d.data?.quote) ? asText(d.data.quote) : '';

      // 👇 Use the testimonial's own linked color if present
      const docAccent: string | undefined = d?.data?.color?.data?.value;
      const accent: string = docAccent ?? DEFAULT_CARD_ACCENT;

      const mapped: Testimonial = {
        quote,
        name: d.data?.author_name ?? '',
        company: d.data?.company ?? d.data?.author_title ?? '',
        avatarUrl: d.data?.avatar?.url ?? undefined,
        accent,
        textColor: undefined,
      };

      return mapped;
    });
  }

  if (!items.length) return null;

  const sectionTitle =
    ((slice.primary as any)?.section_title as string) || 'What our clients say';

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto px-6 md:px-10 py-16 md:py-24"
      style={sectionBgHex ? { backgroundColor: sectionBgHex } : undefined}
    >
      <Heading as="h2" size="sm" className="text-off-white-500 mb-8">
        {sectionTitle}
      </Heading>
      <TestimonialsCarousel items={items} />
    </section>
  );
}
