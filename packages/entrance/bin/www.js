#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const { program } = require('commander');
const path = require('path');
const webpack = require('webpack');
const config = require('../webpack.config');
const fs = require('fs-extra');

program
  .command('serve')
  .argument('<path>')
  .action((p) => {
    const dist = path.resolve(process.cwd(), 'dist');
    const entry = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);

    build({
      debuggerBoolean: false,
      dist,
      entry,
    });
  });

program
  .command('build')
  .argument('<path>')
  .action((p) => {
    const dist = path.resolve(process.cwd(), 'dist');
    const entry = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);

    build({
      dist,
      entry,
    });
  });

program.parse(process.argv);

function build({ debuggerBoolean = true, dist, entry } = {}) {
  // 读取src/index.mts 内容然后临时写入一个文件，之后删除
  const content = fs.readFileSync(path.resolve(__dirname, '../src/index.mts'), 'utf-8');
  const filePath = path.resolve(__dirname, `../src/index${new Date().valueOf()}.mts`);
  const newContent = `${content}\nimport('${entry.replace(/\\/g, '/').replace(/\.mts$/g, '.mjs')}');\n`;

  fs.outputFileSync(filePath, newContent);
  const newConfig = {
    ...config,
    entry: {
      index: filePath,
    },
  };

  newConfig.output.path = dist;
  newConfig.optimization.minimize = debuggerBoolean;
  webpack(newConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      fs.removeSync(filePath);
      return;
    }

    // const info = stats.toJson();
    // if (stats.hasErrors()) {
    //   console.error(info.errors);
    // }

    // // if (stats.hasWarnings()) {
    // //   console.warn(info.warnings);
    // // }
    process.stdout.write(stats.toString() + '\n');

    fs.removeSync(filePath);
    // exec(`node --enable-source-maps demo/index.js`);
  });
}
