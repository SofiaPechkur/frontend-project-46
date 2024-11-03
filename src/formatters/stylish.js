// считаем кол-во отступов, смещение по умолчанию 2
const getQuantityIndent = (depth, displacement = 2) => {
  const newDepth = depth; // глубина
  const basicQuantityIndent = 4; // базовое кол-во отступов
  // финальное кол-во отступов, в случае если value === объект => displacement = 0
  const quantityIndent = (newDepth * basicQuantityIndent) - displacement;
  return quantityIndent; // возвращается кол-во отступов
};
const getCorrectValue = (value, indent, depth) => { // переделываем значение из объекта в строку
  if (value instanceof Object) { // проверка - если объект
    const entries = Object.entries(value); // то из объекта в массив для reduce
    const newKeyValue = entries.reduce((acc, keyValue) => { // в конст ключ и значение
      // каждый раз проверяем keyValue на объект, indent равен 1 пробелу
      const newAcc = `${acc}\n${indent.repeat(getQuantityIndent(depth, 0))}${keyValue[0]}: ${getCorrectValue(keyValue[1], indent, depth + 1)}`;
      return newAcc;
    }, '');
    return `{${newKeyValue}\n${indent.repeat(getQuantityIndent(depth - 1, 0))}}`; // возвращается ключ и значение
  }
  return value; // возвращается значение
};
const getFormatStylish = (treeDiff, depth = 1) => { // получаем нужный формат вывода
  const indent = ' '; // тип отступа
  const formatStylish = treeDiff.reduce((acc, key) => { // key включает name, type, value
    if (key.type === 'addedObjOne') {
      // value проверяется на объект
      return `${acc}\n${indent.repeat(getQuantityIndent(depth))}- ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
    }
    if (key.type === 'addedObjTwo') {
      return `${acc}\n${indent.repeat(getQuantityIndent(depth))}+ ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
    } // есть дети, идем рекурсией
    if (key.type === 'identicalKeyWithValObject') {
      return `${acc}\n${indent.repeat(getQuantityIndent(depth))}  ${key.name}: ${getFormatStylish(key.children, depth + 1)}`;
    }
    if (key.type === 'identicalKeyValStaySame') {
      return `${acc}\n${indent.repeat(getQuantityIndent(depth))}  ${key.name}: ${getCorrectValue(key.value, indent, depth + 1)}`;
    }
    // else if (key.type === 'identicalKeyValDifferent')
    return `${acc}\n${indent.repeat(getQuantityIndent(depth))}- ${key.name}: ${getCorrectValue(key.valueObjOne, indent, depth + 1)}
${indent.repeat(getQuantityIndent(depth))}+ ${key.name}: ${getCorrectValue(key.valueObjTwo, indent, depth + 1)}`;
  }, '');
  return `{${formatStylish}\n${indent.repeat(getQuantityIndent(depth - 1, 0))}}`;
};
export default getFormatStylish;
