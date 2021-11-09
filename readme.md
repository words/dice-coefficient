# dice-coefficient

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[Sørensen–Dice coefficient][wiki].

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install dice-coefficient
```

## API

This package exports the following identifiers: `diceCoefficient`.
There is no default export.

```js
import {diceCoefficient} from 'dice-coefficient'

diceCoefficient('abc', 'abc') // => 1
diceCoefficient('abc', 'xyz') // => 0
diceCoefficient('night', 'nacht') // => 0.25
diceCoefficient('night', 'nacht') === dice('NiGhT', 'NACHT') // => true
```

Instead of strings you can also pass lists of bigrams.
This can improve performance when processing the same strings repeatedly.

```js
diceCoefficient(['ab', 'bc'], ['xy', 'yz']) // => 0
diceCoefficient(['ab', 'bc'], ['ab', 'bc']) // => 1
diceCoefficient(['ab', 'bc'], ['AB', 'BC']) // => 1
```

See [n-gram](https://github.com/words/n-gram) for a helpful utility function for generating bigrams.

```js
import {bigram} from 'n-gram'
const bigramifiedString1 = bigram('abc') // => ['ab', 'bc']
const bigramifiedString2 = bigram('xyz') // => ['xy', 'yz']

diceCoefficient(bigramifiedString1, bigramifiedString2) // => 0
```

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

## Related

*   [`levenshtein-edit-distance`](https://github.com/words/levenshtein-edit-distance)
    — Levenshtein edit distance
*   [`lancaster-stemmer`](https://github.com/words/lancaster-stemmer)
    — Lancaster stemming algorithm
*   [`double-metaphone`](https://github.com/words/double-metaphone)
    — Double Metaphone implementation
*   [`soundex-code`](https://github.com/words/soundex-code)
    — Fast Soundex implementation
*   [`syllable`](https://github.com/words/syllable)
    — Syllable count in an English word

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

[license]: license

[author]: https://wooorm.com

[wiki]: https://en.wikipedia.org/wiki/Sørensen–Dice_coefficient
