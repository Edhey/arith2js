/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Procesadores de Lenguajes
 * Práctica 6 - While, for
 *
 * @author Himar Edhey Hernández Alonso
 * @since Wed 19 Mar 2025 
 * @desc Handler for operations
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 *
 */

const operationHandlers = {
  'default': (left, operator, rigth) => {
    throw new Error(`Operator ${typeof left} don't support the operator ` 
                    + `${operator} for type ${typeof rigth}`)
  }
};

const AritmeticOperators = {
  add: '+', mul: '*', div: '/', equals: '==', pow: '**', sub: '-'
};

const ComparisonOperators = {
  equals: '==', notEquals: '!=', lessThan: '<', greaterThan: '>', lessEqual: '<=', greaterEqual: '>=' 
};

const Operators = {
  ...AritmeticOperators,
  ...ComparisonOperators
};

const implementedTypes = [];

module.exports = {
  operationHandlers,
  implementedTypes,
  Operators,
  AritmeticOperators,
  ComparisonOperators
};