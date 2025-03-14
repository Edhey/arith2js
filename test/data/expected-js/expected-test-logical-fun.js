let $isPositive, $isLessThanTen, $isGreaterThanFive;

(((($isPositive = function($n) {
  return Complex('0').lessThan($n);
}, $isLessThanTen = function($n) {
  return $n.lessThan(Complex('10'));
}), $isGreaterThanFive = function($n) {
  return Complex('5').lessThan($n);
}), print(
  $isPositive(Complex('7')) && $isLessThanTen(Complex('7')) || $isGreaterThanFive(Complex('7'))
)), print(
  $isPositive(Complex('7').neg()) && $isLessThanTen(Complex('7').neg()) || $isGreaterThanFive(Complex('7').neg())
)), print(
  $isPositive(Complex('15')) && $isLessThanTen(Complex('15')) || $isGreaterThanFive(Complex('15'))
); 