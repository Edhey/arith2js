// require('./monkey-patch-case.js');
// const Complex = require('complex.js');

// // Original Complex add function
// const oldComplex = Object.create(null);

// /**
//  * Represents the operators that can be used in the function
//  * @type {{add: string, mul: string, div: string, equals: string, pow: string, neg: string}}
//  */
// const ComplexOperators = {
//   add: '+', mul: '*', div: '/', equals: '==', pow: '**', neg: '-'
// };

// /**
//  * Function that compares two complex numbers and returns true if the first one 
//  * is less than the second one.
//  * First, it compares the real part of the numbers, and if they are equal,
//  * it compares the imaginary part.
//  * @param {Complex} complex1 First complex number to compare
//  * @param {Complex} complex2 Second complex number to compare
//  * @returns {boolean} - True if the first complex number is less than the second
//  *                      one and false otherwise
// */
// Complex.prototype.lessThan = function (other) {
//   if (this.re < other.re) return true;
//   if (this.re == other.re && this.im < other.im) return true;
//   return false;
// }

// Complex.prototype.not = function () {
//   return !this.equals(Complex(0))
// }

// /**
//  * Monkey patching the operators for the Complex prototype
//  */
// for (let op in ComplexOperators) {
//   oldComplex[op] = Complex.prototype[op];
//   Complex.prototype[op] = function (other) {
//     try {
//       if (typeof other === 'function') return other[op](this);
//       if (typeof other === 'boolean') return this[op](Complex(Number(other)));
//       if (typeof other === 'object') {
//         if (other instanceof Complex) return oldComplex[op].call(this, other)
//         throw new Error(`Complex number does not support ${op} for object ${other}`)
//       }
//     } catch (e) {
//       throw new Error(`Complex number does not support ${op} for ${typeof other}`)
//     }
//   }
// }

// module.exports = {
//   Complex
// };