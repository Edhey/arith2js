let $tripleLessThan;

(($tripleLessThan = function($a) {
  return function($b) {
    return function($c) {
      return $a.lessThan($b) && $b.lessThan($c);
    };
  };
}, print($tripleLessThan(Complex('1'))(Complex('2'))(Complex('3')))), print($tripleLessThan(Complex('1'))(Complex('3'))(Complex('2')))), print($tripleLessThan(Complex('2'))(Complex('1'))(Complex('3'))); 