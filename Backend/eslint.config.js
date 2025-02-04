import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import tsparser from '@typescript-eslint/parser';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked
    ],
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node
      },
      parser: tsparser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
)