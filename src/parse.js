
import { readFileSync } from 'node:fs';

export default (pathResolveOne, pathResolveTwo) => {
    const pathFileOne = readFileSync(pathResolveOne); // в конст содержимое файла
    const pathFileTwo = readFileSync(pathResolveTwo);
    const objFileOne = JSON.parse(pathFileOne); // из json в js
    const objFileTwo = JSON.parse(pathFileTwo);
    return [objFileOne, objFileTwo];
};
