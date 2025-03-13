const Complex = require('complex.js');

// Original Complex add function
const complexAdd = Complex.prototype.add;

/**
 * Represents the operators that can be used in the function
 * @type {{add: string, mul: string, div: string, equals: string, pow: string, neg: string}}
 */
let Operators = {
  add: '+',  mul: '*',  div: '/',  equals: '==',  pow: '**',  neg: '-'
};

/**
 * Monkey patching the operators
 * @param {string} op - The operator
 * @param {function} other - The function
 */
for (let op in Operators) {
  // Monkey patching the operators for the Function prototype
  Function.prototype[op] = function (other) {
    switch (typeof other) {
      case 'boolean':  return (...x) => this(...x)[op](Number(other));
      case 'function':
        try {
          return (...x) => this(...x)[op](other(...x));
        } catch (e) {
          throw new Error(`Unsupported ${op} for function ${other}`);
        }
      case 'object':
        try {
          return (...x) => this(...x)[op](other);
        } catch (e) {
          throw new Error(`Unsupported ${op} for object ${other}`)
        }
      default:
        throw new Error(`Unsupported ${op} for type ${typeof other}`)
    }
  };

  // Monkey patching the operators for the Complex prototype (Symmetric)
  Complex.prototype[op] = function (other) {
    switch (typeof other) {
      case 'boolean':  return complexAdd.call(this, Number(other));
      case 'function':
        try {
          return other[op](this);
        } catch (e) {
          throw new Error(`Unsupported ${op} for function ${other}`);
        }
      case 'object':
        try {
          return complexAdd.call(this, other);
        } catch (e) {
          throw new Error(`Unsupported ${op} for object ${other}`)
        }
      default:
        throw new Error(`Unsupported ${op} for type ${typeof other}`)
    }
  }
}
