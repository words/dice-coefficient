# dice-coefficient [![Build Status](https://travis-ci.org/wooorm/dice-coefficient.svg?branch=master)](https://travis-ci.org/wooorm/dice-coefficient) [![Coverage Status](https://img.shields.io/coveralls/wooorm/dice-coefficient.svg)](https://coveralls.io/r/wooorm/dice-coefficient?branch=master)

[![browser support](https://ci.testling.com/wooorm/dice-coefficient.png) ](https://ci.testling.com/wooorm/dice-coefficient)

---

The [Sørensen–Dice coefficient](http://en.wikipedia.org/wiki/Sørensen–Dice_coefficient) algorithm in JavaScript.

## Installation

NPM:
```sh
$ npm install dice-coefficient
```

Component.js:
```sh
$ component install wooorm/dice-coefficient
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

On a MacBook Air, it runs about 748,000 op/s (run the benchmarks yourself with `npm run benchmark`).

## License

  MIT
