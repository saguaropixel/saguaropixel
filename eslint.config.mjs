// eslint.config.ts
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // ✅ Per-file override (only Bounded.tsx)
  {
    files: ['src/components/Bounded.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
