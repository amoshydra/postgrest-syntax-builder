import PostresqlSyntaxBuilder from '../postresql-syntax-builder';
import {
  isArray,
  isObject,
  isPlainObject,
} from 'lodash-es';
import {
  joinParam,
  withCondition,
  withOperation,
} from '../utilities';

const handleAsArray = (params) => {
  return new PostresqlSyntaxBuilder('select', withCondition(params, '', joinParam));
};

const handleAsObjectItem = (property, item) => {
  const processedItem = isArray(item) ? item : Object.keys(item);

  if (processedItem.length > 1) {
    return property + withCondition(processedItem, '(', joinParam);
  } else if (processedItem.length > 0) {
    return withOperation(property) + withCondition(processedItem[0]);
  } else {
    return property;
  }
};

const handleAsObject = (params) => {
  const paramsPairs = Object.entries(params)
    .map(([property, item]) => (
      isObject(item)
        ? handleAsObjectItem(property, item)
        : withOperation(property) + withCondition(item)
    ))
  ;
  return new PostresqlSyntaxBuilder('select', withCondition(paramsPairs, '', joinParam));
};

const handleAsString = (params) => {
  return new PostresqlSyntaxBuilder('select', withCondition(params));
};

export default {
  select(params = '*') {
    switch (true) {
      case isArray(params):
        return handleAsArray(params);

      case isPlainObject(params):
        return handleAsObject(params);

      default:
        return handleAsString(params);
    }
  },
};
