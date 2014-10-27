# dice-coefficient [![Build Status](https://travis-ci.org/wooorm/dice-coefficient.svg?branch=master)](https://travis-ci.org/wooorm/dice-coefficient) [![Coverage Status](https://img.shields.io/coveralls/wooorm/dice-coefficient.svg)](https://coveralls.io/r/wooorm/dice-coefficient?branch=master)

The [Sørensen–Dice coefficient](http://en.wikipedia.org/wiki/Sørensen–Dice_coefficient) algorithm in JavaScript.

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

## Other Dice-coefficient implementations

- [NaturalNode/natural](https://github.com/NaturalNode/natural);
- [minuteman3/node-dice](https://github.com/minuteman3/node-dice) — Does not check bigrams, rather just unigrams. Thus producing different results (e.g., the difference between “nacht” and “night” according to node-dice is 0.6 rather than, [according to the formula](http://en.wikipedia.org/wiki/Dice%27s_coefficient#Formula), 0.25)

## Benchmark

Run the benchmark yourself:

```sh
$ npm run benchmark
```

On a MacBook Air, it runs about 725,000 op/s, which is more than 4 times faster than natural.

```
           dice-coefficient
  774 op/s » op/s * 1,000

           natural
   99 op/s » op/s * 1,000
```

## License

MIT © Titus Wormer
