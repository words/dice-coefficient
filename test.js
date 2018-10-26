'use strict'

var PassThrough = require('stream').PassThrough
var test = require('tape')
var execa = require('execa')
var version = require('./package').version
var dice = require('.')

test('api', function(t) {
  t.equal(dice('a', 'a'), 1, 'a / a')
  t.equal(dice('a', 'b'), 0, 'a / b')
  t.equal(dice('a', 'A'), 1, 'a / A')
  t.equal(dice('a', 'B'), 0, 'a / B')
  t.equal(dice('abc', 'abc'), 1, 'abc / abc')
  t.equal(dice('abc', 'xyz'), 0, 'abc / xyz')
  t.equal(dice('night', 'nacht'), 0.25, 'night / nacht')
  t.equal(dice('NIGHT', 'NaChT'), 0.25, 'case insensitive')
  t.end()
})

test('cli', function(t) {
  var input = new PassThrough()
  var help = ['-h', '--help']
  var versions = ['-v', '--version']

  t.plan(8)

  execa.stdout('./cli.js', ['abc', 'abc']).then(function(result) {
    t.equal(result, '1', 'arguments')
  })

  execa.stdout('./cli.js', {input: input}).then(function(result) {
    t.equal(result, '0', 'stdin')
  })

  input.write('abc')
  input.write(' ')

  setImmediate(function() {
    input.end('xyz')
  })

  execa.stderr('./cli.js', ['abc']).catch(function(error) {
    t.equal(error.code, 1, 'should exit with `1` on too few arguments')
  })

  execa.stderr('./cli.js', ['abc', 'abc', 'abc']).catch(function(error) {
    t.equal(error.code, 1, 'should exit with `1` on too many arguments')
  })

  help.forEach(function(flag) {
    execa.stdout('./cli.js', [flag]).then(function(result) {
      t.ok(/\s+Usage: dice-coefficient/.test(result), flag)
    })
  })

  versions.forEach(function(flag) {
    execa.stdout('./cli.js', [flag]).then(function(result) {
      t.equal(result, version, flag)
    })
  })
})
