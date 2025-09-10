import fluid, { extract, screens } from 'fluid-tailwind';
import type { Config } from 'tailwindcss';
import { fontSizes, tokenColors, tokenShadows } from './src/tokens/mapTokens';

export default {
  darkMode: ['class'],
  content: {
    files: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/slices/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    extract,
  },
  theme: {
    // fluid-tailwind screens
    screens,
    extend: {
      /**
       * Font families
       * Make sure you define these CSS variables via next/font (recommended) or in :root
       * Example with next/font/local:
       *   const aktivRegular = localFont({ src: '...', variable: '--font-aktiv-regular' })
       *   const aktivBold = localFont({ src: '...', variable: '--font-aktiv-bold' })
       *   <html className={`${aktivRegular.variable} ${aktivBold.variable}`}>...</html>
       */
      // Fonts from next/font variables
      fontFamily: {
        heading: ['var(--font-jersey)'], // var(--font-tiny5)
        sans: ['var(--font-nunito-sans)'],
        tiny5: ['var(--font-jersey)'],
        nunito: ['var(--font-nunito-sans)'],
      },
      // Shadows from tokens
      boxShadow: {
        ...tokenShadows, // '2xs','xs','sm','md','lg','xl','2xl','focus','focus-error'
      },
      // Semantic sizes
      fontSize: {
        ...fontSizes,
      },
      // Colors from tokens
      colors: {
        // ← keep shadcn required keys
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        ...tokenColors, // e.g., magenta.500, turquoise.300, 'white', 'black', 'off-white.400', etc.
      },
      // fontFamily: {
      //   // Body text
      //   sans: ['var(--font-nunito-sans)', 'system-ui', 'sans-serif'],
      //   // Headings
      //   heading: ['var(--font-tiny5)', 'system-ui', 'sans-serif'],
      // },

      /**
       * Semantic font sizes
       * Using clamp() so it’s fluid between breakpoints (pairs nicely with fluid-tailwind).
       * You can tweak min / preferred / max values to match your design system.
       */
      // fontSize: {
      //   // Headings
      //   h1: [
      //     'clamp(2.25rem, 1.8rem + 1.8vw, 3rem)',
      //     { lineHeight: '1.1', letterSpacing: '-0.02em' },
      //   ],
      //   h2: [
      //     'clamp(1.875rem, 1.55rem + 1.3vw, 2.25rem)',
      //     { lineHeight: '1.15', letterSpacing: '-0.01em' },
      //   ],
      //   h3: ['clamp(1.5rem, 1.3rem + 0.8vw, 1.875rem)', { lineHeight: '1.2' }],
      //   h4: ['clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)', { lineHeight: '1.25' }],
      //   h5: ['1.125rem', { lineHeight: '1.35' }],
      //   h6: ['1rem', { lineHeight: '1.4', letterSpacing: '0' }],

      //   // Body text
      //   body: ['1rem', { lineHeight: '1.7' }],
      //   lead: ['1.125rem', { lineHeight: '1.8' }],

      //   // Small / fine print
      //   small: ['0.875rem', { lineHeight: '1.6' }],
      //   'x-small': ['0.8125rem', { lineHeight: '1.5' }],
      // },
      // fontSize: {
      //   sectionHeading1: [
      //     '96px',
      //     {
      //       lineHeight: '100%',
      //       letterSpacing: '-1%',
      //       fontWeight: 400,
      //     },
      //   ],
      //   sectionHeading2: [
      //     '64px',
      //     {
      //       lineHeight: '100%',
      //       letterSpacing: '-1%',
      //       fontWeight: 400,
      //     },
      //   ],
      //   heading1: [
      //     '64px',
      //     {
      //       lineHeight: '100%',
      //       letterSpacing: '-1%',
      //       fontWeight: 400,
      //     },
      //   ],
      //   heading2: [
      //     '48px',
      //     {
      //       lineHeight: '100%',
      //       letterSpacing: '-1%',
      //       fontWeight: 400,
      //     },
      //   ],
      //   heading3: [
      //     '38px',
      //     {
      //       lineHeight: '100%',
      //       letterSpacing: '-2%',
      //       fontWeight: 400,
      //     },
      //   ],
      //   heading4: [
      //     '28px',
      //     {
      //       lineHeight: '100%',
      //       letterSpacing: '-2%',
      //       fontWeight: 400,
      //     },
      //   ],
      //   monospaced: [
      //     '16px',
      //     {
      //       lineHeight: '100%',
      //       letterSpacing: '0%',
      //       fontWeight: 400,
      //     },
      //   ],
      //   buttonText: [
      //     '15px',
      //     {
      //       lineHeight: '100%',
      //       letterSpacing: '0%',
      //       fontWeight: 400,
      //     },
      //   ],
      //   hugeHeading1: [
      //     '142px',
      //     {
      //       lineHeight: '142px',
      //       letterSpacing: '0%',
      //       fontWeight: 400,
      //     },
      //   ],
      //   hugeHeading2: [
      //     '116px',
      //     {
      //       lineHeight: '116px',
      //       letterSpacing: '0%',
      //       fontWeight: 400,
      //     },
      //   ],
      //   subHeading40: [
      //     '40px',
      //     {
      //       lineHeight: '100%',
      //       letterSpacing: '-2%',
      //       fontWeight: 800,
      //     },
      //   ],
      //   subHeading32: [
      //     '32px',
      //     {
      //       lineHeight: '100%',
      //       letterSpacing: '-2%',
      //       fontWeight: 800,
      //     },
      //   ],
      //   'sub-heading-24': [
      //     '24px',
      //     {
      //       lineHeight: '100%',
      //       letterSpacing: '-2%',
      //       fontWeight: 800,
      //     },
      //   ],
      //   'paragraph-regular': [
      //     '18px',
      //     {
      //       lineHeight: '26px',
      //       letterSpacing: '0%',
      //       fontWeight: 400,
      //     },
      //   ],
      //   'paragraph-medium': [
      //     '18px',
      //     {
      //       lineHeight: '26px',
      //       letterSpacing: '0%',
      //       fontWeight: 500,
      //     },
      //   ],
      //   'paragraph-large-400': [
      //     '22px',
      //     {
      //       lineHeight: '30px',
      //       letterSpacing: '0%',
      //       fontWeight: 400,
      //     },
      //   ],
      // },

      // colors: {
      // 'brand-green': '#4CAF50',
      // 'brand-yellow': '#FFC02A',
      // 'brand-red': '#C84125 ',
      // 'brand-white': '#FAFAFA',
      // 'brand-black': '#333333',
      // 'brand-neutral': '#F5F5F5',
      // 'brand-tan': '#FFF3BF',
      //   magenta: {
      //     '100': '#FBD8E3',
      //     '200': '#F9AFC7',
      //     '300': '#F985AB',
      //     '400': '#F85C8F',
      //     '500': '#F62972',
      //     '600': '#C3205B',
      //     '700': '#991842',
      //     '800': '#6F102E',
      //     '900': '#46091A',
      //   },
      //   turquoise: {
      //     '100': '#D2F6FA',
      //     '200': '#D2F6FA',
      //     '300': '#70DEEC',
      //     '400': '#3FD3E5',
      //     '500': '#F62972',
      //     '600': '#0691A0',
      //     '700': '#046E7A',
      //     '800': '#034C54',
      //     '900': '#012D33',
      //   },
      //   offWhite: {
      //     '100': '#FFFFFF',
      //     '200': '#FAFBFC',
      //     '300': '#F5F8FA',
      //     '400': '#EEF2F5',
      //     '500': '#F0F4F7',
      //     '600': '#D5DCE1',
      //     '700': '#BBC5CD',
      //     '800': '#9FABB5',
      //     '900': '#7E8C97',
      //   },
      //   brown: {
      //     '100': '#E8E6E4',
      //     '200': '#CFCBC8',
      //     '300': '#B5B0AC',
      //     '400': '#7E7B78',
      //     '500': '#272523',
      //     '600': '#1F1D1C',
      //     '700': '#191716',
      //     '800': '#121110',
      //     '900': '#0B0A09',
      //   },
      //   green: {
      //     '100': '#D6FBF7',
      //     '200': '#A2F5EA',
      //     '300': '#6DEEDD',
      //     '400': '#3BE8D2',
      //     '500': '#19DEC8',
      //     '600': '#15B7A6',
      //     '700': '#10978B',
      //     '800': '#0B6F67',
      //     '900': '#074845',
      //   },
      //   yellow: {
      //     '100': '#FFF4CC',
      //     '200': '#FFE799',
      //     '300': '#FFDB66',
      //     '400': '#FFCE33',
      //     '500': '#FDB800',
      //     '600': '#C99300',
      //     '700': '#967000',
      //     '800': '#644C00',
      //     '900': '#332900',
      //   },
      //   blue: {
      //     '100': '#D0F1F8',
      //     '200': '#9CD8EA',
      //     '300': '#68BEDC',
      //     '400': '#34A4CD',
      //     '500': '#077B98',
      //     '600': '#06637',
      //     '700': '#054C5C',
      //     '800': '#04343E',
      //     '900': '#021D21',
      //   },
      //   white: '#FFFFFF',
      //   black: '#000000',
      //   background: 'hsl(var(--background))',
      //   foreground: 'hsl(var(--foreground))',
      //   card: {
      //     DEFAULT: 'hsl(var(--card))',
      //     foreground: 'hsl(var(--card-foreground))',
      //   },
      //   popover: {
      //     DEFAULT: 'hsl(var(--popover))',
      //     foreground: 'hsl(var(--popover-foreground))',
      //   },
      //   primary: {
      //     DEFAULT: 'hsl(var(--primary))',
      //     foreground: 'hsl(var(--primary-foreground))',
      //   },
      //   secondary: {
      //     DEFAULT: 'hsl(var(--secondary))',
      //     foreground: 'hsl(var(--secondary-foreground))',
      //   },
      //   muted: {
      //     DEFAULT: 'hsl(var(--muted))',
      //     foreground: 'hsl(var(--muted-foreground))',
      //   },
      //   accent: {
      //     DEFAULT: 'hsl(var(--accent))',
      //     foreground: 'hsl(var(--accent-foreground))',
      //   },
      //   destructive: {
      //     DEFAULT: 'hsl(var(--destructive))',
      //     foreground: 'hsl(var(--destructive-foreground))',
      //   },
      //   border: 'hsl(var(--border))',
      //   input: 'hsl(var(--input))',
      //   ring: 'hsl(var(--ring))',
      //   chart: {
      //     '1': 'hsl(var(--chart-1))',
      //     '2': 'hsl(var(--chart-2))',
      //     '3': 'hsl(var(--chart-3))',
      //     '4': 'hsl(var(--chart-4))',
      //     '5': 'hsl(var(--chart-5))',
      //   },
      // },

      // borderRadius: {
      //   lg: 'var(--radius)',
      //   md: 'calc(var(--radius) - 2px)',
      //   sm: 'calc(var(--radius) - 4px)',
      // },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [fluid, require('tailwindcss-animate')],
} satisfies Config;
