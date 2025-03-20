const { Complex,print } = require("/home/usuario/practicas/02-Translating-Arithmetic-Expressions-to-JavaScript/arith2js-himar_edhey-hernandez-alu0101552392/src/support-lib.js");

/* end of preamble of generated code */

let $f, $g, $r, $h, $k, $e;

((((((($f = function($x) {
  return Complex('2').mul($x);
}, $g = function($x) {
  return Complex('3').mul($x);
}), $r = function($y) {
  return Complex('3').mul($y);
}), $h = $g.add($f)), $k = $g.mul($f)), $e = $g.equals($r)), print($h(Complex('1').add(Complex('i'))))), print($k(Complex('2').sub(Complex('i'))))), print($e(Complex('1'))); 