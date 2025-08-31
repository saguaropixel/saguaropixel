// eslint.config.ts
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Global TS rules → warn instead of error
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'prefer-const': 'warn',
    },
  },

  // Keep hooks strict (these are *real* bugs)
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
    },
  },

  // (Optional) your original per-file tweak can stay:
  {
    files: ['src/components/Bounded.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
