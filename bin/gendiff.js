#!/usr/bin/env node

import genDiff from '../src/index.js';
import { program } from 'commander';
!!!!!!import path from 'path';
!!!!!!!!import { cwd } from 'node:process';

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
        // в index.js const pathCwd = cwd(); // путь от корня операционки до текущей рабочей директории
        // в index.js const pathResolveOne = path.resolve(pathCwd, filepathOriginalOne); // преобразование в абсолют путь
        // в index.js const pathResolveTwo = path.resolve(pathCwd, filepathOriginalTwo);
        console.log(genDiff(!!!!!pathResolveOne, !!!!!!!pathResolveTwo));
    });

program.parse();
