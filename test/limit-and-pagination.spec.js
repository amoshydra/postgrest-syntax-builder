import test from 'ava';
import p from '../src';

const stringify = item => `${item}`;
const testIs = t => (output, expected) => t.is(stringify(output), expected);

test('should construct limit syntax', t => {
  testIs(t)(
    p.limit(20),
    'limit=20'
  );
});

test('should construct limit syntax without param', t => {
  testIs(t)(
    p.limit(),
    'limit='
  );
});

test('should construct offset syntax', t => {
  testIs(t)(
    p.offset(20),
    'offset=20'
  );
});

test('should construct offset syntax without param', t => {
  testIs(t)(
    p.offset(),
    'offset='
  );
});

