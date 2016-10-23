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
var neodoc = require('neodoc');

var help = _help();
var args = neodoc.run(help);

if (args['<word>']) {
  console.log(dice(args['<word>'][0], args['<word>'][1]) || 0);
} else {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (data) {
    var values = data.trim().split(/\s+/g);
    if (values.length === 2) {
      console.log(dice(values[0], values[1]) || 0);
    } else {
      process.stderr.write(help);
      process.exit(1);
    }
  });
}

/**
 * Help.
 *
 * @return {string}
 */
function _help() {
  return [
    '',
    'Usage: ' + pack.name + ' [options] [<word> <word>]',
    '',
    pack.description,
    '',
    'Options:',
    '',
    '  -h, --help           output usage information',
    '  -v, --version        output version number',
    '',
    'Example:',
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
