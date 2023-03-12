module.exports = {
  testEnvironment: 'node',
  resolver: '<rootDir>/mjsResolver.cjs',
  transform: {
    '^.+\\.m?(ts|tsx)?$': 'babel-jest',
    '^.+\\.m?(js|jsx)$': 'babel-jest',
    '\\.(njk|env|ejs)$': '<rootDir>/fileTransformer.cjs',
  },
  // transformIgnorePatterns: ['node_modules/(?!ora/.*)'],
  // moduleDirectories: ['@new-house/public/*', 'node_modules/ora/.*', 'src'],
  // moduleNameMapper: {
  //   '\\.(njk|ejs|env)$': '<rootDir>/raw.cjs',
  // },
};
