#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .argument('<filepath1>') // передает юзер в консоль
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .action(() => {
    const opts = program.opts();
    console.log(genDiff(program.args[0], program.args[1], opts.format));
  });

program.parse();
// gendiff -h
// gendiff __fixtures__/file1.json __fixtures__/file2.json
// gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json
// gendiff --format json __fixtures__/file1.json __fixtures__/file2.json
