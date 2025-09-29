import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  // base
  'inline-flex items-center justify-center gap-2 font-heading text-btn uppercase transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ' +
    '[&_svg]:pointer-events-none [&_svg]:size-[1em] [&_svg]:shrink-0',
  {
    variants: {
      // surface style
      variant: {
        solid: '',
        outline: 'bg-transparent',
        ghost: 'bg-transparent',
        link: 'bg-transparent p-0 h-auto underline-offset-4', // text-style button
      },
      // color family (from your tokens)
      tone: {
        neutral: '', // uses shadcn CSS vars (works in dark mode)
        magenta: '',
        turquoise: '',
        blue: '',
        green: '',
        yellow: '',
      },
      size: {
        sm: 'h-10 px-3',
        md: 'h-12 px-4',
        lg: 'h-14 px-6',
        icon: 'h-10 w-10 p-0',
      },
      elevation: {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },

    // map (variant × tone) to classes
    compoundVariants: [
      // --- neutral uses shadcn tokens ---
      {
        variant: 'solid',
        tone: 'neutral',
        class: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      {
        variant: 'outline',
        tone: 'neutral',
        class:
          'border border-input text-foreground hover:bg-accent hover:text-accent-foreground',
      },
      {
        variant: 'ghost',
        tone: 'neutral',
        class: 'text-foreground hover:bg-accent',
      },
      {
        variant: 'link',
        tone: 'neutral',
        class: 'text-primary hover:underline',
      },

      // --- magenta ---
      {
        variant: 'solid',
        tone: 'magenta',
        class: 'bg-magenta-500 hover:bg-magenta-600 text-white',
      },
      {
        variant: 'outline',
        tone: 'magenta',
        class:
          'border border-magenta-500 text-magenta-700 hover:bg-magenta-100',
      },
      {
        variant: 'ghost',
        tone: 'magenta',
        class: 'text-magenta-700 hover:bg-magenta-100',
      },
      {
        variant: 'link',
        tone: 'magenta',
        class: 'text-magenta-600 hover:text-magenta-700 hover:underline',
      },

      // --- turquoise ---
      {
        variant: 'solid',
        tone: 'turquoise',
        class: 'bg-turquoise-500 hover:bg-turquoise-600 text-white',
      },
      {
        variant: 'outline',
        tone: 'turquoise',
        class:
          'border border-turquoise-500 text-turquoise-700 hover:bg-turquoise-100',
      },
      {
        variant: 'ghost',
        tone: 'turquoise',
        class: 'text-turquoise-700 hover:bg-turquoise-100',
      },
      {
        variant: 'link',
        tone: 'turquoise',
        class: 'text-turquoise-600 hover:text-turquoise-700 hover:underline',
      },

      // --- blue ---
      {
        variant: 'solid',
        tone: 'blue',
        class: 'bg-blue-500 hover:bg-blue-600 text-white',
      },
      {
        variant: 'outline',
        tone: 'blue',
        class: 'border border-blue-500 text-blue-700 hover:bg-blue-100',
      },
      {
        variant: 'ghost',
        tone: 'blue',
        class: 'text-blue-700 hover:bg-blue-100',
      },
      {
        variant: 'link',
        tone: 'blue',
        class: 'text-blue-600 hover:text-blue-700 hover:underline',
      },

      // --- green ---
      {
        variant: 'solid',
        tone: 'green',
        class: 'bg-green-500 hover:bg-green-600 text-white',
      },
      {
        variant: 'outline',
        tone: 'green',
        class: 'border border-green-500 text-green-700 hover:bg-green-100',
      },
      {
        variant: 'ghost',
        tone: 'green',
        class: 'text-green-700 hover:bg-green-100',
      },
      {
        variant: 'link',
        tone: 'green',
        class: 'text-green-600 hover:text-green-700 hover:underline',
      },

      // --- yellow ---
      {
        variant: 'solid',
        tone: 'yellow',
        class: 'bg-yellow-500 hover:bg-yellow-600 text-black',
      },
      {
        variant: 'outline',
        tone: 'yellow',
        class: 'border border-yellow-500 text-yellow-700 hover:bg-yellow-100',
      },
      {
        variant: 'ghost',
        tone: 'yellow',
        class: 'text-yellow-700 hover:bg-yellow-100',
      },
      {
        variant: 'link',
        tone: 'yellow',
        class: 'text-yellow-600 hover:text-yellow-700 hover:underline',
      },
    ],

    defaultVariants: {
      variant: 'solid',
      tone: 'neutral',
      size: 'md',
      elevation: 'md',
      block: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      tone,
      size,
      elevation,
      block,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, tone, size, elevation, block }),
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { buttonVariants };
