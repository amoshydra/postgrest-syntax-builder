// Assign p so that this script can be used in node/umd and es environment.
const p = (
  (typeof window !== 'undefined' && window.p)
  || (typeof require !== 'undefined' && require('../dist/index.cjs'))
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

console.group('\nRaw:');
console.log(examples);
console.groupEnd();

console.group('\nCompiled:');
console.log(p.reduce(...examples));
console.groupEnd();

console.group('\nFunction:');
console.dir(p);
console.groupEnd();
