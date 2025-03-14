let $isPositive, $isLessThanTen, $isGreaterThanFive, $isEqualToThree, $add, $subtract, $multiply, $divide;

((((((((((((((($isPositive = function($n) {
  return Complex('0').lessThan($n);
}, $isLessThanTen = function($n) {
  return $n.lessThan(Complex('10'));
}), $isGreaterThanFive = function($n) {
  return Complex('5').lessThan($n);
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
  $add(Complex('3'))(Complex('4')).lessThan($multiply(Complex('2'))(Complex('4')))
)), print(
  $divide(Complex('20'))(Complex('4')).lessThan($subtract(Complex('10'))(Complex('5')))
)), print(
  $isPositive($add(Complex('3'))(Complex('4'))) && $isLessThanTen($multiply(Complex('2'))(Complex('4'))) || $isGreaterThanFive($subtract(Complex('10'))(Complex('5')))
)), print(
  $isPositive($subtract(Complex('3'))(Complex('4'))) && $isLessThanTen($divide(Complex('20'))(Complex('4'))) || $isGreaterThanFive($add(Complex('3'))(Complex('4')))
); 