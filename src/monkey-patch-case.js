const Complex = require('complex.js');

/**
 * Represents the operators that can be used in the function
 * @type {{add: string, mul: string, div: string, equals: string, pow: string, neg: string}}
 */
const Operators = {
  add: '+', mul: '*', div: '/', equals: '==', pow: '**', neg: '-'
};

/**
 * Monkey patching the operators
 * @param {string} op - The operator
 * @param {function|boolean|object} other - The other "operand" to apply the operator
 */
for (let op in Operators) {
  // Monkey patching the operators for the Function prototype
  Function.prototype[op] = function (other) {
    switch (typeof other) {
      case 'boolean': return (...x) => this(...x)[op](Number(other));
      case 'function':
        try {
          return (...x) => this(...x)[op](other(...x));
        } catch (e) {
          throw new Error(`Unsupported ${op} for function ${other}`);
        }
      case 'object':
        if (other instanceof Complex) {
          return (...x) => this(...x)[op](other);
        } else {
          throw new Error(`Unsupported ${op} for object ${other}`)
        }
      default:
        throw new Error(`Unsupported ${op} for type ${typeof other}`)
    }
  };

  // Monkey patching the operators for the Boolean prototype
  Boolean.prototype[op] = function (other) {
    switch (typeof other) {
      case 'boolean': return Complex(Number(this))[op](Number(other));
      case 'function':
        try {
          return other[op](Complex(Number(this)));
        } catch (e) {
          throw new Error(`Unsupported ${op} for function ${other}`);
        }
      case 'object':
        if (other instanceof Complex) {
          return Complex(Number(this))[op](other);
        } else {
          throw new Error(`Unsupported ${op} for object ${other}`)
        }
      default:
        throw new Error(`Unsupported ${op} for type ${typeof other}`)
    }
  };
}

// const BooleanOperators = {
//   equals: '==' // The only operator that can be used with booleans
// };

// /**
//  * Monkey patching the operators for the Boolean prototype
//  * @param {string} op - The operator
//  * @param {function|boolean|object} other - The other "operand" to apply the operator
//  */
// for (let op in BooleanOperators) {
//   Boolean.prototype[op] = function (other) {
//     switch (typeof other) {
//       case 'boolean': return this.valueOf() === other.valueOf();
//       case 'function':
//         try {
//           return other[op](Complex(Number(this)));
//         } catch (e) {
//           throw new Error(`Unsupported ${op} for function ${other}`);
//         }
//       case 'object':
//         if (other instanceof Complex) {
//           return Complex(Number(this))[op](other);
//         } else {
//           throw new Error(`Unsupported ${op} for object ${other}`)
//         }
//       default:
//         throw new Error(`Unsupported ${op} for type ${typeof other}`)
//     }
//   };
// }