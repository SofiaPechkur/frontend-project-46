import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';
import getFormatStylish from './stylish.js';
import parse from './parse.js';

// получаем контент из файлов
const getContentFile = (filepathOriginalOne, filepathOriginalTwo) => {
  const pathCwd = cwd(); // путь от корня операционки до текущей рабочей директории
  // преобразование в абсолют путь
  const filepathResolveOne = path.resolve(pathCwd, filepathOriginalOne);
  const filepathResolveTwo = path.resolve(pathCwd, filepathOriginalTwo);
  const objContentFileOne = parse(filepathResolveOne);
  const objContentFileTwo = parse(filepathResolveTwo);
  // получилось два объекта в массиве
  return [objContentFileOne, objContentFileTwo];
};
const getDiff = (objContentFileOne, objContentFileTwo) => { // разница файлов
  // объединили (без дубликатов)
  const tempObjWithUniqKeys = { ...objContentFileOne, ...objContentFileTwo };
  const keysUniqNoSorted = Object.keys(tempObjWithUniqKeys); // уникальные ключи
  const keysUniq = _.sortBy(keysUniqNoSorted); // сортировка по алфавиту
  const keysObjContentFileOne = Object.keys(objContentFileOne); // ключи первого объекта
  const keysObjContentFileTwo = Object.keys(objContentFileTwo); // ключи второго объекта

  const treeDifference = keysUniq.map((key) => { // новый массив с объектами со сравненными данными
    // уник ключ встречается в ключах 1 объекта, во втором нет
    if (keysObjContentFileOne.includes(key) && !keysObjContentFileTwo.includes(key)) {
      return {
        name: key,
        type: 'addedObjOne',
        value: objContentFileOne[key],
      };
      // уник ключ встречается в ключах 2 объекта, в первом нет
    } if (keysObjContentFileTwo.includes(key) && !keysObjContentFileOne.includes(key)) {
      return {
        name: key,
        type: 'addedObjTwo',
        value: objContentFileTwo[key],
      };
      // уник ключ встречается и в первом и во втором, значения объекты
    } if (objContentFileOne[key] instanceof Object && objContentFileTwo[key] instanceof Object) {
      return {
        name: key,
        type: 'identicalKeyWithValObject',
        children: getDiff(objContentFileOne[key], objContentFileTwo[key]),
      };
      // уник ключ встречается и в первом и во втором, значения одинаковые, значения не объект
    } if (objContentFileOne[key] === objContentFileTwo[key]) {
      return {
        name: key,
        type: 'identicalKeyValStaySame',
        value: objContentFileOne[key],
      };
      // уник ключ встречается и в первом и во втором, значения разные, значения не объект
    } if (objContentFileOne[key] !== objContentFileTwo[key]) {
      return {
        name: key,
        type: 'identicalKeyValDifferent',
        valueObjOne: objContentFileOne[key],
        valueObjTwo: objContentFileTwo[key],
      };
    }
  });
  return treeDifference;
};
export default (filepathOriginalOne, filepathOriginalTwo) => { // general function (вызывается в gendiff.js)
  // получили контент из файлов
  const [objContentFileOne, objContentFileTwo] = getContentFile(filepathOriginalOne, filepathOriginalTwo);
  // получили разницу файлов в виде дерева
  const treeDiff = getDiff(objContentFileOne, objContentFileTwo);
  // получили вывод в формате stylish
  const formatStylish = getFormatStylish(treeDiff);
  return formatStylish;
};
