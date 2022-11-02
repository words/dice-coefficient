import assert from 'node:assert/strict'
import {exec} from 'node:child_process'
import fs from 'node:fs'
import {URL} from 'node:url'
import {PassThrough} from 'node:stream'
import test from 'tape'
import {diceCoefficient as m} from './index.js'

/** @type {Record<string, unknown>} */
const pack = JSON.parse(
  String(fs.readFileSync(new URL('package.json', import.meta.url)))
)

test('api', function (t) {
  t.equal(m('a', 'a'), 1, 'a / a')
  t.equal(m('a', 'b'), 0, 'a / b')
  t.equal(m('a', 'A'), 1, 'a / A')
  t.equal(m('a', 'B'), 0, 'a / B')
  t.equal(m('abc', 'abc'), 1, 'abc / abc')
  t.equal(m(['ab', 'bc'], ['ab', 'bc']), 1, '[ab, bc] / [ab, bc]')
  t.equal(m(['AB', 'BC'], ['ab', 'bc']), 1, '[AB, BC] / [ab, bc]')
  t.equal(m('abc', 'xyz'), 0, 'abc / xyz')
  t.equal(m(['ab', 'bc'], ['xy', 'yz']), 0, '[ab, bc] / [xy, yz]')
  t.equal(m('night', 'nacht'), 0.25, 'night / nacht')
  t.equal(m('NIGHT', 'NaChT'), 0.25, 'case insensitive')
  t.end()
})

test('cli', function (t) {
  const input = new PassThrough()
  const helps = ['-h', '--help']
  const versions = ['-v', '--version']

  t.plan(9)

  exec('./cli.js abc', function (error, stdout, stderr) {
    t.deepEqual(
      [error?.code, stdout, /Usage: dice-coefficient/.test(stderr)],
      [1, '', true],
      'not enough arguments'
    )
  })

  exec('./cli.js abc abc abc', function (error, stdout, stderr) {
    t.deepEqual(
      [error?.code, stdout, /Usage: dice-coefficient/.test(stderr)],
      [1, '', true],
      'too many arguments'
    )
  })

  exec('./cli.js abc abc', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '1\n', ''], 'same')
  })

  exec('./cli.js abc def', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '0\n', ''], 'not same')
  })

  const subprocess = exec('./cli.js', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '0\n', ''], 'stdin')
  })

  assert(subprocess.stdin, 'shoud have `stdin` on child process')
  input.pipe(subprocess.stdin)
  input.write('abc')
  setImmediate(function () {
    input.end(' def')
  })

  for (const flag of helps) {
    exec('./cli.js ' + flag, function (error, stdout, stderr) {
      t.deepEqual(
        [error, /\sUsage: dice-coefficient/.test(stdout), stderr],
        [null, true, ''],
        flag
      )
    })
  }

  for (const flag of versions) {
    exec('./cli.js ' + flag, function (error, stdout, stderr) {
      t.deepEqual(
        [error, stdout, stderr],
        [null, pack.version + '\n', ''],
        flag
      )
    })
  }
})
