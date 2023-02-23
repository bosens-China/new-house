#!/usr/bin/env node

const { program } = require('commander');

const { build } = require('./build.js');

program
  .command('serve')
  .argument('<path>')
  .action((p) => {
    build('development', p);
  });

program
  .command('build')
  .argument('<path>')
  .action((p) => {
    build('production', p);
  });

program.parse(process.argv);
