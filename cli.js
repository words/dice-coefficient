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
 * Arguments.
 */

var argv;

argv = process.argv.slice(2);

/**
 * Help.
 */
function help() {
    console.log([
        '',
        'Usage: dice-coefficient <string> <string>',
        '',
        'Options:',
        '',
        '  -h, --help           output usage information',
        '  -v, --version        output version number',
        '',
        'Usage:',
        '',
        '# output dice-coefficient',
        '$ dice-coefficient night nacht',
        '# 0.25'
    ].join('\n  ') + '\n');
}

/*
 * Program.
 */

if (
    argv.indexOf('--help') === 0 ||
    argv.indexOf('-h') === 0
) {
    help();
} else if (
    argv.indexOf('--version') === 0 ||
    argv.indexOf('-v') === 0
) {
    console.log(pack.version);
} else if (
    argv.length === 2 &&
    argv[0] &&
    argv[1]
) {
    console.log(diceCoefficient(argv[0], argv[1]));
} else {
    help();
}
