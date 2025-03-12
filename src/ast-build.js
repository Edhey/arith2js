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
 * @param {Object} child - The child node
 * @param {Object} location - The location information
 * @returns {Object} - The root node
 */
function buildRoot(child, location) {
  return {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: child,
      },
    ],
    loc: location,
    sourceType: 'script',
  };
}

/**
 * Build a literal node of the AST
 * @param {string} value - The raw value of the literal
 * @param {Object} location - The location information
 * @returns {Object} - The literal node
 */
function buildLiteral(value, location) {
  return {
    type: 'Literal',
    value: value,
    raw: `"${value}"`,
    loc: location
  };
}

/**
 * Build an identifier node of the AST
 * @param {string} name - The name of the identifier
 * @param {Object} location - The location information
 * @returns {Object} - The identifier node
 */
// function buildIdentifier(name, location) {
//   buildIdentifierOrCalls(name, [], location, null);
// }
function buildIdentifier(name, location) {
  return {
    type: 'Identifier',
    name: name,
    loc: location,
  };
}

/**
 * Build a call expression node of the AST
 * @param {string} callee - The name of the callee
 * @param {Object[]} args - The arguments of the call expression
 * @param {Object} location - The location information
 * @returns {Object} - The call expression node
 */
function buildCallExpression(callee, args, location) {
  return {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: callee,
    },
    arguments: args,
    loc: location,
  };
}

/**
 * Build a call member expression node of the AST
 * @param {Object} callee - The object that calls the member
 * @param {string} member - The member to call
 * @param {Object[]} args - The arguments of the call
 * @param {boolean} computed - If the member is computed
 * @param {Object} startLocation - The start location information
 * @param {Object} endLocation - The end location information
 * @returns {Object} - The call member expression node
 */
function buildCallMemberExpression(callee, member, args, computed = false, startLocation, endLocation) {
  return {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: callee,
      property: {
        type: 'Identifier',
        name: member,
      },
      computed: computed,
    },
    arguments: args,
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
}

/**
 * Build an assignment expression node of the AST
 * @param {Object} left - The left side of the assignment
 * @param {string} operator - The operator of the assignment
 * @param {Object} right - The right side of the assignment
 * @param {Object} startLocation - The start location information
 * @param {Object} endLocation - The end location information
 * @returns {Object} - The assignment expression node
 */
function buildAssigmentExpression(left, operator, right, startLocation, endLocation) {
  return {
    type: 'AssignmentExpression',
    operator: operator,
    left: left,
    right: right,
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
}

/**
 * Build a sequence expression node of the AST
 * @param {Object[]} expressions - The expressions of the sequence
 * @param {Object} startLocation - The start location information
 * @param {Object} endLocation - The end location information
 * @returns {Object} - The sequence expression node
 */
function buildSequenceExpression(expressions, startLocation, endLocation) {
  return {
    type: 'SequenceExpression',
    expressions: expressions,
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
}

/**
 * Build a variable declaration node of the AST
 * @param {Object[]} declarations - Array of declarations
 * @param {string} kind - Kind of the declaration (e.g., 'let', 'const', 'var')
 * @returns {Object} - The variable declaration node
 */
function buildVariableDeclaration(declarations, kind = 'let') {
  return {
    type: 'VariableDeclaration',
    declarations: declarations,
    kind: kind,
  };
}

/**
 * Build a variable declarator node of the AST
 * @param {Object} id - The identifier of the variable
 * @param {Object} init - The initial value of the variable
 * @returns {Object} - The variable declarator node
 */
function buildVariableDeclarator(id, init = null) {
  return {
    type: 'VariableDeclarator',
    id: id,
    init: init,
  };
}

/**
 * Build a function expression node of the AST
 * @param {Object[]} params - The parameters of the function
 * @param {Object} expression - The body of the function
 * @param {Object} startLocation - The start location information
 * @param {Object} endLocation - The end location information
 * @returns {Object} - The function expression node
 */
function buildFunctionExpression(params, expression, startLocation, endLocation) {
  return {
    type: 'FunctionExpression',
    id: null,
    params: params,
    body: {
      type: 'BlockStatement',
      body: [
        {
          type: 'ReturnStatement',
          argument: expression,
        }
      ]
    },
    generator: false,
    async: false,
    expression: false,
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
}

// function buildIdCalls(id, calls) {
//   // ! TODO: Implement
//   let node = id;
//   for (let i = 0; i < calls.length; i++) {
//     node = buildCallMemberExpression(node, calls[i].name, calls[i].args, calls[i].computed, calls[i].startLocation, calls[i].endLocation);
//   }
//   return node;
// }

function buildIdentifierOrCalls(name, calls, idLocation, callLocation) {
  let id = {
    type: 'Identifier',
    name: name,
    loc: idLocation,
  };
  if (calls.length === 0) {
    return id;
  }

  let node = id;
  calls.forEach(ast => {
    let parent = {
      type: 'CallExpression',
      callee: node,
      arguments: ast === null ? [] : [ast],
      loc: callLocation,
    };
    node = parent;
  });
  return node;
}

function buildParOrCallExpression(par, call, parLocation, callLocation) {
  let node = par;
  if (call !== null) {
    node = {
      type: 'CallExpression',
      callee: par,
      arguments: call,
      loc: callLocation,
    };
  }
  return node;
}

function buildLogicalExpression(left, operator, right, startLocation, endLocation) {
  return {
    type: 'LogicalExpression',
    operator: operator,
    left: left,
    right: right,
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
}

function buildUnaryExpression(operator, argument, prefix, startLocation, endLocation) {
  return {
    type: 'UnaryExpression',
    operator: operator,
    argument: argument,
    prefix: prefix,
    loc: {
      start: startLocation,
      end: endLocation,
    },
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
  buildFunctionExpression,
  buildIdentifierOrCalls,
  buildParOrCallExpression,
  buildLogicalExpression,
  buildUnaryExpression,
};