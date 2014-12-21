#!/usr/bin/env node
'use strict';

/*
 * Dependencies.
 */

var diceCoefficient,
    pack;

pack = require('./package.json');
diceCoefficient = require('./');

/*
 * Detect if a value is expected to be piped in.
 */

var expextPipeIn;

expextPipeIn = !process.stdin.isTTY;

/*
 * Arguments.
 */

var argv;

argv = process.argv.slice(2);

/*
 * Command.
 */

var command;

command = Object.keys(pack.bin)[0];

/**
 * Help.
 *
 * @return {string}
 */
function help() {
    return [
        '',
        'Usage: ' + command + ' [options] <word> <word>',
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
        '$ ' + command + ' night nacht',
        '# ' + diceCoefficient('night', 'nacht'),
        '',
        '# output edit distance from stdin',
        '$ echo "saturday sunday" | ' + command,
        '# ' + diceCoefficient('saturday', 'sunday')
    ].join('\n  ') + '\n';
}

/**
 * Get the edit distance for a list of words.
 *
 * @param {Array.<string>} values
 */
function getEditDistance(values) {
    if (values.length === 2) {
        console.log(diceCoefficient(values[0], values[1]) || 0);
    } else {
        process.stderr.write(help());
        process.exit(1);
    }
}

/*
 * Program.
 */

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
} else if (!expextPipeIn) {
    getEditDistance([]);
} else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {
        getEditDistance(data.trim().split(/\s+/g));
    });
}
