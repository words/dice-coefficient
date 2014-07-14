'use strict';

/* eslint-disable no-cond-assign */

var distance, source, natural, cljFuzzy;

distance = require('..');

try {
    natural = require('natural').DiceCoefficient;
    cljFuzzy = require('clj-fuzzy').metrics.dice;
} catch (error) {
    console.log(error);
    throw new Error(
        '\u001B[0;31m' +
        'The libraries needed by this benchmark could not be found. ' +
        'Please execute:\n' +
        '\tnpm run install-benchmark\n\n' +
        '\u001B[0m'
    );
}

/* The first 100 words from Letterpress: https://github.com/atebits/Words */
source = Array(11).join([
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

suite('dice-coefficient', function () {
    bench('op/s * 1,000', function (next) {
        var iterator = -1,
            previousValue = source[source.length - 1],
            value;

        while (value = source[++iterator]) {
            distance(previousValue, value);
            previousValue = value;
        }

        next();
    });
});

suite('natural', function () {
    bench('op/s * 1,000', function (next) {
        var iterator = -1,
            previousValue = source[source.length - 1],
            value;

        while (value = source[++iterator]) {
            natural(previousValue, value);
            previousValue = value;
        }

        next();
    });
});

suite('clj-fuzzy', function () {
    bench('op/s * 1,000', function (next) {
        var iterator = -1,
            previousValue = source[source.length - 1],
            value;

        while (value = source[++iterator]) {
            cljFuzzy(previousValue, value);
            previousValue = value;
        }

        next();
    });
});
