#!/usr/bin/env node
/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module dice-coefficient
 * @fileoverview CLI for `dice-coefficient`.
 */

'use strict';

/* Dependencies. */
var pack = require('./package.json');
var dice = require('./');

/* Arguments. */
var argv = process.argv.slice(2);

/* Program. */
if (
  argv.indexOf('--help') !== -1 ||
  argv.indexOf('-h') !== -1
) {
  console.log(help());
} else if (
  argv.indexOf('--version') !== -1 ||
  argv.indexOf('-v') !== -1
) {
  console.log(pack.version);
} else if (argv.length) {
  getEditDistance(argv.join(' ').split(/\s+/g));
} else {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (data) {
    getEditDistance(data.trim().split(/\s+/g));
  });
}

/**
 * Get the edit distance for a list of words.
 *
 * @param {Array.<string>} values
 */
function getEditDistance(values) {
  if (values.length === 2) {
    console.log(dice(values[0], values[1]) || 0);
  } else {
    process.stderr.write(help());
    process.exit(1);
  }
}

/**
 * Help.
 *
 * @return {string}
 */
function help() {
  return [
    '',
    'Usage: ' + pack.name + ' [options] <word> <word>',
    '',
    pack.description,
    '',
    'Options:',
    '',
    '  -h, --help           output usage information',
    '  -v, --version        output version number',
    '',
    'Usage:',
    '',
    '# output edit distance',
    '$ ' + pack.name + ' night nacht',
    '# ' + dice('night', 'nacht'),
    '',
    '# output edit distance from stdin',
    '$ echo "saturday sunday" | ' + pack.name,
    '# ' + dice('saturday', 'sunday')
  ].join('\n  ') + '\n';
}
