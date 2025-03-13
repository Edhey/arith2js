/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 *
 * @author Himar Edhey Hernández Alonso
 * @since Wed 26 Feb 2025
 * @desc  Librería de soporte con funciones para: 
 *        El factorial para números complejos:
 *          - A gamma function implementation based on Lanczos Approximation
 *          - @see {@link https://en.wikipedia.org/wiki/Lanczos_approximation}
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 *
 */

const { Complex } = require('./complex.js');

const P = [Complex(0.99999999999980993),
Complex(676.5203681218851), Complex(-1259.1392167224028), Complex(771.32342877765313),
Complex(-176.61502916214059), Complex(12.507343278686905), Complex(-0.13857109526572012),
Complex(9.9843695780195716e-6), Complex(1.5056327351493116e-7)];

const SQRT2PI = Complex(Math.sqrt(2 * Math.PI)); // sqrt(2 * PI)

/**
 * @desc The Gamma function is a generalization of the factorial function to
 * non-integer numbers. It is often used in probability and statistics, as it 
 * shows up in the normalizing constants of important probability distributions 
 * such as the Chi-square and the Gamma.
*/
function gamma(zz) {
  if (zz.equals(Complex(0))) { return Complex(1); }
  z = zz.sub(1);
  let x = P[0];
  let t = z.add(7.5); // z + 7.5

  for (let i = 1; i < P.length; i++) {
    x = x.add(P[i].div(z.add(i))); // x += P[i] / (z + i);
  }
  let result = SQRT2PI.mul(t.pow(z.add(0.5))).mul(t.neg().exp()).mul(x); // sqrt(2 * PI) * t^(z + 0.5) * e^(-t) * x;
  return zz.mul(result);
}

/**
 * Function to print a value
 * @param {Complex} value Is the value to print
 */
function print(value) {
  console.log(value.toString());  
}

/**
 * Function that returns the minimus of two complex numbers.
 * First, it compares the real part of the numbers, and if they are equal,
 * it compares the imaginary part.
 * @param {Complex} number1 First complex number to compare
 * @param {Complex} number2 Second complex number to compare
 */
function min(number1, number2) {
  if (number1.re < number2.re) {
    return number1;
  } else if (number1.re > number2.re) {
    return number2;
  } else {
    if (number1.im < number2.im) {
      return number1;
    } else {
      return number2;
    }
  }
}

/**
 * Function that returns the maximus of two complex numbers.
 * First, it compares the real part of the numbers, and if they are equal,
 * it compares the imaginary part.
 * @param {Complex} number1 First complex number to compare
 * @param {Complex} number2 Second complex number to compare
 */
function max(number1, number2) {
  if (number1.re > number2.re) {
    return number1;
  } else if (number1.re < number2.re) {
    return number2;
  } else {
    if (number1.im > number2.im) {
      return number1;
    } else {
      return number2;
    }
  }
}

/**
 * Function that compares two complex numbers and returns true if the first one is less than the second one.
 * First, it compares the real part of the numbers, and if they are equal,
 * it compares the imaginary part.
 * @param {Complex} complex1 First complex number to compare
 * @param {Complex} complex2 Second complex number to compare
 */
function complexLessThan(complex1, complex2) {
  if (complex1.re < complex2.re) return true;
  else if (complex1.re == complex2.re && complex1.im < complex2.im) return true;
  else return false;
}

module.exports = { gamma, Complex, print, min, max, complexLessThan };