import * as React from 'react';
import { Heading } from './Heading';

type SectionHeadingProps = {
  title: React.ReactNode;
  lineColor?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  underlineWidth?: string | number;
  className?: string;
};

export function SectionHeading({
  title,
  lineColor = '#E7A917',
  // as = 'h1',
  underlineWidth = '80%',
  className,
}: SectionHeadingProps) {
  // const Tag = as;

  return (
    <div className="mb-16 text-center">
      <div
        className="relative inline-block"
        style={
          {
            ['--heading-underline' as any]: lineColor,
            ['--underline-width' as any]:
              typeof underlineWidth === 'number'
                ? `${underlineWidth}px`
                : underlineWidth,
          } as React.CSSProperties
        }
      >
        {/* <Tag
          className={cn(
            'font-heading uppercase text-4xl md:text-7xl leading-none tracking-[0.08em]',
            'text-neutral-900 dark:text-neutral-100',
            'pb-1',
            className
          )}
        >
          {title}
        </Tag> */}

        <Heading size="md" uppercase>
          {title}
        </Heading>

        {/* underline bar starting from the left of the text */}
        <span
          aria-hidden="true"
          className="absolute left-0 bottom-0 h-1.5 md:h-2 bg-[var(--heading-underline)]"
          style={{ width: 'var(--underline-width)' }}
        />
      </div>
    </div>
  );
}
