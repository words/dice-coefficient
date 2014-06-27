'use strict';

var diceCoefficient, assert;

diceCoefficient = require('..');
assert = require('assert');

describe('diceCoefficient()', function () {
    it('should work', function () {
        assert(diceCoefficient('abc', 'abc') === 1);
        assert(diceCoefficient('abc', 'xyz') === 0);
        assert(diceCoefficient('night', 'nacht') === 0.25);
    });

    it('should match case insensitive', function () {
        assert(diceCoefficient('NIGHT', 'NaChT') === 0.25);
    });
});
