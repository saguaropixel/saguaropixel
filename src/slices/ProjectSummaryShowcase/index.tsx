// src/slices/ProjectSummaryShowcase/index.tsx
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';

// (Optional) small helper to render an icon either from a Key Text (lucide name) or an Image
// If your "icon" is always an image, you can delete the string branch below.
import LaptopMock from '@/components/LaptopMock';
import * as Lucide from 'lucide-react';

type Props = SliceComponentProps<Content.ProjectSummaryShowcaseSlice>;

function FeatureIcon({ icon, className }: { icon: any; className?: string }) {
  // If it's an uploaded image
  if (isFilled.image(icon)) {
    return (
      <PrismicNextImage
        field={icon}
        className={cn('size-8 shrink-0 object-contain', className)}
      />
    );
  }

  // If it's a key text with a lucide icon name (e.g., "Check", "Star")
  const name: string | undefined =
    typeof icon === 'string' ? icon : icon?.toString?.();
  if (name) {
    const L = (Lucide as any)[name] as FC<{ className?: string }>;
    if (L) return <L className={cn('size-5 shrink-0', className)} />;
  }

  // Fallback dot
  return (
    <span
      className={cn(
        'inline-block size-2 rounded-full bg-neutral-400',
        className
      )}
    />
  );
}

const ProjectSummaryShowcase: FC<Props> = ({ slice }) => {
  const {
    main_title,
    subtitle,
    summary_title,
    summary_text,
    primary_button,
    features,
    preview_image,
  } = slice.primary as any;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#eef2f5] py-16 md:py-24"
    >
      <div className="mx-auto grid w-full max-w-[1536px] mb-16 px-4">
        {/* Main Title */}
        {isFilled.richText(main_title) && (
          <PrismicRichText field={main_title} />
        )}

        {/* Subtitle */}
        {isFilled.richText(subtitle) && <PrismicRichText field={subtitle} />}
      </div>
      <div className="mx-auto grid w-full max-w-[1536px] grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        {/* LEFT: copy */}
        <div>
          {/* Summary block */}
          {(isFilled.richText(summary_title) ||
            isFilled.richText(summary_text)) && (
            <div>
              {isFilled.richText(summary_title) && (
                <PrismicRichText field={summary_title} />
              )}
              {isFilled.richText(summary_text) && (
                <PrismicRichText field={summary_text} />
              )}
            </div>
          )}

          {/* Features */}
          {Array.isArray(features) && features.length > 0 && (
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-1">
              {features.map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-3 p-3">
                  <FeatureIcon icon={item?.icon} />
                  {isFilled.keyText?.(item?.text) ||
                  isFilled.richText?.(item?.text) ? (
                    <div className="text-lg">{item.text}</div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}

          {/* Primary Button */}
          {isFilled.link(primary_button) && (
            <PrismicNextLink field={primary_button} className="inline-block">
              <Button
                variant={'solid'}
                tone={'magenta'}
                size="lg"
                className="mt-4"
              >
                Learn more
              </Button>
            </PrismicNextLink>
          )}
        </div>

        {/* RIGHT: image */}
        <div className="relative mx-auto w-full max-w-[800px]">
          {isFilled.image(preview_image) && <LaptopMock img={preview_image} />}
        </div>
      </div>
    </section>
  );
};

export default ProjectSummaryShowcase;
