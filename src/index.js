import _ from 'lodash';
import parse from './parse.js';

export default (pathResolveOne, pathResolveTwo) => {
    return parse(pathResolveOne, pathResolveTwo);
};
