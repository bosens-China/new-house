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
    stats: mode === 'development' ? 'minimal' : undefined,
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
        console.error(err.details);
      } else {
        console.error(err.stack || err);
      }
      return;
    }

    // const info = stats.toJson();
    // if (stats.hasErrors()) {
    //   console.error(info.errors);
    // }

    // // if (stats.hasWarnings()) {
    // //   console.warn(info.warnings);
    // // }
    process.stdout.write(stats?.toString() + '\n');

    // fs.removeSync(filePath);
    // exec(`node --enable-source-maps demo/index.js`);
  };
  webpack(webpackConfig, fn);
};

module.exports = {
  build,
};
