import { readFileSync } from 'node:fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepathResolve) => {
  const contentFile = readFileSync(filepathResolve, 'utf-8'); // в конст содержимое файла
  const formatFile = path.extname(filepathResolve); // определяет расширение файла
  switch (formatFile) {
    case '.json':
      // возвращается контент из файла в виде объекта
      return JSON.parse(contentFile); // из json в js
    case '.yml':
      return yaml.load(contentFile); // из yml в js
    default:
      throw new Error('error');
  }
};
