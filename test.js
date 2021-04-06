import {exec} from 'child_process'
import fs from 'fs'
import {URL} from 'url'
import {PassThrough} from 'stream'
import {diceCoefficient as m} from './index.js'
import test from 'tape'

/** @type {Object.<string, unknown>} */
var pack = JSON.parse(
  String(fs.readFileSync(new URL('./package.json', import.meta.url)))
)

test('api', function (t) {
  t.equal(m('a', 'a'), 1, 'a / a')
  t.equal(m('a', 'b'), 0, 'a / b')
  t.equal(m('a', 'A'), 1, 'a / A')
  t.equal(m('a', 'B'), 0, 'a / B')
  t.equal(m('abc', 'abc'), 1, 'abc / abc')
  t.equal(m('abc', 'xyz'), 0, 'abc / xyz')
  t.equal(m('night', 'nacht'), 0.25, 'night / nacht')
  t.equal(m('NIGHT', 'NaChT'), 0.25, 'case insensitive')
  t.end()
})

test('cli', function (t) {
  var input = new PassThrough()
  var helps = ['-h', '--help']
  var versions = ['-v', '--version']

  t.plan(9)

  exec('./cli.js abc', function (error, stdout, stderr) {
    t.deepEqual(
      [error.code, stdout, /Usage: dice-coefficient/.test(stderr)],
      [1, '', true],
      'not enough arguments'
    )
  })

  exec('./cli.js abc abc abc', function (error, stdout, stderr) {
    t.deepEqual(
      [error.code, stdout, /Usage: dice-coefficient/.test(stderr)],
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

  var subprocess = exec('./cli.js', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '0\n', ''], 'stdin')
  })

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
