import clsx from 'clsx';
import * as React from 'react';

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** token sizes: xl → h-xxl, lg → h-xl, md → h1, sm → h2, xs → h3 (fallback h4) */
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  /** force uppercase (tokens have headings case-normal; buttons are uppercase) */
  uppercase?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Heading({
  as: Comp = 'h1',
  size = 'lg',
  uppercase = false,
  className,
  children,
}: HeadingProps) {
  const sizeClass =
    size === 'xl'
      ? 'text-h-xxl'
      : size === 'lg'
        ? 'text-h-xl'
        : size === 'md'
          ? 'text-h1'
          : size === 'sm'
            ? 'text-h2'
            : 'text-h3'; // xs

  return (
    <Comp
      className={clsx(
        'font-heading', // Tiny5
        sizeClass, // token font-size + lh + tracking + weight
        uppercase && 'uppercase',
        className
      )}
    >
      {children}
    </Comp>
  );
}
