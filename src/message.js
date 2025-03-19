/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Procesadores de Lenguajes
  * Práctica 2 Arith2JS
  *
  * @author Samuel Rodríguez
  * @since Sat 15 Feb 2025 
  * @desc Functions to build the parts of the AST
  */
/**
 * Formats an identifier to be used as a user defined variable
 * @param {string} identifier identifier to format
 * @returns formatted identifier
 */
const formatIdentifier = identifier => '$' + identifier;

/**
 * Removes quotes from a string
 * @param {string} string string to remove quotes from
 * @returns string without quotes
 */
const removeQuotes = string => string.slice(1, -1);

/**
 * Builds the root node of the AST, based on the child node
 * @param {Object} child child node called by the console.log
 * @param {Object} location location of the node
 * @returns {Object} root node of the AST
 */
function buildRoot(child, location) {
  const root = {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: child,
      }
    ],
    loc: location,
    sourceType: 'script',
  };
  return root;
}

/**
 * Creates a literal node of the AST
 * @param {String} value value of the literal
 * @param {Object} location location of the node
 * @returns {Object} literal node of the AST
 */
function buildLiteral(value, location) {
  const literal = {
    type: 'Literal',
    value: value,
    raw: `"${value}"`,
    loc: location
  };
  return literal;
}

/**
 * Creates an identifier node of the AST
 * @param {String} name name of the identifier
 * @param {Object} location location of the node
 * @returns {Object} identifier node of the AST
 */
function buildIdentifier(name, location) {
  const identifier = {
    type: 'Identifier',
    name: name,
    loc: location,
  };
  return identifier;
}

/**
 * Creates a call expression node of the AST
 * @param {Object} callee object representing the callee of the call expression
 * @param {Object} args node of the arguments of the function
 * @param {Object} startLocation start location of the node
 * @param {Object} endLocation end location of the node
 * @returns {Object} call expression node of the AST
 */
function buildCallExpression(callee, args, startLocation, endLocation) {
  const callExpression = {
    type: 'CallExpression',
    callee: callee,
    arguments: args,
    optional: false,
    loc: {
      start: startLocation,
      end: endLocation
    }
  };
  return callExpression;
}

/**
 * Builds a CallExpression AST node for a member function call.
 *
 * @param {Object} callee - The name of the object on which the method is called.
 * @param {string} property - The name of the method being called.
 * @param {Array} args - An array of arguments for the method call.
 * @param {Object} startLocation - The start location of the CallExpression.
 * @param {Object} endLocation - The end location of the CallExpression.
 * @returns {Object} The AST node representing the CallExpression.
 */
function buildCallMemberExpression(callee, property, args, startLocation, endLocation) {
  const callMemberExpression = {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: callee,
      property: {
        type: 'Identifier',
        name: property
      },
      computed: false,
      optional: false,
    },
    arguments: args,
    optional: false,
    loc: {
      start: startLocation,
      end: endLocation
    }
  };
  return callMemberExpression;
}

/**
 * Creates an assignment expression node of the AST
 * @param {Object} left  left  node expression of the tree
 * @param {String} operator string representing the operator to use in the 
 * assignment expression 
 * @param {Object} right right node expression of the tree 
 * @param {Object} startLocation start location of the node
 * @param {Object} endLocation end location of the node
 * @returns {Object} assignment expression node of the AST
 */
