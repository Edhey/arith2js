require('./monkey-patch-case.js');
const Complex = require('complex.js');

Complex.prototype.lessThan = function (other) {
  if (this.re < other.re) return true;
  if (this.re == other.re && this. im < other.im) return true;
  return false;
}

let Operators = {
  add: '+',  mul: '*',  div: '/',  equals: '==',  pow: '**',  neg: '-'
};

for (let op in Operators) {
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
  }
}

module.exports = {
  Complex
};