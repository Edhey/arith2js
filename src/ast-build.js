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
 * @returns {object} - The root node
 */
function buildRoot(child) {
  return {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          arguments: [child],
          callee: {
            type: 'Identifier',
            name: 'print',
          },
        }
      },
    ],
    sourceType: 'module',
  };
}

/**
 * Build a literal node of the AST
 * @param {string} raw - The raw value of the literal
 * @returns {object} - Returns the literal node
 */
function buildLiteral(raw) {
  return {
    type: 'Literal',
    value: raw,
    raw: raw,
  };
}


/**
 * Build a call expression node of the AST
 * @param {string} callee - The name of the callee
 * @param {object[]} args - The arguments of the call expression
 * @returns {object} - The call expression node
 */
function buildCallExpression(callee, args) {
  return {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: callee,
    },
    arguments: args,
    optional: false,
  };
}

function buildCallMemberExpression(callee, member, args) {
  return {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: callee,
      property: {
        type: 'Identifier',
        name: member,
      },
      computed: false,
      optional: false,
    },
    arguments: args,
    optional: false
  };
}

module.exports = {
  buildRoot,
  buildLiteral,
  buildCallExpression,
  buildCallMemberExpression,
}