// @ts-check

import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

export default tseslint.config(
    {
        ignores: ['lib/**/*', 'eslint.config.mjs'],
    },
    ...compat.extends(
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'google',
        'plugin:@typescript-eslint/recommended',
    ),
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
        },
        rules: {
            quotes: ['error', 'single'],
            'import/no-unresolved': 0,
            'object-curly-spacing': ['error', 'always'],
            indent: ['error', 4],
            'max-len': ['error', { code: 120 }],
            'quote-props': ['error', 'as-needed'],
            'require-jsdoc': 'off',
            'valid-jsdoc': 'off',
        },
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: ['tsconfig.json', 'tsconfig.dev.json'],
            },
        },
    },
);
