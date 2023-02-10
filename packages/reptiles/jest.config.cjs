module.exports = {
  testEnvironment: 'node',
  resolver: '<rootDir>/mjsResolver.cjs',
  transform: {
    '^.+\\.m?(ts|tsx)?$': 'babel-jest',
    '^.+\\.m?(js|jsx)$': 'babel-jest',
  },
};
