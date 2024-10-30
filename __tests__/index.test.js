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
const pathFileRes = getFixturePath('res.txt');
const contentFileRes = readFileSync(pathFileRes, 'utf-8');

const genDiffResult = genDiff;

test('genDiffResultTrue', () => {
  expect(genDiffResult(pathFileJsonOne, pathFileJsonTwo)).toEqual(contentFileRes);
  expect(genDiffResult(pathFileYmlOne, pathFileYmlTwo)).toEqual(contentFileRes);
});
