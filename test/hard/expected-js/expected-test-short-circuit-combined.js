let $isPositive, $isLessThanTen;

((($isPositive = function($n) {
  return Complex('0').lessThan($n);
}, $isLessThanTen = function($n) {
  return $n.lessThan(Complex('10'));
}), print($isPositive(Complex('5')) && $isLessThanTen(Complex('5')) || Complex('2'))), print(
  $isPositive(Complex('5').neg()) && $isLessThanTen(Complex('5').neg()) || Complex('1')
)), print(
  $isPositive(Complex('15')) && $isLessThanTen(Complex('15')) || Complex('1')
); 