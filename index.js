#!/usr/bin/env node

'use strict';

process.title = 'sc-changelog-formatter';

const fs = require('fs');
const convert = require('./convert');

if (process.argv.length <= 2) {
  console.log('Missing path to CHANGELOG.md');
  process.exit(-1);
}

const changelogPath = process.argv[2];

fs.readFile(changelogPath, (err, data) => {
  if (err) throw err;

  let changelog = data.toString();

  fs.writeFile(changelogPath + '.old', changelog, (err) => {
    if (err) throw err;

    console.log(`${changelogPath}.old saved`);
  });

  changelog = changelog.split('\n').map((line) => {
    return convert(line);
  }).join('\n');

  fs.writeFile(changelogPath, changelog, (err) => {
    if (err) throw err;

    console.log(`${changelogPath} updated`);
  });
});

