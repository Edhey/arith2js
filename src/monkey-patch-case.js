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
  };
  
}
for (let op in Operators) {
  Number.prototype[op] = function (other) {
    if (typeof other === 'function') {
      return other(this)[Operators[op]](this);
    }
    return eval(`${this} ${Operators[op]} ${other}`);
  };
}
