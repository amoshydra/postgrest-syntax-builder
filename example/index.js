// Assign p so that this script can be used in node/umd and es environment.
const p = (
  (typeof window !== 'undefined' && window.p)
  || (typeof require !== 'undefined' && ((global.print = require('./helpers/print-helper')), require('../dist/index.cjs')))
);

const examples = [
  p('age').gt(1),
  p.limit(30),
  p.not(
    p.and(
      p('age').gt(18),
      p('age').lt(24),
    )
  ),
];

const printer = print("#app");

printer("Raw", examples);
printer("Compiled", p.reduce(...examples));
printer("Use as String", examples.join("\n"));
printer("Function", p);
