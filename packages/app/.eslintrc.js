module.exports = {
  extends: '../../.eslintrc.js',
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        // project: ['./packages/*/tsconfig.json'],
      },
    },
  },
  rules: {
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['./vite.config.ts'] }],
  },
};
