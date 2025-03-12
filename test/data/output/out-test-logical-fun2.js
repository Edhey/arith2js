const { Complex,complexLessThan,print } = require("/home/usuario/practicas/02-Translating-Arithmetic-Expressions-to-JavaScript/arith2js-himar_edhey-hernandez-alu0101552392/src/support-lib.js");

/* end of preamble of generated code */

let $isZero, $isPositive, $isNegative;

(((($isZero = function($n) {
  return $n.equals(Complex('0'));
}, $isPositive = function($n) {
  return complexLessThan(Complex('0'), $n);
}), $isNegative = function($n) {
  return complexLessThan($n, Complex('0'));
}), print(
  $isZero(Complex('4')) && $isPositive(Complex('4')) || $isNegative(Complex('4'))
)), print(
  $isZero(Complex('0')) && $isPositive(Complex('3')) || $isNegative(Complex('3'))
)), print(
  $isZero(Complex('2').neg()) && $isPositive(Complex('2').neg()) || $isNegative(Complex('2').neg())
); 