import clsx from 'clsx';
import type {
  CSSProperties,
  ComponentType,
  HTMLAttributes,
  ReactNode,
} from 'react';

type ContainerTag =
  | 'section'
  | 'div'
  | 'main'
  | 'article'
  | 'aside'
  | 'header'
  | 'footer'
  | 'nav';

type BoundedProps = {
  /** Only tags that can contain children, or any React component */
  as?: ContainerTag | ComponentType<any>;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>; // pragmatic: passes through common DOM props

export function Bounded({
  as: Comp = 'section',
  className,
  children,
  ...restProps
}: BoundedProps) {
  const Tag = Comp as any; // OK: we’re intentionally pragmatic here
  return (
    <Tag
      className={clsx(
        'px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32',
        className
      )}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Tag>
  );
}
