'use strict';

var PassThrough = require('stream').PassThrough;
var test = require('tape');
var execa = require('execa');
var version = require('./package').version;
var dice = require('./');

test('api', function (t) {
  t.equal(dice('abc', 'abc'), 1, 'abc / abc');
  t.equal(dice('abc', 'xyz'), 0, 'abc / xyz');
  t.equal(dice('night', 'nacht'), 0.25, 'night / nacht');
  t.equal(dice('NIGHT', 'NaChT'), 0.25, 'case insensitive');
  t.end();
});

test('cli', function (t) {
  var input = new PassThrough();

  t.plan(8);

  execa.stdout('./cli.js', ['abc', 'abc']).then(function (result) {
    t.equal(result, '1', 'arguments');
  });

  execa.stdout('./cli.js', {input: input}).then(function (result) {
    t.equal(result, '0', 'stdin');
  });

  input.write('abc');
  input.write(' ');

  setImmediate(function () {
    input.end('xyz');
  });

  execa.stderr('./cli.js', ['abc']).catch(function (err) {
    t.equal(err.code, 1, 'should exit with `1` on too few arguments');
  });

  execa.stderr('./cli.js', ['abc', 'abc', 'abc']).catch(function (err) {
    t.equal(err.code, 1, 'should exit with `1` on too many arguments');
  });

  ['-h', '--help'].forEach(function (flag) {
    execa.stdout('./cli.js', [flag]).then(function (result) {
      t.ok(/\s+Usage: dice-coefficient/.test(result), flag);
    });
  });

  ['-v', '--version'].forEach(function (flag) {
    execa.stdout('./cli.js', [flag]).then(function (result) {
      t.equal(result, version, flag);
    });
  });
});
