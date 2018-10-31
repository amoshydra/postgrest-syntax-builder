import PostresqlSyntaxBuilder from '../postresql-syntax-builder';
import {
  joinParam,
  withCondition,
} from '../utilities';

export default {
  order: Object.assign(
    function(params) {
      switch (true) {
        case Array.isArray(params): {
          return new PostresqlSyntaxBuilder('order', withCondition(params, '', joinParam));
        }
        case (typeof params === 'object'): {
          const paramsPairs = Object.entries(params)
            .map(([key, {
              direction,
              nullsSort,
            }]) => [key, nullsSort, direction].filter(x => x).join('.'))
          ;

          return new PostresqlSyntaxBuilder('order', withCondition(paramsPairs, '', joinParam));
        }
        default: {
          return new PostresqlSyntaxBuilder('order', withCondition(params));
        }
      }
    },
    { // Additional Constants
      direction: {
        ascending: 'asc',
        descending: 'desc',
      },
    }
  ),
};
