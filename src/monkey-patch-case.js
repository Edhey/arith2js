let Operators = {
  add: '+',  mul: '*',  div: '/',  equals: '==',  pow: '**',  neg: '-' // ... etc.
};
 
for (let op in Operators) {
  Boolean.prototype[op] = function (other) { /* ... */   };
  Function.prototype[op] = function (other) {
    switch (typeof other) {
      case 'boolean':  return (...x) => this(...x)[op](Number(other))
      case 'object': /* ... */
      case 'function':
        try {
          return (...x) => this(...x)[op](other(...x))
        } catch (e) {
          throw new Error(`Unsupported ${op} for function ${other}`)
        }
      default:
        throw new Error(`Unsupported ${op} for type ${typeof other}`)
    }
  }
}