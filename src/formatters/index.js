import getFormatStylish from './stylish.js';
import getFormatPlain from './plain.js';

const chooseFormat = (treeDiff, format) => { // вывод результата по переданному формату
  switch (format) {
    case 'stylish':
      return getFormatStylish(treeDiff);
    case 'plain':
      return getFormatPlain(treeDiff).slice(1);
    case 'json':
      return JSON.stringify(treeDiff, null, 2);
    default:
      throw new Error('error');
  }
};
export default chooseFormat;
