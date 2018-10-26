#!/usr/bin/env node
'use strict'

var pack = require('./package.json')
var dice = require('.')

var argv = process.argv.slice(2)

/* Program. */
if (argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1) {
  console.log(help())
} else if (argv.indexOf('--version') !== -1 || argv.indexOf('-v') !== -1) {
  console.log(pack.version)
} else if (argv.length === 0) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function(data) {
    getEditDistance(data.trim().split(/\s+/g))
  })
} else {
  getEditDistance(argv.join(' ').split(/\s+/g))
}

/* Get the edit distance for a list of words. */
function getEditDistance(values) {
  if (values.length === 2) {
    console.log(dice(values[0], values[1]) || 0)
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
      '  # ' + dice('night', 'nacht'),
      '',
      '  # output edit distance from stdin',
      '  $ echo "saturday sunday" | ' + pack.name,
      '  # ' + dice('saturday', 'sunday')
    ].join('\n') + '\n'
  )
}
