/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('shelljs');
const os = require('os');

const tag = process.argv[2];
const isWindows = os.platform() === 'win32';

exec('npm run build');
const image = `boses/reptiles:${tag}`;
let dockerBuildCode = `docker build -t ${image} .`;
if (!isWindows) {
  dockerBuildCode = `docker buildx build --platform=linux/amd64 -t ${image} .`;
}

exec(dockerBuildCode);
exec(`docker push ${image}`);
