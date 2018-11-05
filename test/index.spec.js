import test from 'ava';
import p from '../src';

const stringify = item => `${item}`;
const testIs = t => (output, expected) => t.is(stringify(output), expected);

test('should return empty string when called with no parameter', t => {
  testIs(t)(
    p(),
    ''
  );
});

test('should return correct key if called with action', t => {
  testIs(t)(
    p('age'),
    'age='
  );
});

test('should return object form containing param and value', t => {
  const output = p('age').eq(12);
  t.is(output.param, 'age');
  t.is(output.value, 'eq.12');
});

test('should return object form containing param and value for property method', t => {
  const output = p.offset(12);
  t.is(output.param, 'offset');
  t.is(output.value, 12);
});

test('should produce key value pairs with the given syntax inside reduce', t => {
  const output = p.reduce(
    p('project_id').eq(1),
    p.offset(2),
    p.limit(3),
    p.not(
      p.and(
        p('age').gt(4),
        p('age').lt(50)
      )
    ),
  );

  t.deepEqual(output, {
    project_id: 'eq.1',
    offset: 2,
    limit: 3,
    'not.and': '(age=gt.4,age=lt.50)',
  });
});
