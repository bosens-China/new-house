/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('shelljs');

const tag = process.argv[2];

exec('npm run build');
const image = `boses/reptiles:${tag}`;
exec(`docker build -t ${image} .`);
exec(`docker push ${image}`);
