const { complexLessThan,Complex,print } = require("/home/usuario/practicas/02-Translating-Arithmetic-Expressions-to-JavaScript/arith2js-himar_edhey-hernandez-alu0101552392/src/support-lib.js");

/* end of preamble of generated code */

let $isNegative, $isGreaterThanTen;

((($isNegative = function($n) {
  return complexLessThan($n, Complex('0'));
}, $isGreaterThanTen = function($n) {
  return complexLessThan(Complex('10'), $n);
}), print($isNegative(Complex('5').neg()) || $isGreaterThanTen(Complex('5').neg()))), print($isNegative(Complex('5')) || $isGreaterThanTen(Complex('5')))), print($isNegative(Complex('15')) || $isGreaterThanTen(Complex('15'))); 