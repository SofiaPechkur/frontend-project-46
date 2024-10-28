#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .argument('<filepath1>') // передает юзер в консоль
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('output the version number')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action(() => {
    const filepathOriginalOne = '__fixtures__/file1.json'; // типа переданный путь до файла
    const filepathOriginalTwo = '__fixtures__/file2.json';
    console.log(genDiff(filepathOriginalOne, filepathOriginalTwo));
  });

program.parse();
