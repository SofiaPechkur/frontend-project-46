import { readFileSync } from 'node:fs';

export default (filepathResolveOne, filepathResolveTwo) => {
  const contentFileOne = readFileSync(filepathResolveOne); // в конст содержимое файла
  const contentFileTwo = readFileSync(filepathResolveTwo);
  const objContentFileOne = JSON.parse(contentFileOne); // из json в js
  const objContentFileTwo = JSON.parse(contentFileTwo);
  return [objContentFileOne, objContentFileTwo];
};
