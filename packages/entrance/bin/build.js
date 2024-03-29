const path = require('path');
const { config } = require('./webpack.config');
const _ = require('lodash');
const webpack = require('webpack');
const fs = require('fs-extra');

const mergeConfiguration = (mode, p) => {
  const newConfig = {
    entry: {
      index: p,
    },
    watch: mode === 'development',
    mode: mode,
    optimization: {
      minimize: mode === 'production',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
    ],
    stats: {
      colors: true,
      preset: 'minimal',
      // assets: false,
      // moduleTrace: false,
      // logging: 'error',
      source: true,
      // chunkGroupAuxiliary: false,
      warnings: false,
    },
  };

  return _.mergeWith(config, newConfig, (objValue, srcValue) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });
};
const build = (mode, p) => {
  const entry = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
  // 读取src/index.mts 内容然后临时写入一个文件，之后删除
  const content = fs.readFileSync(path.resolve(__dirname, '../src/index.mts'), 'utf-8');
  const filePath = path.resolve(__dirname, `../temporaryFolder/index${new Date().valueOf()}.mts`);
  const newContent = `${content}\nawait import('${entry.replace(/\\/g, '/').replace(/\.mts$/g, '.mjs')}');\n`;
  fs.outputFileSync(`${filePath}`, newContent);

  const webpackConfig = mergeConfiguration(mode, filePath);
  const fn = (err, stats) => {
    if (err) {
      if (err.details) {
        throw err.details;
      } else {
        throw err.stack || err;
      }
    }

    process.stdout.write(
      stats?.toString({
        ...webpackConfig.stats,
        // 生产模式，全部输出
        ...(mode === 'production' ? { preset: 'normal', warnings: true } : {}),
      }) + '\n',
    );

    // fs.removeSync(filePath);
    // exec(`node --enable-source-maps demo/index.js`);
  };
  webpack(webpackConfig, fn);
};

module.exports = {
  build,
};
