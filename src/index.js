import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';
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
        value: objContentFileOne[key]
      };
      // уник ключ встречается в ключах 2 объекта, в первом нет
    } else if (keysObjContentFileTwo.includes(key) && !keysObjContentFileOne.includes(key)) {
      return {
        name: key,
        type: 'addedObjTwo',
        value: objContentFileTwo[key]
      };
      // уник ключ встречается и в первом и во втором, значения объекты
    } else if (objContentFileOne[key] instanceof Object && objContentFileTwo[key] instanceof Object) {
      return {
        name: key,
        type: 'object',
        children: getDiff(objContentFileOne[key], objContentFileTwo[key])
      };
      // уник ключ встречается и в первом и во втором, значения одинаковые, значения не объект
    } else if (objContentFileOne[key] === objContentFileTwo[key]) {
      return {
        name: key,
        type: 'staySame',
        value: objContentFileOne[key]
      };
      // уник ключ встречается и в первом и во втором, значения разные, значения не объект
    } else if (objContentFileOne[key] !== objContentFileTwo[key]) {
      return {
        name: key,
        type: 'different',
        valueObjOne: objContentFileOne[key],
        valueObjTwo: objContentFileTwo[key]
      };
    };
  });

      // // уник ключ встречается в ключах 1 объекта, во втором нет
    // if (keysObjContentFileOne.includes(key) && !keysObjContentFileTwo.includes(key)) {
    //   acc[`- ${key}`] = objContentFileOne[key];
    //   // уник ключ встречается в ключах 2 объекта, в первом нет
    // } else if (keysObjContentFileTwo.includes(key) && !keysObjContentFileOne.includes(key)) {
    //   acc[`+ ${key}`] = objContentFileTwo[key];
    //   // уник ключ встречается и в первом и во втором
    // } else if (keysObjContentFileOne.includes(key) && keysObjContentFileTwo.includes(key)) {
    //   // если значения ключа из первого и второго объектов совпадают
    //   if (objContentFileOne[key] === objContentFileTwo[key]) {
    //     acc[`  ${key}`] = objContentFileTwo[key];
    //   } else {
    //     acc[`- ${key}`] = objContentFileOne[key];
    //     acc[`+ ${key}`] = objContentFileTwo[key];
    //   }
    // }
    
  return treeDifference;
};
export default (filepathOriginalOne, filepathOriginalTwo) => { // general function (вызывается в gendiff.js)
  // получили контент из файлов
  const [objContentFileOne, objContentFileTwo] = getContentFile(filepathOriginalOne, filepathOriginalTwo);
  // получили разницу файлов в виде дерева
  const treeDiff = getDiff(objContentFileOne, objContentFileTwo);
  return treeDiff;
};
// const getStringFromObj = (filepathOriginalOne, filepathOriginalTwo) => { // из объекта в строку
//   const obj = getDiff(filepathOriginalOne, filepathOriginalTwo); // получили объект
//   const arr = Object.entries(obj); // получили массив
//   const str = arr.reduce((acc, element) => { // получили результат строкой
//     const newAcc = `${acc}${element[0]}: ${element[1]},\n`;
//     return newAcc;
//   }, '');
//   return `{\n${str}}`;
// };
