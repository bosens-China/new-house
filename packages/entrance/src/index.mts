/// <reference path="../../../environment.d.ts" />
/// <reference path="../../../global.d.ts" />

import { parse } from 'dotenv';
import env from '../../../.env';

const config = parse(env);

for (const [name, value] of Object.entries(config)) {
  if (process.env[name] === undefined) {
    process.env[name] = value;
  }
}
