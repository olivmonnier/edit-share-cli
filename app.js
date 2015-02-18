#!/usr/bin/env node

var path = require('path'),
  scan = require('./scan'),
  pkg = require(path.join(__dirname, 'package.json')),
  program = require('commander');

program
  .version(pkg.version)
  .option('-p, --port <port>', 'Port on which to listen to (defaults to 3000)',
    parseInt)
  .parse(process.argv);

scan(process.argv[2]);
