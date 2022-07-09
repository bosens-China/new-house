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
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-no-script-url': 'off',
    'no-script-url': 'off',
  },
};
