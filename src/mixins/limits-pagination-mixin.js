import PostresqlSyntaxBuilder from '../postresql-syntax-builder';

export default {
  limit(limit = '') {
    return new PostresqlSyntaxBuilder('limit', limit);
  },
  offset(offset = '') {
    return new PostresqlSyntaxBuilder('offset', offset);
  },
};
