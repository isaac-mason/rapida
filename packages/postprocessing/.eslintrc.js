module.exports = {
  env: {
    browser: true,
    'shared-node-browser': true,
    node: true,
    es6: true,
  },
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    rules: {
      curly: ['warn', 'multi-line', 'consistent'],
      'no-console': 'off',
      'no-empty-pattern': 'warn',
      'no-duplicate-imports': 'error',
      'import/no-unresolved': ['error', { commonjs: true, amd: true }],
      'import/export': 'error',
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#eslint-plugin-import
      // We recommend you do not use the following import/* rules, as TypeScript provides the same checks as part of standard type checking:
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  settings: {
    'import/extensions': ['.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.json'],
        paths: ['src'],
      },
      alias: {
        extensions: ['.ts', '.json'],
        map: [['@rapidajs/postprocessing', './src/index.tsx']],
      },
    },
  },
  overrides: [
    {
      files: ['src'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};