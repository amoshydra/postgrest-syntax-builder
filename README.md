# PostgREST Syntax Builder

[![CircleCI](https://circleci.com/gh/amoshydra/postgrest-syntax-builder.svg?style=svg)](https://circleci.com/gh/amoshydra/postgrest-syntax-builder)
[![Known Vulnerabilities](https://snyk.io/test/github/amoshydra/postgrest-syntax-builder/badge.svg?targetFile=package.json)](https://snyk.io/test/github/amoshydra/postgrest-syntax-builder?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/45829fe93b3b9e209ba4/maintainability)](https://codeclimate.com/github/amoshydra/postgrest-syntax-builder/maintainability)

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
