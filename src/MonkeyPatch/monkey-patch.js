/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores del lenguage
 * Práctica 6 - While and for loops
 *
 * @author Himar Edhey Hernandez Alonso
 * @since Wed 19 Mar 2025 
 * @desc Patches the objects to add new operations
 * @see 
 */

require('./handlers/boolean-monkey-patch.js');
const { Complex } = require('./handlers/complex-monkey-patch.js');
require('./handlers/function-monkey-patch.js');
require('./handlers/string-monkey-patch.js');
const { Operators, implementedTypes, operationHandlers } = require('./monkey-patch-handlers.js');

for (const type of implementedTypes) {
  for (const operator in Operators) {
    type.prototype[operator] = function (other) {
      const firstType = (typeof this === 'object' && this instanceof Complex) ?
        'complex' : this.constructor.name.toLowerCase();
      if (other === undefined || other === null) {
        return operationHandlers[firstType][operator];
      }
      const secondType = (typeof other === 'object' && other instanceof Complex) ?
        'complex' : other.constructor.name.toLowerCase();
      const operation = operationHandlers[firstType][operator][secondType];
      if (operation) {
        return operation.call(this, other);
      }
      return operationHandlers.default(firstType, operator, secondType);
    }
  }
}