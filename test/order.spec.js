import test from 'ava';
import p from '../src';

const stringify = item => `${item}`;
const testIs = t => (output, expected) => t.is(stringify(output), expected);

test('should construct simple order syntax', t => {
  testIs(t)(
    p.order('age'),
    'order=age'
  );
});

test('should construct order syntax with multiple params', t => {
  testIs(t)(
    p.order(['age', 'height']),
    'order=age,height'
  );
});

test('should construct order syntax with object param', t => {
  testIs(t)(
    p.order({
      age: {
        direction: p.order.direction.descending,
        nullsSort: 'nullsfirst'
      },
      height: {
        direction: p.order.direction.ascending,
        nullsSort: 'nullslast'
      },
    }),
    'order=age.nullsfirst.desc,height.nullslast.asc'
  );
});

test('should construct order syntax with object param with no property', t => {
  testIs(t)(
    p.order({
      age: {},
      height: {},
    }),
    'order=age,height'
  );
});
