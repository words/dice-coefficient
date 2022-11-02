#!/usr/bin/env node
import process from 'node:process'
import fs from 'node:fs'
import {URL} from 'node:url'
import {diceCoefficient} from './index.js'

/** @type {Record<string, unknown>} */
const pack = JSON.parse(
  String(fs.readFileSync(new URL('package.json', import.meta.url)))
)

const argv = process.argv.slice(2)

if (argv.includes('--help') || argv.includes('-h')) {
  console.log(help())
} else if (argv.includes('--version') || argv.includes('-v')) {
  console.log(pack.version)
} else if (argv.length === 0) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function (data) {
    getEditDistance(String(data).trim().split(/\s+/g))
  })
} else {
  getEditDistance(argv.join(' ').split(/\s+/g))
}

/**
 * @param {Array.<string>} values
 */
function getEditDistance(values) {
  if (values.length === 2) {
    console.log(diceCoefficient(values[0], values[1]) || 0)
  } else {
    process.stderr.write(help())
    process.exit(1)
  }
}

function help() {
  return (
    [
      '',
      '  Usage: ' + pack.name + ' [options] <word> <word>',
      '',
      '  ' + pack.description,
      '',
      '  Options:',
      '',
      '    -h, --help           output usage information',
      '    -v, --version        output version number',
      '',
      '  Usage:',
      '',
      '  # output edit distance',
      '  $ ' + pack.name + ' night nacht',
      '  # ' + diceCoefficient('night', 'nacht'),
      '',
      '  # output edit distance from stdin',
      '  $ echo "saturday sunday" | ' + pack.name,
      '  # ' + diceCoefficient('saturday', 'sunday')
    ].join('\n') + '\n'
  )
}
