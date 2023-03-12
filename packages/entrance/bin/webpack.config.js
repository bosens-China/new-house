const path = require('path');

const RunNodeWebpackPlugin = require('run-node-webpack-plugin');

const config = {
  target: 'node',
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: './src/index.mts',
  },
  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: '[name].cjs',
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
            cwd: path.resolve(__dirname, '../'),
          },
        },
      },
      {
        test: /\.(ejs|njk|env)$/i,
        use: require.resolve('raw-loader'),
        exclude: {
          and: [/node_modules/],
          // not: [/@new-house/],
        },
      },
      {
        test: /\.node$/,
        loader: require.resolve('node-loader'),
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.mts', '.js', '.json', '.cjs'],
    extensionAlias: {
      // '.js': ['.ts', '.js'],
      '.cjs': ['.cts', '.cjs'],
      '.mjs': ['.mts', '.mjs'],
    },
    // ...
  },
  plugins: [
    new RunNodeWebpackPlugin({
      nodeArgs: {
        execArgv: ['--enable-source-maps'],
      },
      runOnlyInWatchMode: true,
      scriptToRun: 'index.cjs',
    }),
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

module.exports = { config };
