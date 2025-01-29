import type { Config } from "tailwindcss";
import fluid, {extract} from 'fluid-tailwind';

export default {
  content: {files:[
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  extract},
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito-sans)"],
        nunito: ["var(--font-nunito)"],
      },
      colors: {
        // 'brand-green': "#537A5A",
        // 'brand-tan': "#D9C7B6",
        // 'brand-clay': '#E97F6E',
        // 'brand-sage': "#AAB7A3",
        // 'brand-charcoal': '#3B3B3B',
        // 'brand-yellow': '#F9C74F'
        // VIBRant
        // 'brand-green': "#4CAF50",
        // 'brand-orange': "#FF6F3C ",
        // 'brand-teal': '#00BFA5',
        // 'brand-purple': "#9C27B0",
        // 'brand-yellow': '#FFC107'
        //FRESH
        'brand-green': "#6B8E5E",
        'brand-orange': "#D88C65 ",
        'brand-beige': '#E6D7B9',
        'brand-sky-blue': "#A3C4BC",
        'brand-espresso': '#4A3828'
      }
    },
  },
  plugins: [fluid],
} satisfies Config;
