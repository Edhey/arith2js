const { print,Complex } = require("/home/usuario/practicas/02-Translating-Arithmetic-Expressions-to-JavaScript/arith2js-himar_edhey-hernandez-alu0101552392/src/support-lib.js");

/* end of preamble of generated code */

let $f;

$f = function($x) {
  return function($y) {
    return $x.add($y);
  };
}, print($f.add(Complex('2'))(Complex('3'))(Complex('5'))); 