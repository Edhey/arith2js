let $isPositive, $isNotPositive;

((($isPositive = function($n) {
  return Complex('0').lessThan($n);
}, $isNotPositive = function($n) {
  return !$isPositive($n);
}), print($isNotPositive(Complex('5').neg()))), print($isNotPositive(Complex('5')))), print($isNotPositive(Complex('0'))); 