'use strict';

var diceCoefficient,
    assert;

/**
 * Module dependencies.
 */

diceCoefficient = require('./');
assert = require('assert');

/**
 * Unit tests.
 */

describe('diceCoefficient(value, alternative)', function () {
    it('should return a distance of `1` for `abc` and `abc`', function () {
        assert(diceCoefficient('abc', 'abc') === 1);
    });

    it('should return a distance of `0` for `abc` and `xyz`', function () {
        assert(diceCoefficient('abc', 'xyz') === 0);
    });

    it('should return a distance of `0.25` for `night` and `nacht`',
        function () {
            assert(diceCoefficient('night', 'nacht') === 0.25);
        }
    );

    it('should match case insensitive', function () {
        assert(diceCoefficient('NIGHT', 'NaChT') === 0.25);
    });
});
