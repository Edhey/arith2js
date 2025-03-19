/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Procesadores del lenguage
  * Práctica 6 - While and for loops
  *
  * @author Himar Edhey Hernández Alonso
  * @since Wed 19 Mar 2025 
  * @desc Handler for complex operations
  */

 let oldComplex = {};
const Complex = require('complex.js');
const { operationHandlers, implementedTypes } = require('../monkey-patch-handlers.js');
const lodash = require('lodash');

implementedTypes.push(Complex);

Operators = {
  add: '+', mul: '*', div: '/', equals: '==', pow: '**', sub: '-'
}

for (const op in Operators) {
  oldComplex[op] = Complex.prototype[op];
  /**
   * Operates a complex with a complex
   * @param {Complex} other complex to operate with
   * @returns result of the operation
   */
  lodash.set(operationHandlers, `complex.${op}.complex`, function (other) {
    return oldComplex[op].call(this, other);
  });
  /**
   * Operates a complex with a boolean
   * @param {boolean} other boolean to operate with
   * @returns result of the operation
   */
  lodash.set(operationHandlers, `complex.${op}.boolean`, function (other) {
    return oldComplex[op].call(this, Complex(Number(other)));
  });
  /**
   * Operates a complex with a function
   * @param {function} other function to operate with
   * @returns result of the operation
   */
  lodash.set(operationHandlers, `complex.${op}.function`, function (other) {
    try {
      return (...args) => this[op](other(...args));
    } catch (error) {
      throw new Error(
        `Error: Unsupported ${op} for type ${typeof other}` +
        ` with ${error.message}`
      );
    }
  });
}

/**
 * Adds a string to a complex
 * @param {string} other string to add to the complex
 * @returns concatenated complex and string
 */
lodash.set(operationHandlers, 'complex.add.string', function (other) {
  return this.toString() + other;
});

/**
 * Not operator for a complex
 * @returns false if the complex is not zero,
 * true otherwise
 */
lodash.set(operationHandlers, 'complex.not', function () {
  return this === Complex(0);
});

/**
 * Check if a complex is less than another
 * @param {Complex} other complex to compare with
 * @returns true if the complex is less than the other,
 * false otherwise
 */
lodash.set(operationHandlers, 'complex.lessThan', function (other) {
  if (this.re < other.re) return true;
  if (this.re == other.re && this.im < other.im) return true;
  return false;
});

/**
 * Check if a complex is not equal to another
 * @param {Complex} other complex to compare with
 * @returns true if the complex is not equal to the other,
 * false otherwise
 */
lodash.set(operationHandlers, 'complex.notEquals.complex', function (other) {
  return !this.equals(other);
});

/**
 * Check if a complex is less or equal than a number
 * @param {number} other number to compare with
 * @returns true if the complex is less or equal than the number,
 * false otherwise
 */
lodash.set(operationHandlers, 'complex.lessOrEqualThan.complex', function (other) {
  return this.lessThan(other) || this.equals(other);
});

/**
 * Check if a complex is greater than another
 * @param {Complex} other complex to compare with
 * @returns true if the complex is greater than the other,
 * false otherwise
 */
lodash.set(operationHandlers, 'complex.greaterThan.complex', function (other) {
  return !this.lessOrEqualThan(other);
});

/**
 * Check if a complex is greater or equal than another
 * @param {Complex} other complex to compare with
 * @returns true if the complex is greater or equal than the other,
 * false otherwise
 */
lodash.set(operationHandlers, 'complex.greaterOrEqualThan.complex', function (other) {
  return !this.lessThan(other);
});

for (const op in Operators) {
  Complex.prototype[op] = function (other) {
    if (other) {
      return operationHandlers.complex[op][typeof other](other);
    }
    return operationHandlers.complex[op](other);
  }
}

module.exports = {
  Complex
};