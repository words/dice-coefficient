# dice-coefficient [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[Sørensen–Dice coefficient][wiki].

## API

Install:

```bash
npm install dice-coefficient
```

Use:

```js
var dice = require('dice-coefficient');

dice('abc', 'abc'); // 1
dice('abc', 'xyz'); // 0
dice('night', 'nacht'); // 0.25
dice('night', 'nacht') === dice('NiGhT', 'NACHT'); // true
```

## CLI

Install:

```sh
npm install -g dice-coefficient
```

Use:

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

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/dice-coefficient.svg

[travis]: https://travis-ci.org/wooorm/dice-coefficient

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/dice-coefficient.svg

[codecov]: https://codecov.io/github/wooorm/dice-coefficient

[license]: LICENSE

[author]: http://wooorm.com

[wiki]: http://en.wikipedia.org/wiki/Sørensen–Dice_coefficient
