const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

const NodemonPlugin = require('nodemon-webpack-plugin');

const config = {
  target: 'node',
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: './src/index.mts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
          loader: require.resolve('babel-loader'),
          options: {
            cwd: __dirname,
          },
        },
      },
      {
        test: /\.(ejs|njk)$/i,
        use: require.resolve('raw-loader'),
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
  plugins: [
    new CopyPlugin({
      patterns: [path.resolve(__dirname, '.env')],
    }),
    ...(process.env.NODE_ENV === 'development'
      ? [
          new NodemonPlugin({
            nodeArgs: ['--enable-source-map', '--debug=9222'],
          }),
        ]
      : []),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        cheerio: {
          test: /[\\/]node_modules[\\/]cheerio[\\/]/,
          name: 'cheerio',
          chunks: 'all',
        },
        nodemailer: {
          test: /[\\/]node_modules[\\/]nodemailer[\\/]/,
          name: 'nodemailer',
          chunks: 'all',
        },
        mongoose: {
          test: /[\\/]node_modules[\\/]mongoose[\\/]/,
          name: 'mongoose',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = config;
