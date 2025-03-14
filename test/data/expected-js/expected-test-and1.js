let $sub, $isPositive, $c;

(((($sub = function($a) {
  return function($b) {
    return $a.sub($b);
  };
}, $isPositive = function($n) {
  return Complex('0').lessThan($n);
}), $c = $sub(Complex('3'))(Complex('5'))), print($isPositive($c))), print($isPositive($sub(Complex('5'))(Complex('3'))))), print($isPositive($c.add(Complex('1')))); 