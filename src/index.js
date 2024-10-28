import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';
import parse from './parse.js';

export default (filepathOriginalOne, filepathOriginalTwo) => {
  const pathCwd = cwd(); // путь от корня операционки до текущей рабочей директории
  // преобразование в абсолют путь
  const filepathResolveOne = path.resolve(pathCwd, filepathOriginalOne);
  const filepathResolveTwo = path.resolve(pathCwd, filepathOriginalTwo);
  // получилось два объекта в массиве
  const [objContentFileOne, objContentFileTwo] = parse(filepathResolveOne, filepathResolveTwo);

  // объединили (без дубликатов)
  const tempObjWithUniqKeys = { ...objContentFileOne, ...objContentFileTwo };
  const keysUniqNoSorted = Object.keys(tempObjWithUniqKeys); // уникальные ключи
  const keysUniq = _.sortBy(keysUniqNoSorted); // сортировка по алфавиту
  const keysObjContentFileOne = Object.keys(objContentFileOne); // ключи первого объекта
  const keysObjContentFileTwo = Object.keys(objContentFileTwo); // ключи второго объекта

  const objDifference = keysUniq.reduce((acc, key) => { // новый объект со сравненными данными
    // уник ключ встречается в ключах 1 объекта, во втором нет
    if (keysObjContentFileOne.includes(key) && !keysObjContentFileTwo.includes(key)) {
      acc[`- ${key}`] = objContentFileOne[key];
      // уник ключ встречается в ключах 2 объекта, в первом нет
    } else if (keysObjContentFileTwo.includes(key) && !keysObjContentFileOne.includes(key)) {
      acc[`+ ${key}`] = objContentFileTwo[key];
      // уник ключ встречается и в первом и во втором
    } else if (keysObjContentFileOne.includes(key) && keysObjContentFileTwo.includes(key)) {
      // если значения ключа из первого и второго объектов совпадают
      if (objContentFileOne[key] === objContentFileTwo[key]) {
        acc[`  ${key}`] = objContentFileTwo[key];
      } else {
        acc[`- ${key}`] = objContentFileOne[key];
        acc[`+ ${key}`] = objContentFileTwo[key];
      }
    }
    return acc;
  }, {});
  return objDifference;
};
