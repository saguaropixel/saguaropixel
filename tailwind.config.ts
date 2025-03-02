import type { Config } from "tailwindcss";
import fluid, {extract} from 'fluid-tailwind';
import { Vibes } from "next/font/google";

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
        // --primary-100:#5C6BC0;
        // --primary-200:#8e99f3;
        // --primary-300:#f6fcff;
        // --accent-100:#32cd32;
        // --accent-200:#006a00;
        // --text-100:#333333;
        // --text-200:#5c5c5c;
        // --bg-100:#F0F4F7;
        // --bg-200:#e6eaed;
        // --bg-300:#bdc1c4;
        
        // OPTION 2
        // --primary-100:#5C946E;
        // --primary-200:#417854;
        // --primary-300:#003b1b;
        // --accent-100:#F2C57D;
        // --accent-200:#8a6723;
        // --text-100:#333333;
        // --text-200:#5c5c5c;
        // --bg-100:#F0F4F7;
        // --bg-200:#e6eaed;
        // --bg-300:#bdc1c4;

        // option 4 (really like)
        // --primary-100:#FF5733;
        // --primary-200:#ff8a5f;
        // --primary-300:#fff3bf;
        // --accent-100:#2E8B57;
        // --accent-200:#c6ffe6;
        // --text-100:#333333;
        // --text-200:#5c5c5c;
        // --bg-100:#F0F4F7;
        // --bg-200:#e6eaed;
        // --bg-300:#bdc1c4;
        
        // northern az Vibes
        // --primary-100:#5C946E;
        // --primary-200:#417854;
        // --primary-300:#003b1b;
        // --accent-100:#F2C57C;
        // --accent-200:#8a6722;
        // --text-100:#333333;
        // --text-200:#5c5c5c;
        // --bg-100:#F0F4F7;
        // --bg-200:#e6eaed;
        // --bg-300:#bdc1c4;

        // fresh arizona rain
        // --primary-100:#4CAF50;
        // --primary-200:#2a9235;
        // --primary-300:#005100;
        // --accent-100:#FFC107;
        // --accent-200:#916400;
        // --text-100:#333333;
        // --text-200:#5c5c5c;
        // --bg-100:#ffffff;
        // --bg-200:#f5f5f5;
        // --bg-300:#cccccc;
          
          
          
          
          
          
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
