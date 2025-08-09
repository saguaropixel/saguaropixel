import fluid, { extract, fontSize, screens } from 'fluid-tailwind';
import type { Config } from 'tailwindcss';
// import { Vibes } from "next/font/google";

export default {
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
    screens,
    fontSize,
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito-sans)'],
        nunito: ['var(--font-nunito)'],
      },
      colors: {
        'brand-green': '#4CAF50',
        'brand-yellow': '#FFC02A',
        'brand-red': '#C84125 ',
        'brand-white': '#FAFAFA',
        'brand-black': '#333333',
        'brand-neutral': '#F5F5F5',
        'brand-tan': '#FFF3BF',
      },
    },
  },
  plugins: [fluid],
} satisfies Config;
