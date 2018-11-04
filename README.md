# Postgrest Syntax Builder

This library implement the "Tables and Views" section listed here: http://postgrest.org/en/v5.1/api.html
- horizontal filtering
- vertical filtering
- ordering
- limits and pagination


# Examples
## Input
```js
const examples = [
  p('age').gt(1),
  p.limit(30),
  p.not(
    p.and(
      p('age').gt(18),
      p('age').lt(24),
    )
  ),
]
```

## Output
```js
[
  'age=gt.1',
  'limit=30',
  'not.and=(age=gt.18,age=lt.24)',
]
```

## Utility
A `reduce` function that transform this:
```js
p.reduce(...examples)
```

into this:
```js
{
  age: 'gt.1',
  limit: 30,
  'not.and': '(age=gt.18,age=lt.24)'
}
```
