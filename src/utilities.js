const bracketPair = {
  '': '',
  '(': ')',
  '{': '}',
  '[': ']',
};

export const withParam = paramName => paramName ? `${paramName}=` : '';
export const withOperation = (propertyName, modifier) => (
  propertyName +
  (modifier ? `(${modifier})` : '') +
  '.'
);
export const withCondition = (value, wrapper = '', paramTransformFn = (x => x)) => (
  wrapper +
  paramTransformFn(value) +
  bracketPair[wrapper]
);

export const joinParam = (params) => params.join(',');
export const joinParamSafely = (params) => params
  .map(x => (`${x}`).includes(',') ? `"${x}"` : x)
  .join(',')
;

export const buildFunctionFromDefinition = (constructableClass) => ({
  key,
  wrapper,
  paramTransformFn,
  defaultProp,
}) => (
  function (value = defaultProp, modifier) {
    this.value += (
      withOperation(key, modifier) +
      withCondition(value, wrapper, paramTransformFn)
    );

    return new constructableClass(this.param, this.value);
  }
);
