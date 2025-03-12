const { complexLessThan,print,Complex } = require("/home/usuario/practicas/02-Translating-Arithmetic-Expressions-to-JavaScript/arith2js-himar_edhey-hernandez-alu0101552392/src/support-lib.js");

/* end of preamble of generated code */

let $tripleLessThan;

(($tripleLessThan = function($a) {
  return function($b) {
    return function($c) {
      return complexLessThan($a, $b) && complexLessThan($b, $c);
    };
  };
}, print($tripleLessThan(Complex('1'))(Complex('2'))(Complex('3')))), print($tripleLessThan(Complex('1'))(Complex('3'))(Complex('2')))), print($tripleLessThan(Complex('2'))(Complex('1'))(Complex('3'))); 