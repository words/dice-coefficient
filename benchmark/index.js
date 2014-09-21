'use strict';

var distance,
    words,
    natural,
    cljFuzzy;

/**
 * Module dependencies.
 */

distance = require('..');

/**
 * Optional module dependencies.
 */

try {
    natural = require('natural').DiceCoefficient;
    cljFuzzy = require('clj-fuzzy').metrics.dice;
} catch (error) {
    console.log(
        '\u001B[0;31m' +
        'The libraries needed by this benchmark could not be found. ' +
        'Please execute:\n' +
        '\tnpm run install-benchmark\n\n' +
        '\u001B[0m'
    );
}

/**
 * The first 1000 words from Letterpress:
 *   https://github.com/atebits/Words
 */

words = Array(11).join([
    'aa',
    'aah',
    'aahed',
    'aahing',
    'aahs',
    'aal',
    'aalii',
    'aaliis',
    'aals',
    'aardvark',
    'aardvarks',
    'aardwolf',
    'aardwolves',
    'aargh',
    'aarrgh',
    'aarrghh',
    'aarti',
    'aartis',
    'aas',
    'aasvogel',
    'aasvogels',
    'ab',
    'aba',
    'abac',
    'abaca',
    'abacas',
    'abaci',
    'aback',
    'abacs',
    'abacterial',
    'abactinal',
    'abactinally',
    'abactor',
    'abactors',
    'abacus',
    'abacuses',
    'abaft',
    'abaka',
    'abakas',
    'abalone',
    'abalones',
    'abamp',
    'abampere',
    'abamperes',
    'abamps',
    'aband',
    'abanded',
    'abanding',
    'abandon',
    'abandoned',
    'abandonedly',
    'abandonee',
    'abandonees',
    'abandoner',
    'abandoners',
    'abandoning',
    'abandonment',
    'abandonments',
    'abandons',
    'abandonware',
    'abandonwares',
    'abands',
    'abapical',
    'abas',
    'abase',
    'abased',
    'abasedly',
    'abasement',
    'abasements',
    'abaser',
    'abasers',
    'abases',
    'abash',
    'abashed',
    'abashedly',
    'abashes',
    'abashing',
    'abashless',
    'abashment',
    'abashments',
    'abasia',
    'abasias',
    'abasing',
    'abask',
    'abatable',
    'abate',
    'abated',
    'abatement',
    'abatements',
    'abater',
    'abaters',
    'abates',
    'abating',
    'abatis',
    'abatises',
    'abator',
    'abators',
    'abattis',
    'abattises',
    'abattoir',
    'abattoirs'
].join('|')).split('|');

/**
 * Benchmark this module.
 */

suite('dice-coefficient', function () {
    bench('op/s * 1,000', function () {
        words.forEach(function (word, index) {
            var prevWord;

            prevWord = words[index - 1] || words[words.length - 1];

            distance(prevWord, word);
        });
    });
});

/**
 * Benchmark `natural`.
 */

if (natural) {
    suite('natural', function () {
        bench('op/s * 1,000', function () {
            words.forEach(function (word, index) {
                var prevWord;

                prevWord = words[index - 1] || words[words.length - 1];

                natural(prevWord, word);
            });
        });
    });
}

/**
 * Benchmark `clj-fuzzy`.
 */

if (cljFuzzy) {
    suite('clj-fuzzy', function () {
        bench('op/s * 1,000', function () {
            words.forEach(function (word, index) {
                var prevWord;

                prevWord = words[index - 1] || words[words.length - 1];

                cljFuzzy(prevWord, word);
            });
        });
    });
}
