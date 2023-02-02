import path from 'path';
import webpack from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

const config: webpack.Configuration = {
  target: 'node',
  mode: 'production',
  entry: './src/index.mts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    clean: true,
  },
  experiments: {
    topLevelAwait: true,
  },

  module: {
    rules: [
      {
        test: /\.m?(js|ts)$/,
        exclude: {
          and: [/node_modules/],
          not: [/@new-house/],
        },
        use: {
          loader: 'babel-loader',
          options: {},
        },
      },
      {
        test: /\.ejs$/i,
        use: 'raw-loader',
        exclude: {
          and: [/node_modules/],
          not: [/@new-house/],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.mts', '.js', '.json'],
    extensionAlias: {
      // '.js': ['.ts', '.js'],
      '.cjs': ['.cts', '.cjs'],
      '.mjs': ['.mts', '.mjs'],
    },
    // ...
  },
};

export default config;
