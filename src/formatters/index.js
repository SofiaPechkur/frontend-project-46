import getFormatStylish from './stylish.js';
import getFormatPlain from './plain.js';

const chooseFormat = (treeDiff, format) => { // вывод результата по переданному формату
  switch (format) {
    case 'stylish':
      const formatStylish = getFormatStylish(treeDiff);
      return formatStylish;
    case 'plain':
      const formatPlain = getFormatPlain(treeDiff);
      return formatPlain.slice(1);
    default:
      throw new Error('error');
  }
};
export default chooseFormat;
