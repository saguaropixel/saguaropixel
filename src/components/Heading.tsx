import { cn } from '@/lib/utils';
import * as React from 'react';

type HeadingSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'd1'
  | 'd2'
  | 'd3'
  | 'd4'
  | 'd5'
  | 'd6';

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** xs→h3, sm→h2, md→h1, lg→h-xl, xl→h-xxl; d1–d6 are big, fluid display sizes */
  size?: HeadingSize;
  uppercase?: boolean;
  /** tighter line-height for hero headings */
  tight?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

// token sizes + fluid display scales
const sizeClassMap: Record<HeadingSize, string> = {
  xs: 'text-h3',
  sm: 'text-h2',
  md: 'text-h1',
  lg: 'text-h-xl',
  xl: 'text-h-xxl',
  // Display scales (approx phone → xl desktop max)
  d1: 'text-[clamp(2.5rem,6vw,4rem)]', // ~40 → 64
  d2: 'text-[clamp(3.5rem,9vw,7rem)]', // ~56 → 112
  d3: 'text-[clamp(5rem,12vw,12.5rem)]', // ~80 → 200
  d4: 'text-[clamp(6.5rem,15vw,16rem)]', // ~104 → 256
  d5: 'text-[clamp(8rem,20vw,20rem)]', // ~128 → 320
  d6: 'text-[clamp(10rem,24vw,24rem)]', // ~160 → 384
};

export function Heading({
  as: Comp = 'h1',
  size = 'lg',
  uppercase = false,
  tight = false,
  className,
  style,
  children,
}: HeadingProps) {
  const sizeClass = sizeClassMap[size] ?? sizeClassMap.lg;

  return (
    <Comp
      className={cn(
        sizeClass,
        uppercase && 'uppercase',
        tight && 'leading-[0.9]',
        className
      )}
      style={style}
    >
      {children}
    </Comp>
  );
}
