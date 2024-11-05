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

const genDiffResult = genDiff;

test.each([ // проверка по формату stylish
  [pathFileJsonOne, pathFileJsonTwo],
  [pathFileYmlOne, pathFileYmlTwo],
  [pathFileJsonOne, pathFileYmlTwo],
  [pathFileYmlOne, pathFileJsonTwo],
])('stylish', (a, b) => {
  const pathFileResStylish = getFixturePath('resStylish.txt');
  const contentFileResStylish = readFileSync(pathFileResStylish, 'utf-8');
  expect(genDiffResult(a, b)).toBe(contentFileResStylish);
});
test.each([ // проверка по формату plain
  [pathFileJsonOne, pathFileJsonTwo, 'plain'],
  [pathFileYmlOne, pathFileYmlTwo, 'plain'],
  [pathFileJsonOne, pathFileYmlTwo, 'plain'],
  [pathFileYmlOne, pathFileJsonTwo, 'plain'],
])('plain', (a, b, c) => {
  const pathFileResPlain = getFixturePath('resPlain.txt');
  const contentFileResPlain = readFileSync(pathFileResPlain, 'utf-8');
  expect(genDiffResult(a, b, c)).toBe(contentFileResPlain);
});
test.each([ // проверка по формату json
  [pathFileJsonOne, pathFileJsonTwo, 'json'],
  [pathFileYmlOne, pathFileYmlTwo, 'json'],
  [pathFileJsonOne, pathFileYmlTwo, 'json'],
  [pathFileYmlOne, pathFileJsonTwo, 'json'],
])('json', (a, b, c) => {
  const pathFileResJson = getFixturePath('resJson.json');
  const contentFileResJson = readFileSync(pathFileResJson, 'utf-8');
  expect(genDiffResult(a, b, c)).toBe(contentFileResJson);
});
