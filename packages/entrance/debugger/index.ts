/* eslint-disable @typescript-eslint/no-non-null-assertion */
import webpack from 'webpack';
import config from '../webpack.config.js';
import path from 'path';
import { exec } from 'shelljs';

const newConfig = {
  ...config,
  entry: {
    index: path.resolve(__dirname, './demo.mts'),
  },
};

newConfig.output!.path = path.resolve(__dirname, '../demo');
newConfig.optimization!.minimize = false;

webpack(newConfig, (err, stats) => {
  const error = err || stats?.hasErrors();
  if (error) {
    console.error(error);
    process.exit(1);
  }
  exec(`node --enable-source-maps demo/index.js`);
});
