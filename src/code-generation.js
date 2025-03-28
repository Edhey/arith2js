/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 *
 * @author Himar Edhey Hernández Alonso
 * @since Sat 29 Feb 2025
 * @desc Generate the code from the AST
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 *
 */

const recast = require('recast');
const { findDependecies } = require('./scope.js');
const { renderFile } = require('template-file');

/**
 * Generate the code from the AST
 * @param {Object} ast - Abstract Syntax Tree
 * @returns {string} - The generated code
 */
async function codeGeneration(ast) {
  let root = __dirname.replace(/\/src$/, ''); // get the root path (Linux)
  root = root.replace(/\\src$/, ''); // get the root path (Windows)
  //debug the callExpression nodes
  // for (const node of ast.ast.body[1].expression.expressions) {
    // if (node.type === 'CallExpression') {
      // console.log(node);
    // }
  // }
  console.log(JSON.stringify(ast.ast.body[1].expression.expressions[1], null, 2));
  // console.log(JSON.stringify(ast, null, 2));
  const recastOptions = { tabWidth: 2, quote: 'single' };
  const code = recast.prettyPrint(ast.ast, recastOptions).code;
  const dependencies = Array.from(findDependecies(ast).dependencies);

  if (dependencies.length === 0) // if there are no dependencies, return the code
    return code;

  const renderedCode = await renderFile(`${root}/src/templates.txt`, { dependencies, root, code });
  return renderedCode;
}

module.exports = {
  codeGeneration
};