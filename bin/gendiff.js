#!/usr/bin/env node

import genDiff from '../src/index.js';
import { program } from 'commander';

program
    .name('gendiff')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .version('output the version number')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'output usage information');

program.parse();

genDiff();