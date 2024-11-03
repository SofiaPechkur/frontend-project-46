import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const pathFileJsonOne = getFixturePath('file1.json');
const pathFileJsonTwo = getFixturePath('file2.json');
const pathFileYmlOne = getFixturePath('file1.yml');
const pathFileYmlTwo = getFixturePath('file2.yml');
const pathFileResStylish = getFixturePath('resStylish.txt');
const contentFileResStylish = readFileSync(pathFileResStylish, 'utf-8');
const pathFileResPlain = getFixturePath('resPlain.txt');
const contentFileResPlain = readFileSync(pathFileResPlain, 'utf-8');

const genDiffResult = genDiff;

test('genDiffResultTrue', () => {
  // проверка по формату stylish
  expect(genDiffResult(pathFileJsonOne, pathFileJsonTwo)).toEqual(contentFileResStylish);
  expect(genDiffResult(pathFileYmlOne, pathFileYmlTwo)).toEqual(contentFileResStylish);
  expect(genDiffResult(pathFileJsonOne, pathFileYmlTwo)).toEqual(contentFileResStylish);
  expect(genDiffResult(pathFileYmlOne, pathFileJsonTwo)).toEqual(contentFileResStylish);
  // проверка по формату plain
  expect(genDiffResult(pathFileJsonOne, pathFileJsonTwo, 'plain')).toEqual(contentFileResPlain);
  expect(genDiffResult(pathFileYmlOne, pathFileYmlTwo, 'plain')).toEqual(contentFileResPlain);
  expect(genDiffResult(pathFileJsonOne, pathFileYmlTwo, 'plain')).toEqual(contentFileResPlain);
  expect(genDiffResult(pathFileYmlOne, pathFileJsonTwo, 'plain')).toEqual(contentFileResPlain);
});
