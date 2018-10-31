import test from 'ava';
import p from '../src';

const stringify = item => `${item}`;
const testIs = t => (output, expected) => t.is(stringify(output), expected);

test('should construct select syntax', t => {
  testIs(t)(
    p.select(['first_name', 'age']),
    'select=first_name,age'
  );
});

test('should construct json select syntax', t => {
  testIs(t)(
    p.select(['id', 'json_data->>blood_type', 'json_data->phones']),
    'select=id,json_data->>blood_type,json_data->phones'
  );
});

test('should construct select syntax when param is not provided', t => {
  testIs(t)(
    p.select(),
    'select=*'
  );
});

test('should construct select syntax with object syntax', t => {
  testIs(t)(
    p.select({
      count: '*',
    }),
    'select=count.*'
  );
});

test('should construct select syntax with object,array syntax', t => {
  testIs(t)(
    p.select({
      title: {},
      directors: ['id', 'last_name'],
      video: ['id'],
    }),
    'select=title,directors(id,last_name),video.id'
  );
});
