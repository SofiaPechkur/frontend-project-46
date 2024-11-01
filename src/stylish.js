const getCorrectValue = (value) => { // переделываем значение из объекта в строку
  if (value instanceof Object) { // проверка - если объект
    const entries = Object.entries(value); // то из объекта в массив для reduce
    const newKeyValue = entries.reduce((acc, keyValue) => { // в конст ключ и значение
      // каждый раз проверяем keyValue на объект
      acc = `${acc}\n${keyValue[0]}: ${getCorrectValue(keyValue[1])}`;
      return acc;
    }, '');
    return newKeyValue; // возвращается ключ и значение
  }
  return value; // возвращается значение
};
const getFormatStylish = (treeDiff) => { // получаем нужный формат вывода
  const formatStylish = treeDiff.reduce((acc, key) => { // key включает name, type, value
    if (key.type === 'addedObjOne') {
      // value проверяется на объект
      acc = `${acc}\n- ${key.name}: ${getCorrectValue(key.value)}`;
    } else if (key.type === 'addedObjTwo') {
      acc = `${acc}\n+ ${key.name}: ${getCorrectValue(key.value)}`;
      // есть дети, идем рекурсией
    } else if (key.type === 'identicalKeyWithValObject') {
      acc = `${acc}\n  ${key.name}: ${getFormatStylish(key.children)}`;
    } else if (key.type === 'identicalKeyValStaySame') {
      acc = `${acc}\n  ${key.name}: ${getCorrectValue(key.value)}`;
    } else if (key.type === 'identicalKeyValDifferent') { //
      acc = `${acc}\n- ${key.name}: ${getCorrectValue(key.valueObjOne)}
+ ${key.name}: ${getCorrectValue(key.valueObjTwo)}`;
    }
    return acc;
  }, '');
  return formatStylish;
};
export default getFormatStylish;
