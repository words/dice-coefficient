import assert from 'node:assert/strict'
import cp from 'node:child_process'
import fs from 'node:fs'
import {PassThrough} from 'node:stream'
import {URL} from 'node:url'
import util from 'node:util'
import test from 'node:test'
import {diceCoefficient as m} from './index.js'

const exec = util.promisify(cp.exec)

/** @type {Record<string, unknown>} */
const pack = JSON.parse(
  String(fs.readFileSync(new URL('package.json', import.meta.url)))
)

test('api', function () {
  assert.equal(m('a', 'a'), 1, 'a / a')
  assert.equal(m('a', 'b'), 0, 'a / b')
  assert.equal(m('a', 'A'), 1, 'a / A')
  assert.equal(m('a', 'B'), 0, 'a / B')
  assert.equal(m('abc', 'abc'), 1, 'abc / abc')
  assert.equal(m(['ab', 'bc'], ['ab', 'bc']), 1, '[ab, bc] / [ab, bc]')
  assert.equal(m(['AB', 'BC'], ['ab', 'bc']), 1, '[AB, BC] / [ab, bc]')
  assert.equal(m('abc', 'xyz'), 0, 'abc / xyz')
  assert.equal(m(['ab', 'bc'], ['xy', 'yz']), 0, '[ab, bc] / [xy, yz]')
  assert.equal(m('night', 'nacht'), 0.25, 'night / nacht')
  assert.equal(m('NIGHT', 'NaChT'), 0.25, 'case insensitive')
})

test('cli', async function () {
  try {
    await exec('./cli.js abc')
    assert.fail('should not pass')
  } catch (error) {
    assert.ok(
      /Usage: dice-coefficient/.test(String(error)),
      'not enough arguments'
    )
  }

  try {
    await exec('./cli.js abc abc abc')
    assert.fail('should not pass')
  } catch (error) {
    assert.ok(
      /Usage: dice-coefficient/.test(String(error)),
      'too many arguments'
    )
  }

  assert.deepEqual(
    await exec('./cli.js abc abc'),
    {stdout: '1\n', stderr: ''},
    'same'
  )

  assert.deepEqual(
    await exec('./cli.js abc def'),
    {stdout: '0\n', stderr: ''},
    'not same'
  )

  await new Promise(function (resolve) {
    const input = new PassThrough()
    const subprocess = cp.exec('./cli.js', function (error, stdout, stderr) {
      assert.deepEqual([error, stdout, stderr], [null, '0\n', ''], 'stdin')
      setImmediate(resolve)
    })
    assert(subprocess.stdin, 'expected stdin on `subprocess`')
    input.pipe(subprocess.stdin)
    input.write('abc')
    setImmediate(function () {
      input.end(' def')
    })
  })

  const h = await exec('./cli.js -h')
  assert.ok(/\sUsage: dice-coefficient/.test(h.stdout), '-h')

  const help = await exec('./cli.js --help')
  assert.ok(/\sUsage: dice-coefficient/.test(help.stdout), '-h')

  assert.deepEqual(
    await exec('./cli.js -v'),
    {stdout: pack.version + '\n', stderr: ''},
    '-v'
  )

  assert.deepEqual(
    await exec('./cli.js --version'),
    {stdout: pack.version + '\n', stderr: ''},
    '--version'
  )
})
