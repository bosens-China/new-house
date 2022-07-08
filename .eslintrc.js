module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    jest: true,
  },
  plugins: ['import', 'prettier'],

  rules: {
    'import/no-unresolved': 'error',
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
  },
};
