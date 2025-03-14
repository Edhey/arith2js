let $isZero, $isPositive, $isNegative;

(((($isZero = function($n) {
  return $n.equals(Complex('0'));
}, $isPositive = function($n) {
  return Complex('0').lessThan($n);
}), $isNegative = function($n) {
  return $n.lessThan(Complex('0'));
}), print(
  $isZero(Complex('4')) && $isPositive(Complex('4')) || $isNegative(Complex('4'))
)), print(
  $isZero(Complex('0')) && $isPositive(Complex('3')) || $isNegative(Complex('3'))
)), print(
  $isZero(Complex('2').neg()) && $isPositive(Complex('2').neg()) || $isNegative(Complex('2').neg())
); 