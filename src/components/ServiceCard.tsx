// components/ServiceCard.tsx
import { CardContent, Card as UiCard } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LinkField, RichTextField } from '@prismicio/client';
import { isFilled } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import * as React from 'react';

type Props = {
  title: string;
  summary?: RichTextField | null;
  link?: LinkField | null;
  color?: string; // accent hex
  highlighted?: boolean;
};

// Type-safe CSS custom property (no `any`)
type AccentStyle = React.CSSProperties & {
  ['--accent']?: string;
};

export function ServiceCard({
  title,
  summary,
  link,
  color = '#ff2e7a',
  highlighted = false,
}: Props) {
  const style: AccentStyle = { '--accent': color };

  return (
    <UiCard
      aria-selected={highlighted}
      style={style}
      className={cn(
        'border-2 transition-colors group rounded-none',
        // default (dark)
        'bg-transparent border-neutral-700 text-white',
        // hover/focus -> accent color takeover
        'hover:bg-white hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]',
        'focus-within:bg-white focus-within:border-[color:var(--accent)] focus-within:text-[color:var(--accent)]',
        // highlighted = pinned hover state
        highlighted &&
          'bg-white border-[color:var(--accent)] text-[color:var(--accent)]'
      )}
    >
      <CardContent className="p-8 md:p-12 h-full flex flex-col justify-center min-h-[380px]">
        <h2
          className={cn(
            'font-heading text-4xl md:text-5xl leading-tight transition-colors',
            highlighted ? '[color:var(--accent)]' : 'text-white',
            'group-hover:[color:var(--accent)]'
          )}
        >
          {title}
        </h2>

        {summary && (
          <div
            className={cn(
              'mt-4 text-base transition-colors',
              highlighted
                ? '[color:var(--accent)]'
                : 'text-neutral-200/90 group-hover:[color:var(--accent)]'
            )}
          >
            <PrismicRichText field={summary} />
          </div>
        )}

        {link && isFilled.link(link) && (
          <div className="mt-6">
            <PrismicNextLink
              field={link}
              className={cn(
                'inline-block font-medium underline underline-offset-4 transition-colors',
                highlighted
                  ? '[color:var(--accent)]'
                  : 'text-neutral-200/90 group-hover:[color:var(--accent)]'
              )}
            >
              Learn more
            </PrismicNextLink>
          </div>
        )}
      </CardContent>
    </UiCard>
  );
}
