/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura Procesadores de Lenguajes
 * Práctica 2 - Arith2js
 *
 * @author Himar Edhey Hernández Alonso
 * @since Wed 19 Feb 2025 
 * @desc Este archivo contiene las funciones que construyen el AST
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 */

/** 
 * Build the root node of the AST
 * @param {object} child - The child node
 * @param {object} location - The location of the node
 * @returns {object} - The root node
 */
function buildRoot(child, location) {
  return {
    type: "Program",
    start: location.first_column,
    end: location.last_column,
    range: [
      location.first_column, 
      location.last_column
    ],
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "MemberExpression",
            object: {
              type: "Identifier",
              name: "console",
            },
            property: {
              type: "Identifier",
              name: "log",
            },
            computed: false,
            optional: false,
          },
          arguments: [child],
          optional: false,
        },
      },
    ],
    sourceType: "module",
  };
}

/**
 * Build a literal node of the AST
 * @param {string} raw - The raw value of the literal
 * @param {object} location - The location of the literal
 * @returns {object} - Returns the literal node
 */
function buildLiteral(raw, location) {
  return {
    type: "Literal",
    start: location.first_column,
    end: location.last_column,
    range: [location.first_column, location.last_column],
    value: Number(raw),
    raw: raw,
  };
}

/**
 * Build a binary expression node of the AST
 * @param {object} left - The left node
 * @param {object} operator - The operator node
 * @param {object} right - The right node
 * @param {object} startLocation - The first token location
 * @param {object} endLocation - The last token location
 * @returns {object} - The binary expression node
 */
function buildBinaryExpression(left, operator, right, startLocation, endLocation) {
  return {
    type: "BinaryExpression",
    start: startLocation.first_column,
    end: endLocation.last_column,
    range: [
      startLocation.first_column, 
      endLocation.last_column
    ],
    left: left,
    operator: operator,
    right: right,
  };
}

/**
 * Build a unary expression node of the AST
 * @param {object} operator - Is the operator
 * @param {object} argument - Is the argument
 * @param {object} startLocation - The first token location
 * @param {object} endLocation - The last token location
 * @returns {object} - The unary expression node
 */
function buildUnaryExpression(operator, argument, startLocation, endLocation) {
  return {
    type: "UnaryExpression",
    operator: operator,
    argument: argument,
    start: startLocation.first_column,
    end: endLocation.last_column,
    range: [
      startLocation.first_column, 
      endLocation.last_column
    ],
    prefix: true,
  };
}

/**
 * Build a call expression node of the AST
 * @param {object} callee - The callee
 * @param {object[]} args - The arguments
 * @param {object} startLocation - The first token location
 * @param {object} endLocation - The last token location
 * @returns {object} - The call expression node
 */
function buildCallExpression(callee, args, startLocation, endLocation) {
  return {
    type: "CallExpression",
    start: startLocation.first_column,
    end: endLocation.last_column,
    range: [
      startLocation.first_column, 
      endLocation.last_column
    ],
    callee: {
      type: "Identifier",
      name: callee,
    },
    arguments: args,
  };
}

module.exports = {
  buildRoot,
  buildBinaryExpression,
  buildLiteral,
  buildUnaryExpression,
  buildCallExpression
}