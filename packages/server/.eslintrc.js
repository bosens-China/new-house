module.exports = {
  extends: '../../.eslintrc.js',
  env: {
    jest: true,
  },
  rules: {
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    'no-console': 'off',
  },
};
