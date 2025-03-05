/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 * 
 * @autor Himar Edhey Hernández Alonso
 * @since Wed 26 Feb 2025
 * @desc Archivo que contiene la función dependencies que se encarga de detectar
 * las funciones de soporte que se utilizan
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 *
 */

const astTypes = require('ast-types');
const visit = astTypes.visit;

/**
 * Detect what support functions are used: dependency analysis
 * @param {Object} ast - The AST to analyze
 */
function findDependecies(ast) {
  const functionNames = Object.keys(require("./support-lib.js"));

  ast.dependencies = new Set([]);
  visit(ast.ast, {
    visitCallExpression(path) {
      const node = path.node;
      let name = node.callee.name;
      if (functionNames.includes(name)) {
        ast.dependencies.add(name);
      }
      this.traverse(path);
    }
  });
  return ast;
}

/**
 * Analize the scope of the AST
 * @param {Object} ast - The AST to analyze
 */
const scopeAnalysis = (ast) => {
  const Scope = require('./scope-class.js');
  let scope = new Scope(null);

  visit(ast.ast, {
    visitAssignmentExpression(path) {
      const node = path.node;
      if (node.left.type === 'Identifier') {
        let name = node.left.name;
        if (!ast.dependencies.has(name)) {
          if (name && !scope.has(name)) {
            scope.addDefinition(node);
            scope.addUsage(node.left);
          }
        }
      }
      this.traverse(path);
    },
    visitIdentifier(path) {
      const parent = path.parent.node;
      const currentNodeName = path.node.name;
      if (/^[$]/.test(currentNodeName)
        && !ast.dependencies.has(currentNodeName)) {
        if (!scope.has(currentNodeName)) {
          scope.setAsUsedBeforeDeclaration(currentNodeName);
        }
        if (!(parent.type === 'AssignmentExpression'
          && parent.left.name === currentNodeName)) {
          scope.addUsage(path.node);
        }
      }
      this.traverse(path);
    },
  });

  if (scope.length > 0) {
    ast.ast.body.unshift(scope.buildDeclaration(ast.ast.loc));
  }

  ast.scope = scope;

  let notDeclaredMessage = scope.notDeclaredVariablesAnalysis();
  if (notDeclaredMessage) {
    console.error(notDeclaredMessage);
  }
  let notUsedMessage = scope.notUsedVariablesAnalysis();
  if (notUsedMessage) {
    console.error(notUsedMessage);
  }
  let usedBeforeDeclarationMessage = scope.usedBeforeDeclarationVariablesAnalysis();
  if (usedBeforeDeclarationMessage) {
    console.error(usedBeforeDeclarationMessage);
  }
  return ast;
};

module.exports = {
  scopeAnalysis,
  findDependecies
}