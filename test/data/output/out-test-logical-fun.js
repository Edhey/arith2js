const { complexLessThan,Complex,print } = require("/home/usuario/practicas/02-Translating-Arithmetic-Expressions-to-JavaScript/arith2js-himar_edhey-hernandez-alu0101552392/src/support-lib.js");

/* end of preamble of generated code */

let $isPositive, $isLessThanTen, $isGreaterThanFive;

(((($isPositive = function($n) {
  return complexLessThan(Complex('0'), $n);
}, $isLessThanTen = function($n) {
  return complexLessThan($n, Complex('10'));
}), $isGreaterThanFive = function($n) {
  return complexLessThan(Complex('5'), $n);
}), print(
  $isPositive(Complex('7')) && $isLessThanTen(Complex('7')) || $isGreaterThanFive(Complex('7'))
)), print(
  $isPositive(Complex('7').neg()) && $isLessThanTen(Complex('7').neg()) || $isGreaterThanFive(Complex('7').neg())
)), print(
  $isPositive(Complex('15')) && $isLessThanTen(Complex('15')) || $isGreaterThanFive(Complex('15'))
); 