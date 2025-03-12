const { complexLessThan,Complex,print } = require("/home/usuario/practicas/02-Translating-Arithmetic-Expressions-to-JavaScript/arith2js-himar_edhey-hernandez-alu0101552392/src/support-lib.js");

/* end of preamble of generated code */

let $isPositive, $isLessThanTen;

((($isPositive = function($n) {
  return complexLessThan(Complex('0'), $n);
}, $isLessThanTen = function($n) {
  return complexLessThan($n, Complex('10'));
}), print($isPositive(Complex('5')) && $isLessThanTen(Complex('5')) || Complex('2'))), print(
  $isPositive(Complex('5').neg()) && $isLessThanTen(Complex('5').neg()) || Complex('1')
)), print(
  $isPositive(Complex('15')) && $isLessThanTen(Complex('15')) || Complex('1')
); 