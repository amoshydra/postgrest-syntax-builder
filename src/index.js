import PostresqlSyntaxBuilder from './postresql-syntax-builder';
import conditionMixin from './mixins/condition-mixin'
import verticalFilteringMixin from './mixins/vertical-filtering-mixin'
import orderingMixin from './mixins/ordering-mixin'
import limitsPaginationMixin from './mixins/limits-pagination-mixin'

export default Object.assign(
  (property) => new PostresqlSyntaxBuilder(property),
  conditionMixin,
  verticalFilteringMixin,
  orderingMixin,
  limitsPaginationMixin,
  {
    reduce(...syntaxBuilderInstance) {
      return syntaxBuilderInstance
        .map(({ param, value }) => [param, value])
        .reduce((acc, [x,y]) => (acc[x] = y, acc), {})
      ;
    },
  }
);
