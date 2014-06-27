'use strict';

function getPairs(value) {
    value = String(value).toLowerCase();

    var iterator = -1,
        length = value.length - 1,
        pairs = [];

    while (++iterator < length) {
        pairs[iterator] = value.substring(iterator, iterator + 2);
    }

    return pairs;
}

function diceCoefficient(value, alternative) {
    var pairs = getPairs(value),
        alternativePairs = getPairs(alternative),
        intersections = 0,
        iterator = -1,
        alternativeLength = alternativePairs.length,
        alternativeIterator, alternativePair, pair;

    while (pair = pairs[++iterator]) {
        alternativeIterator = -1;

        while (++alternativeIterator < alternativeLength) {
            alternativePair = alternativePairs[alternativeIterator];

            if (pair === alternativePair) {
                intersections++;

                /* Make sure this pair never matches again */
                alternativePairs[alternativeIterator] = '';
                break;
            }
        }
    }

    return 2 * intersections / (pairs.length + alternativeLength);
}

module.exports = diceCoefficient;
