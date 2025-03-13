require('./monkey-patch-case.js');
const Complex = require('complex.js');

// TODO Use this method to implement the lessThan operator
/**
 * Function that compares two complex numbers and returns true if the first one 
 * is less than the second one.
 * First, it compares the real part of the numbers, and if they are equal,
 * it compares the imaginary part.
 * @param {Complex} complex1 First complex number to compare
 * @param {Complex} complex2 Second complex number to compare
 * @returns {boolean} - True if the first complex number is less than the second
 *                      one and false otherwise
 */
Complex.prototype.lessThan = function (other) {
  if (this.re < other.re) return true;
  if (this.re == other.re && this. im < other.im) return true;
  return false;
}

module.exports = {
  Complex
};