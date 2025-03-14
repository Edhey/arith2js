let $isNegative, $isGreaterThanTen;

((($isNegative = function($n) {
  return $n.lessThan(Complex('0'));
}, $isGreaterThanTen = function($n) {
  return Complex('10').lessThan($n);
}), print($isNegative(Complex('5').neg()) || $isGreaterThanTen(Complex('5').neg()))), print($isNegative(Complex('5')) || $isGreaterThanTen(Complex('5')))), print($isNegative(Complex('15')) || $isGreaterThanTen(Complex('15'))); 