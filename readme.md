# dice-coefficient

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[Sørensen–Dice coefficient][wiki].

## Install

[npm][]:

```sh
npm install dice-coefficient
```

## API

```js
var dice = require('dice-coefficient')

dice('abc', 'abc') // => 1
dice('abc', 'xyz') // => 0
dice('night', 'nacht') // => 0.25
dice('night', 'nacht') === dice('NiGhT', 'NACHT') // => true
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

[build-badge]: https://img.shields.io/travis/words/dice-coefficient.svg

[build]: https://travis-ci.org/words/dice-coefficient

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
