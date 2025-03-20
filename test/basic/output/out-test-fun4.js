const { Complex,print } = require("/home/usuario/practicas/02-Translating-Arithmetic-Expressions-to-JavaScript/arith2js-himar_edhey-hernandez-alu0101552392/src/support-lib.js");

/* end of preamble of generated code */

let $add, $square, $double;

(($add = function($f) {
  return function($g) {
    return function($x) {
      return $f($x).add($g($x));
    };
  };
}, $square = function($x) {
  return $x.mul($x);
}), $double = function($x) {
  return Complex('2').mul($x);
}), print($add($square)($double)(Complex('4'))); 