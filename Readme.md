# dice-coefficient [![Build Status](https://img.shields.io/travis/wooorm/dice-coefficient.svg?style=flat)](https://travis-ci.org/wooorm/dice-coefficient) [![Coverage Status](https://img.shields.io/coveralls/wooorm/dice-coefficient.svg?style=flat)](https://coveralls.io/r/wooorm/dice-coefficient?branch=master)

[Sørensen–Dice coefficient](http://en.wikipedia.org/wiki/Sørensen–Dice_coefficient). Real fast. No cruft.

## Installation

npm:
```sh
$ npm install dice-coefficient
```

Component:
```sh
$ component install wooorm/dice-coefficient
```

Bower:
```sh
$ bower install dice-coefficient
```

## Usage

```js
var diceCoefficient = require('dice-coefficient');

diceCoefficient("abc", "abc"); // 1
diceCoefficient("abc", "xyz"); // 0
diceCoefficient("night", "nacht"); // 0.25

/* Case insensitive */
diceCoefficient("night", "nacht") === diceCoefficient("NiGhT", "NACHT"); // true
```

## Benchmark

On a MacBook Air, it runs about 781,000 op/s, which is more than 7.5 times faster than natural.

```
           dice-coefficient
  781 op/s » op/s * 1,000

           natural
  102 op/s » op/s * 1,000
```

## CLI

Install:
```sh
$ npm install dice-coefficient
```

Usage:
```
  Usage: dice-coefficient <string> <string>

  Options:

    -h, --help           output usage information
    -v, --version        output version number

  Usage:

  # output dice-coefficient
  $ dice-coefficient night nacht
  # 0.25
```

## License

MIT © [Titus Wormer](http://wooorm.com)
