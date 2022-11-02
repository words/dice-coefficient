# dice-coefficient

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[Sørensen–Dice coefficient][wiki].

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`diceCoefficient(value, other)`](#dicecoefficientvalue-other)
*   [CLI](#cli)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [Security](#security)
*   [License](#license)

## What is this?

This package exposes a string similarity algorithm.
That means it gets two strings (typically words), and turns it into a number
between `0` (completely different) and `1` (exactly the same).

## When should I use this?

You’re probably dealing with natural language, and know you need this, if
you’re here!

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+, 16.0+), install with [npm][]:

```sh
npm install dice-coefficient
```

In Deno with [`esm.sh`][esmsh]:

```js
import {diceCoefficient} from 'https://esm.sh/dice-coefficient@2'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {diceCoefficient} from 'https://esm.sh/dice-coefficient@2?bundle'
</script>
```

## Use

```js
import {diceCoefficient} from 'dice-coefficient'

diceCoefficient('abc', 'abc') // => 1
diceCoefficient('abc', 'xyz') // => 0
diceCoefficient('night', 'nacht') // => 0.25
diceCoefficient('night', 'nacht') === dice('NiGhT', 'NACHT') // => true
```

## API

This package exports the identifier `diceCoefficient`.
There is no default export.

### `diceCoefficient(value, other)`

Get the difference according to Sørensen–Dice.

> 👉 **Note**: you can pass bigrams (from [`n-gram`][n-gram]) too, which will
> improve performance when you are comparing the same values multiple times.

###### `value`

Primary value (`string`, `Array<String>`, required).

###### `other`

Other value (`string`, `Array<String>`, required).

##### Returns

Difference (`number`).

The result is normalized to a number between `0` (completely different)
and `1` (exactly the same).

## CLI

```txt
Usage: dice-coefficient [options] <word> <word>

Sørensen–Dice coefficient

Options:

  -h, --help           output usage information
  -v, --version        output version number

Usage:

# output edit distance
$ dice-coefficient night nacht
# 0.25

# output edit distance from stdin
$ echo "saturday sunday" | dice-coefficient
# 0.3333333333333333
```

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
It also works in Deno and modern browsers.

## Related

*   [`levenshtein-edit-distance`](https://github.com/words/levenshtein-edit-distance)
    — levenshtein edit distance
*   [`lancaster-stemmer`](https://github.com/words/lancaster-stemmer)
    — lancaster stemming algorithm
*   [`double-metaphone`](https://github.com/words/double-metaphone)
    — double metaphone algorithm
*   [`soundex-code`](https://github.com/words/soundex-code)
    — soundex algorithm
*   [`syllable`](https://github.com/words/syllable)
    — syllable count of English words

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

## Security

This package is safe.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/words/dice-coefficient/workflows/main/badge.svg

[build]: https://github.com/words/dice-coefficient/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/words/dice-coefficient.svg

[coverage]: https://codecov.io/github/words/dice-coefficient

[downloads-badge]: https://img.shields.io/npm/dm/dice-coefficient.svg

[downloads]: https://www.npmjs.com/package/dice-coefficient

[size-badge]: https://img.shields.io/bundlephobia/minzip/dice-coefficient.svg

[size]: https://bundlephobia.com/result?p=dice-coefficient

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[license]: license

[author]: https://wooorm.com

[wiki]: https://en.wikipedia.org/wiki/Sørensen–Dice_coefficient

[n-gram]: https://github.com/words/n-gram
