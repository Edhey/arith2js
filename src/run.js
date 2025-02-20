#!/usr/bin/env node

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 * Práctica 2 - Arith2js
 *
 * @author Himar Edhey Hernández Alonso
 * @since Wed 19 Feb 2025 
 * @desc Este archivo contiene el código para la ejecución del programa que
 *       convierte una expresión aritmética en un programa en JavaScript
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 *
 */

const fs = require('fs/promises');

const p = require("./calc").parser;

const estraverse = require("estraverse"); // needed to traverse the AST
const exportedSupportIdentifiers = Object.keys(require("./support-lib.js")); // [ power, factorial ]

const escodegen = require('escodegen'); // needed to generate the code from the AST
const { renderFile } = require('template-file'); // handlebars.js mustache.js ...

/**
 * Generate the code from the AST
 * @param {string[]} dependencies - List of used functions
 * @param {object} ast - Abstract Syntax Tree
 * @returns {string} - The generated code
 */
async function generateCode(dependencies, ast) {
  const code = escodegen.generate(ast); // generate the code from the AST

  if (dependencies.length === 0) // if there are no dependencies, return the code
    return code;

  let root = __dirname.replace(/\/src$/, ''); // get the root path (Linux)
  root = root.replace(/\\src$/, ''); // get the root path (Windows)
  return renderFile(`${root}/src/templates.js`, { root, code, dependencies });
}

/**
 * Find the used functions in the AST
 * @param {object} ast - Abstract Syntax Tree
 * @returns {string[]} - List of used functions
 */
const findUsedFunctions = function (ast) {
  const usedSupportFunctions = new Set();
  estraverse.traverse(ast, { // traveling the AST
    enter: function (node, _ ) { // for each node (node, parent)
      if (node.type === 'Identifier' && // if the node is an identifier 
          exportedSupportIdentifiers.includes(node.name)) { // and the name is in the exportedSupportIdentifiers
        usedSupportFunctions.add(node.name); // add the name to the usedSupportFunctions
      }
    },
  });
  return Array.from(usedSupportFunctions);
};

/**
 * Transpile to JS the code and run it
 * @param {string} inputFile Is the file with the original code to run
 * @param {object} options Are the options to run
 */
module.exports = async function run(inputFile, options) {
  try {
    let input = await fs.readFile(inputFile, 'utf-8');     // read the input file
    const ast = p.parse(input);                            // lexical and syntax analysis
  
    const dependencies = findUsedFunctions(ast);           // semantic analysis
    
    const code = await generateCode(dependencies, ast);  // code generation

    if (options.verbose) console.log(code); // if verbose, print the output

    return eval(code);   // execute the generated code
  } catch (e) {
    console.error(e.message);
  }
};