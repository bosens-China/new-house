import path from 'path';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

const config: webpack.Configuration = {
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
  plugins: [
    new CopyPlugin({
      patterns: [path.resolve(__dirname, '.env')],
    }),
  ],
  optimization: {
    minimize: false,
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

export default config;