function buildAssignmentExpression(left, operator, right, startLocation, endLocation) {
  const assignmentExpression = {
    type: 'AssignmentExpression',
    operator: operator,
    left: left,
    right: right,
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
  return assignmentExpression;
}

/**
 * Creates an sequence expression node of the AST
  * @param {Array} expressions array of expressions
  * @param {Object} startLocation start location of the node
  * @param {Object} endLocation end location of the node
 * @returns {Object} sequence expression node of the AST
 */
function buildSequenceExpression(expressions, startLocation, endLocation) {
  const sequenceExpression = {
    type: 'SequenceExpression',
    expressions: expressions,
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
  return sequenceExpression;
}

/**
 * Creates a variable declaration node of the AST
 * @param {Array} declarations array of declarations
 * @param {String} kind string representing the kind of the variable declaration
 * @returns {Object} variable declaration node of the AST
 */
function buildVariableDeclaration(declarations, kind = 'let') {
  const variableDeclaration = {
    type: 'VariableDeclaration',
    declarations: declarations,
    kind: kind,
  };
  return variableDeclaration;
}

/**
 * Creates a variable declarator node of the AST
 * @param {Object} id id of the variable declarator
 * @param {Object} init init of the variable declarator
 * @returns {Object} node of the AST
 */
function buildVariableDeclarator(id, init = null) {
  const variableDeclarator = {
    type: 'VariableDeclarator',
    id: id,
    init: init,
  };
  return variableDeclarator;
}

/**
 * Builds a function expression AST node.
 * @param {Array} params - The parameters of the function.
 * @param {Object} expression - The body of the function.
 * @param {Object} startLocation - The start location of the
 * function expression.
 * @param {Object} endLocation - The end location of the function
 * expression.
 * @param {string} type - The type of the function expression.
 * @returns {Object} The AST node representing the function expression.
 */
function buildFunctionExpression(params, expression, startLocation, endLocation,
  type = 'FunctionExpression') {
  const functionExpression = {
    type: type,
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
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
  return functionExpression;
}

/**
 * Creates a sequence of call expressions for an identifier, iteratively
 * wrapping each call expression in the previous one.
 * @param {string} baseCall name of the function
 * @param {Object[]} callsData array of objects with the data of the calls
 * (callee, args, startLoc, endLoc)
 * @returns {Object} the identifier node of the AST
 */
function buildIdCalls(baseCall, callsData) {
  const idLocation = {
    start: callsData[0].startLoc,
    end: callsData[0].startLoc + baseCall.length
  };
  const basecallExpression = buildCallExpression(
    typeof baseCall === 'string' ?
      buildIdentifier(baseCall, idLocation) :
      baseCall,
    callsData[0].args,
    callsData[0].startLoc, callsData[0].endLoc
  );
  let callExpressions = basecallExpression;
  for (let i = 1; i < callsData.length; i++) {
    callExpressions = buildCallExpression(
      callExpressions, callsData[i].args,
      callsData[i].startLoc, callsData[i].endLoc
    );
  }
  return callExpressions;
}

/**
 * Builds a logical expression AST node.
 * @param {Object} left - The left side of the expression.
 * @param {string} operator - The operator of the expression.
 * @param {Object} right - The right side of the expression.
 * @param {Object} startLocation - The start location of the expression.
 * @param {Object} endLocation - The end location of the
 * expression.
 * @returns {Object} The AST node representing the logical expression.
 */
function buildLogicalExpression(left, operator, right,
  startLocation, endLocation) {
  const logicalExpression = {
    type: 'LogicalExpression',
    operator: operator,
    left: left,
    right: right,
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
  return logicalExpression;
}

/**
 * Builds a unary expression AST node.
 * @param {string} operator - The operator of the expression.
 * @param {Object} argument - The argument of the expression.
 * @param {Object} startLocation - The start location of the expression.
 * @param {Object} endLocation - The end location of the
 * expression.
 * @returns {Object} The AST node representing the unary expression.
 */
function buildUnaryExpression(operator, argument,
  startLocation, endLocation) {
  const unaryExpression = {
    type: 'UnaryExpression',
    operator: operator,
    argument: argument,
    prefix: true,
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
  return unaryExpression;
}

/**
 * Builds a while statement AST node.
 * @param {Object} conditionStatement - The condition of the while statement.
 * @param {Object} bodyStatement - The body of the while statement.
 * @param {Object} startLocation - The start location of the while statement.
 * @param {Object} endLocation - The end location of the while statement.
 * @returns {Object} The AST node representing the while statement.
 */
function buildWhileStatement(conditionStatement, bodyStatement, startLocation,
  endLocation) {
  const variableDeclaration = buildVariableDeclaration([
    buildVariableDeclarator(
      buildIdentifier('result'),
      buildLiteral(false)
    )
  ]);
  const whileStatement = {
    type: 'WhileStatement',
    test: conditionStatement,
    body: {
      type: 'BlockStatement',
      body: [{
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'Identifier',
            name: 'result',
          },
          right: bodyStatement
        }
      }]
    },
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
  const returnStatement = {
    type: 'ReturnStatement',
    argument: buildIdentifier('result'),
  };
  const blockStatement = {
    type: 'BlockStatement',
    body: [
      variableDeclaration,
      whileStatement,
      returnStatement
    ],
  };
  const arrowFunctionExpression = {
    type: 'ArrowFunctionExpression',
    id: null,
    params: [],
    body: blockStatement,
    loc: {
      start: startLocation,
      end: endLocation,
    },
  }
  return buildCallExpression(
    arrowFunctionExpression,
    [],
    startLocation,
    endLocation
  );
}

/**
 * Builds a for statement AST node.
 * @param {Object} init - The initialization part of the for statement.
 * @param {Object} test - The test condition of the for statement.
 * @param {Object} update - The update part of the for statement.
 * @param {Object} body - The body of the for statement.
 * @param {Object} startLocation - The start location of the for statement.
 * @param {Object} endLocation - The end location of the for statement.
 * @returns {Object} The AST node representing the for statement.
 */
function buildForStatement(init, test, update, body, startLocation, endLocation) {
  const resultDeclarator = buildVariableDeclarator(
    buildIdentifier('result'),
    buildLiteral(false)
  );
  const resultDeclaration = buildVariableDeclaration([resultDeclarator], 'let');
  const forStatement = {
    type: 'ForStatement',
    init: init,
    test: test,
    update: update,
    body: {
      type: 'BlockStatement',
      body: [
        {
          type: 'ExpressionStatement',
          expression: body,
        }
      ],
    },
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
  const resultReturn = {
    type: 'ReturnStatement',
    argument: buildIdentifier('result'),
  };
  const arrowFunctionBody = {
    type: 'BlockStatement',
    body: [
      resultDeclaration,
      forStatement,
      resultReturn,
    ],
  };
  const arrowFunction = {
    type: 'ArrowFunctionExpression',
    id: null,
    params: [],
    body: arrowFunctionBody,
    generator: false,
    async: false,
    expression: false,
    loc: {
      start: startLocation,
      end: endLocation,
    },
  };
  return buildCallExpression(
    arrowFunction,
    [],
    startLocation,
    endLocation
  );
}

module.exports = {
  buildAssignmentExpression,
  buildSequenceExpression,
  buildIdentifier,
  buildRoot,
  buildLiteral,
  buildCallExpression,
  buildCallMemberExpression,
  buildVariableDeclaration,
  buildVariableDeclarator,
  buildFunctionExpression,
  buildIdCalls,
  formatIdentifier,
  buildLogicalExpression,
  buildUnaryExpression,
  removeQuotes,
  buildWhileStatement,
  buildForStatement
};