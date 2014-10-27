'use strict';

var getBigrams;

/**
 * Module dependencies.
 */

getBigrams = require('n-gram').bigram;

/**
 * Get the edit-distance according to Dice between two values.
 *
 * @param {*} value - First value.
 * @param {*} alternative - Second value.
 * @return {number} Edit distance.
 */

function diceCoefficient(value, alternative) {
    var pairs,
        alternativePairs,
        intersections,
        iterator,
        length,
        alternativeLength,
        alternativeIterator,
        alternativePair,
        pair;

    pairs = getBigrams(String(value).toLowerCase());
    alternativePairs = getBigrams(String(alternative).toLowerCase());
    intersections = 0;
    iterator = -1;
    alternativeLength = alternativePairs.length;
    length = pairs.length;

    while (++iterator < length) {
        pair = pairs[iterator];

        alternativeIterator = -1;

        while (++alternativeIterator < alternativeLength) {
            alternativePair = alternativePairs[alternativeIterator];

            if (pair === alternativePair) {
                intersections++;

                /**
                 * Make sure this pair never matches again
                 */

                alternativePairs[alternativeIterator] = '';
                break;
            }
        }
    }

    return 2 * intersections / (pairs.length + alternativeLength);
}

/**
 * Expose `diceCoefficient`.
 */

module.exports = diceCoefficient;
