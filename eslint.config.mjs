import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: [
      'js/recommended',
      {
        rules: {
          semi: 'error',
          'prefer-const': 'error',
          'no-var': 'error',
          'no-console': 'error',
        },
      },
      eslintConfigPrettier,
    ],
    languageOptions: { globals: globals.browser },
  },
]);
