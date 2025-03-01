/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 *
 * @author Himar Edhey Hernández Alonso
 * @since Wed 26 Feb 2025
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
        expression: child,
      },
    ],
    sourceType: 'script',
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
    raw: `"${raw}"`,
  };
}

/**
 * Function to build a identifier node
 * @param {string} name The name of the identifier
 * @returns Returns the identifier node
 */
function buildIdentifier(name) {
  return {
    type: 'Identifier',
    name: name,
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

/**
 * Function to build a call member expression node
 * @param {object} callee The object that calls the member
 * @param {object} member Is the member to call
 * @param {object} args Are the arguments of the call
 * @returns Returns the call member expression node
 */
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

/**
 * Function to build an assignment expression node
 * @param {object} left The left side of the assignment
 * @param {string} operator The operator of the assignment
 * @param {object} right The right side of the assignment
 * @returns Returns the assignment expression node
 */
function buildAssigmentExpression(left, operator, right) {
  return {
    type: 'AssignmentExpression',
    operator: operator,
    left: left,
    right: right,
  };
}

/**
 * Function to build a sequence expression node
 * @param {object[]} expressions The expressions of the sequence
 * @returns Returns the sequence expression node
 */
function buildSequenceExpression(expressions) {
  return {
    type: 'SequenceExpression',
    expressions: expressions,
  };
}

/**
 * Function to build a variable declaration node
 * @param {object array} declarations array of declarations
 * @returns {object} variable declaration node of the AST
 */
function buildVariableDeclaration(declarations) {
  return {
    type: 'VariableDeclaration',
    declarations: declarations,
    kind: 'let',
  };
}

/**
 * Function to build a variable declarator node
 * @param {object array} body array of statements
 * @returns {object} node of the AST
 */
function buildVariableDeclarator(id, init = null) {
  return {
    type: 'VariableDeclarator',
    id: id,
    init: init,
  };
}

module.exports = {
  buildRoot,
  buildLiteral,
  buildIdentifier,
  buildCallExpression,
  buildCallMemberExpression,
  buildAssigmentExpression,
  buildSequenceExpression,
  buildVariableDeclaration,
  buildVariableDeclarator,
}