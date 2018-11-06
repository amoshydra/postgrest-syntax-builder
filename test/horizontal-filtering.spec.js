import test from 'ava';
import p from '../src';

const stringify = item => `${item}`;
const testIs = t => (output, expected) => t.is(stringify(output), expected);

test('should construct simple eq condition', t => {
  testIs(t)(
    p('age').eq(12),
    'age=eq.12'
  );
});

test('should construct multi param condition', t => {
  testIs(t)(
    p('flavor').in(['vanilla', 'chocolate', 'strawberry']),
    'flavor=in.(vanilla,chocolate,strawberry)'
  );
});

test('should construct multi param condition with comma inside', t => {
  testIs(t)(
    p('flavor').in(['vanilla', 'chocolate', 'mixed peanut, walnut']),
    'flavor=in.(vanilla,chocolate,"mixed peanut, walnut")'
  );
});
test('should construct multi param number', t => {
  testIs(t)(
    p('value').in([1, 2, 3]),
    'value=in.(1,2,3)'
  );
});

test('should construct `and` condition', t => {
  testIs(t)(
    p.and(
      p('age').gt(12),
      p('age').lt(18),
    ),
    'and=(age=gt.12,age=lt.18)'
  );
});

test('should construct `or` condition', t => {
  testIs(t)(
    p.or(
      p('age').gt(12),
      p('age').lt(18),
    ),
    'or=(age=gt.12,age=lt.18)'
  );
});

test('should construct simple chained `not` condition', t => {
  testIs(t)(
    p('age')
      .not()
      .gt(12),
    'age=not.gt.12'
  );
});

test('should construct `not` condition with property method', t => {
  const output = p.not(
    p.and(
      p('age').gt(12),
      p('age').lt(30),
    )
  );

  testIs(t)(
    output,
    'not.and=(age=gt.12,age=lt.30)'
  );

  t.is(output.param, 'not.and');
  t.is(output.value, '(age=gt.12,age=lt.30)');
});

test('should construct chained condition with modifier', t => {
  testIs(t)(
    p('my_tsv')
      .not()
      .phfts('The Fat Cats', 'english'),
    'my_tsv=not.phfts(english).The Fat Cats'
  );
});

test('should construct falsy as string', t => {
  testIs(t)(
    p('item')
      .is(null),
    'item=is.null'
  );
  testIs(t)(
    p('item').is(undefined), // eslint-disable-line no-undefined
    'item=is.undefined'
  );
  testIs(t)(
    p('item').is(false),
    'item=is.false'
  );
  testIs(t)(
    p('item').is(''),
    'item=is.'
  );
  testIs(t)(
    p('item').is(0),
    'item=is.0'
  );
  testIs(t)(
    p('item').is(NaN),
    'item=is.NaN'
  );
});
