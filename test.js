'use strict';

/**
 * Dependencies.
 */

var diceCoefficient,
    assert;

diceCoefficient = require('./');
assert = require('assert');

/**
 * Tests.
 */

describe('diceCoefficient(value, alternative)', function () {
    it('should be `1` for `abc` and `abc`', function () {
        assert(diceCoefficient('abc', 'abc') === 1);
    });

    it('should be `0` for `abc` and `xyz`', function () {
        assert(diceCoefficient('abc', 'xyz') === 0);
    });

    it('should be `0.25` for `night` and `nacht`', function () {
        assert(diceCoefficient('night', 'nacht') === 0.25);
    });

    it('should match case insensitive', function () {
        assert(diceCoefficient('NIGHT', 'NaChT') === 0.25);
    });
});
