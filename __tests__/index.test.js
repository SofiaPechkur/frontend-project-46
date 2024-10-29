import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const pathFileOne = getFixturePath('file1.json');
const pathFileTwo = getFixturePath('file2.json');
const pathFileRes = getFixturePath('res.txt');
const contentFileRes = readFileSync(pathFileRes, 'utf-8');

const genDiffResult = genDiff;

test('genDiffResultTrue', () => {
  expect(genDiffResult(pathFileOne, pathFileTwo)).toEqual(contentFileRes);
});
