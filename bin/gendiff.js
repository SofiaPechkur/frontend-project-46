#!/usr/bin/env node

import genDiff from '../src/index.js';
import { program } from 'commander';

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('output the version number')
    .helpOption('-h, --help', 'output usage information');

program.parse();

genDiff();