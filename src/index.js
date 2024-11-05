import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import chooseFormat from './formatters/index.js';
import parse from './parse.js';

// получаем контент из файлов
const getContentFile = (filepathOriginalOne, filepathOriginalTwo) => {
  const pathCwd = cwd(); // путь от корня операционки до текущей рабочей директории
  // преобразование в абсолют путь
  const filepathResolveOne = path.resolve(pathCwd, filepathOriginalOne);
  const filepathResolveTwo = path.resolve(pathCwd, filepathOriginalTwo);
  // в конст содержимое файла
  const contentFileOne = readFileSync(filepathResolveOne, 'utf-8');
  const contentFileTwo = readFileSync(filepathResolveTwo, 'utf-8');
  // определяет расширение файла без точки
  const formatFileOne = path.extname(filepathResolveOne).slice(1);
  const formatFileTwo = path.extname(filepathResolveTwo).slice(1);
  const objContentFileOne = parse(contentFileOne, formatFileOne);
  const objContentFileTwo = parse(contentFileTwo, formatFileTwo);
  // получилось два объекта в массиве
  return [objContentFileOne, objContentFileTwo];
};
const getDiff = (objContentFileOne, objContentFileTwo) => { // разница файлов
  // объединили (без дубликатов)
  const tempObjWithUniqKeys = { ...objContentFileOne, ...objContentFileTwo };
  const keysUniqNoSorted = Object.keys(tempObjWithUniqKeys); // уникальные ключи
  const keysUniq = _.sortBy(keysUniqNoSorted); // сортировка по алфавиту
  const treeDifference = keysUniq.map((key) => { // новый массив с объектами со сравненными данными
    // уник ключ встречается в ключах 1 объекта, во втором нет
    if (Object.hasOwn(objContentFileOne, key) && !Object.hasOwn(objContentFileTwo, key)) {
      return {
        name: key,
        type: 'addedObjOne',
        value: objContentFileOne[key],
      };
    } // уник ключ встречается в ключах 2 объекта, в первом нет
    if (Object.hasOwn(objContentFileTwo, key) && !Object.hasOwn(objContentFileOne, key)) {
      return {
        name: key,
        type: 'addedObjTwo',
        value: objContentFileTwo[key],
      };
    } // уник ключ встречается и в первом и во втором, значения объекты
    if (objContentFileOne[key] instanceof Object && objContentFileTwo[key] instanceof Object) {
      return {
        name: key,
        type: 'identicalKeyWithValObject',
        children: getDiff(objContentFileOne[key], objContentFileTwo[key]),
      };
    } // уник ключ встречается и в первом и во втором, значения одинаковые, значения не объект
    if (objContentFileOne[key] === objContentFileTwo[key]) {
      return {
        name: key,
        type: 'identicalKeyValStaySame',
        value: objContentFileOne[key],
      };
    }
    // уник ключ встречается и в первом и во втором, значения разные, значения не объект
    return {
      name: key,
      type: 'identicalKeyValDifferent',
      valueObjOne: objContentFileOne[key],
      valueObjTwo: objContentFileTwo[key],
    };
  });
  return treeDifference;
};
// general function (вызывается в gendiff.js)
export default (filepathOriginalOne, filepathOriginalTwo, format = 'stylish') => {
  // получили контент из файлов
  const [objContFileOne, objContFileTwo] = getContentFile(filepathOriginalOne, filepathOriginalTwo);
  // получили разницу файлов в виде дерева
  const treeDiff = getDiff(objContFileOne, objContFileTwo);
  const resFormatDiff = chooseFormat(treeDiff, format);
  return resFormatDiff;
};
