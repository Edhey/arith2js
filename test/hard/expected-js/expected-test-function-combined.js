const { complexLessThan,Complex,print } = require("/home/usuario/practicas/02-Translating-Arithmetic-Expressions-to-JavaScript/arith2js-himar_edhey-hernandez-alu0101552392/src/support-lib.js");

/* end of preamble of generated code */

let $isPositive, $isLessThanTen, $isGreaterThanFive, $isEqualToThree, $add, $subtract, $multiply, $divide;

((((((((((((((($isPositive = function($n) {
  return complexLessThan(Complex('0'), $n);
}, $isLessThanTen = function($n) {
  return complexLessThan($n, Complex('10'));
}), $isGreaterThanFive = function($n) {
  return complexLessThan(Complex('5'), $n);
}), $isEqualToThree = function($n) {
  return $n.equals(Complex('3'));
}), $add = function($a) {
  return function($b) {
    return $a.add($b);
  };
}), $subtract = function($a) {
  return function($b) {
    return $a.sub($b);
  };
}), $multiply = function($a) {
  return function($b) {
    return $a.mul($b);
  };
}), $divide = function($a) {
  return function($b) {
    return $a.div($b);
  };
}), print(
  $isPositive(Complex('7')) && $isLessThanTen(Complex('7')) || $isGreaterThanFive(Complex('7'))
)), print(
  $isPositive(Complex('7').neg()) && $isLessThanTen(Complex('7').neg()) || $isGreaterThanFive(Complex('7').neg())
)), print(
  $isPositive(Complex('15')) && $isLessThanTen(Complex('15')) || $isGreaterThanFive(Complex('15'))
)), print($isEqualToThree(Complex('3')) && !$isEqualToThree(Complex('4')))), print($isEqualToThree(Complex('4')) || !$isEqualToThree(Complex('3')))), print(
  complexLessThan($add(Complex('3'))(Complex('4')), $multiply(Complex('2'))(Complex('4')))
)), print(complexLessThan(
  $divide(Complex('20'))(Complex('4')),
  $subtract(Complex('10'))(Complex('5'))
))), print(
  $isPositive($add(Complex('3'))(Complex('4'))) && $isLessThanTen($multiply(Complex('2'))(Complex('4'))) || $isGreaterThanFive($subtract(Complex('10'))(Complex('5')))
)), print(
  $isPositive($subtract(Complex('3'))(Complex('4'))) && $isLessThanTen($divide(Complex('20'))(Complex('4'))) || $isGreaterThanFive($add(Complex('3'))(Complex('4')))
); 