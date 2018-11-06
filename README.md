# PostgREST Syntax Builder

[![CircleCI](https://circleci.com/gh/amoshydra/postgrest-syntax-builder.svg?style=svg)](https://circleci.com/gh/amoshydra/postgrest-syntax-builder)
[![Known Vulnerabilities](https://snyk.io/test/github/amoshydra/postgrest-syntax-builder/badge.svg?targetFile=package.json)](https://snyk.io/test/github/amoshydra/postgrest-syntax-builder?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/45829fe93b3b9e209ba4/maintainability)](https://codeclimate.com/github/amoshydra/postgrest-syntax-builder/maintainability)

[![npm](https://nodei.co/npm/postgrest-syntax-builder.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/postgrest-syntax-builder)

This library implement the "Tables and Views" section listed here: http://postgrest.org/en/v5.1/api.html
- horizontal filtering
- vertical filtering
- ordering
- limits and pagination

# Install
```sh
npm install --save postgrest-syntax-builder
```

or

```sh
yarn add postgrest-syntax-builder
```

# Usage
Live example

[![Edit PostgREST Syntax Builder Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/k3pjrzv21v?expanddevtools=1&module=%2Fsrc%2Findex.js)

## Input
```js
import p from 'postgrest-syntax-builder'

// Input
const result = [
  p('age').gt(1),
  p.limit(30),
  p.not(
    p.and(
      p('age').gt(18),
      p('age').lt(24),
    )
  ),
]

// `result` is evaluated to an array of PostgrestSyntaxBuilder objects
[
  { param: 'age', value: 'gt.1' },
  { param: 'limit', value: '30' },
  { param: 'not.and', value: '(age=gt.18,age=lt.24)' },
]

// PostgrestSyntaxBuilder object extends the native String object, thus it can also be treated and used as String
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

# Development

## Building from source
```
yarn build
```

## Run test
```
yarn test
```

# Run example
After the project is built, you can test each built target.

## With browser (ES module & UMD)
```
yarn example
```


## With node (CommonJS)
```
node example
```

# Publishing

This project uses CircleCI to test, build and publish to npm registry. This workflow will be triggered whenever a new version tag is made.
