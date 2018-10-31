import {
  fromPairs,
} from 'lodash';
import {
  withParam,
  joinParam,
  joinParamSafely,
  buildFunctionFromDefinition,
} from './utilities';

class PostresqlSyntaxBuilder extends String {
  constructor(param, prepend = '', hasNotCondition = false) {
    super(param);
    this.param = param;
    this.value = prepend;
    this.hasNotCondition = hasNotCondition;
  }
  toString() {
    return withParam(this.param) + this.value;
  }
  valueOf() {
    return withParam(this.param) + this.value;
  }
}

// Additional instance methods
const buildFunctionFromDefinitionForClass = buildFunctionFromDefinition(PostresqlSyntaxBuilder);
const instanceMixin = [
  // Basic query
  { key: 'eq' },
  { key: 'gt' },
  { key: 'gte' },
  { key: 'lt' },
  { key: 'lte' },
  { key: 'neq' },
  { key: 'like' },
  { key: 'ilike' },
  { key: 'in', wrapper: '(', paramTransformFn: joinParamSafely },
  { key: 'is' },
  { key: 'fts' },
  { key: 'plfts' },
  { key: 'phfts' },
  { key: 'cs', wrapper: '{', paramTransformFn: joinParamSafely },
  { key: 'cd', wrapper: '{', paramTransformFn: joinParam },
  { key: 'ov', wrapper: '[', paramTransformFn: joinParam },
  { key: 'sl', wrapper: '(', paramTransformFn: joinParam },
  { key: 'sr', wrapper: '(', paramTransformFn: joinParam },
  { key: 'nxr', wrapper: '(', paramTransformFn: joinParam },
  { key: 'nxl', wrapper: '(', paramTransformFn: joinParam },
  { key: 'adj', wrapper: '(', paramTransformFn: joinParam },
  { key: 'not', defaultProp: ''},
]
  .map(definition => [definition.key, buildFunctionFromDefinitionForClass(definition)])
;

// Prepare for exportation
Object.assign(PostresqlSyntaxBuilder.prototype, fromPairs(instanceMixin));
export default PostresqlSyntaxBuilder;
