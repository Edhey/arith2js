const { complexLessThan,Complex,print } = require("/home/usuario/practicas/02-Translating-Arithmetic-Expressions-to-JavaScript/arith2js-himar_edhey-hernandez-alu0101552392/src/support-lib.js");

/* end of preamble of generated code */

let $sub, $isPositive, $c;

(((($sub = function($a) {
  return function($b) {
    return $a.sub($b);
  };
}, $isPositive = function($n) {
  return complexLessThan(Complex('0'), $n);
}), $c = $sub(Complex('3'))(Complex('5'))), print($isPositive($c))), print($isPositive($sub(Complex('5'))(Complex('3'))))), print($isPositive($c.add(Complex('1')))); 