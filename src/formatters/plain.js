const getType = (value) => { // вывод в зависимости от типа данных
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};
const getFormatPlain = (treeDiff, depth = 0, ancestry = '') => { // получаем нужный формат вывода
  const formatPlain = treeDiff.reduce((acc, key) => {
    if (key.type === 'addedObjOne') {
      return `${acc}\nProperty '${ancestry}${key.name}' was removed`;
    }
    if (key.type === 'addedObjTwo') {
      return `${acc}\nProperty '${ancestry}${key.name}' was added with value: ${getType(key.value)}`;
    }
    if (key.type === 'identicalKeyWithValObject') {
      return `${acc}${getFormatPlain(key.children, depth + 1, `${ancestry}${key.name}.`)}`; // в ancestry вся история key.name
    }
    if (key.type === 'identicalKeyValDifferent') {
      return `${acc}\nProperty '${ancestry}${key.name}' was updated. From ${getType(key.valueObjOne)} to ${getType(key.valueObjTwo)}`;
    }
    // (key.type === 'identicalKeyValStaySame')
    return acc;
  }, '');
  return formatPlain;
};
export default getFormatPlain;
