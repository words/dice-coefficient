'use strict'

var exec = require('child_process').exec
var PassThrough = require('stream').PassThrough
var test = require('tape')
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
  var helps = ['-h', '--help']
  var versions = ['-v', '--version']

  t.plan(9)

  exec('./cli.js abc', function(err, stdout, stderr) {
    t.deepEqual(
      [err.code, stdout, /Usage: dice-coefficient/.test(stderr)],
      [1, '', true],
      'not enough arguments'
    )
  })

  exec('./cli.js abc abc abc', function(err, stdout, stderr) {
    t.deepEqual(
      [err.code, stdout, /Usage: dice-coefficient/.test(stderr)],
      [1, '', true],
      'too many arguments'
    )
  })

  exec('./cli.js abc abc', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, '1\n', ''], 'same')
  })

  exec('./cli.js abc def', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, '0\n', ''], 'not same')
  })

  var subprocess = exec('./cli.js', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, '0\n', ''], 'stdin')
  })

  input.pipe(subprocess.stdin)
  input.write('abc')
  setImmediate(function() {
    input.end(' def')
  })

  helps.forEach(function(flag) {
    exec('./cli.js ' + flag, function(err, stdout, stderr) {
      t.deepEqual(
        [err, /\sUsage: dice-coefficient/.test(stdout), stderr],
        [null, true, ''],
        flag
      )
    })
  })

  versions.forEach(function(flag) {
    exec('./cli.js ' + flag, function(err, stdout, stderr) {
      t.deepEqual([err, stdout, stderr], [null, version + '\n', ''], flag)
    })
  })
})
