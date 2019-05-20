'use strict'

/* eslint-env browser */

var diceCoefficient = require('dice-coefficient')

var $inputs = document.querySelectorAll('input')
var $input = $inputs[0]
var $reference = $inputs[1]
var $output = document.querySelector('output')

$input.addEventListener('input', oninputchange)
$reference.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  $output.textContent = diceCoefficient($input.value, $reference.value)
}
