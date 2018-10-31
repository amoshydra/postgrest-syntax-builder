import PostresqlSyntaxBuilder from '../postresql-syntax-builder';
import {
  joinParam,
  withCondition,
  withOperation,
} from '../utilities';

export default {
  or(...params) {
    return new PostresqlSyntaxBuilder('or', withCondition(params, '(', joinParam));
  },
  and(...params) {
    return new PostresqlSyntaxBuilder('and', withCondition(params, '(', joinParam));
  },
  not(predicate) {
    const intermediateParam = withOperation('not') + predicate.param;
    predicate.param = ''; // remove child param
    return new PostresqlSyntaxBuilder(intermediateParam, withCondition(predicate))
  },
};
