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

  if (dependencies.length === 0)
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
 * Write the output to the output file
 * @param {string} output - The output code
 * @param {object} options - The options to transpile
 * @returns {string} - The output code
 */
async function writeOutput(output, options) {
  if (options.verbose) console.log(output); // if verbose, print the output

  if (!options.output) return output; // if there is no output file, return the output
  await fs.writeFile(options.output, output); // write the output to the output file
  return output;
}

/**
 * Transpile an arithmetic expression into a JavaScript program asynchronically
 * - Gets the code from the input file
 * - Parses the code to an AST
 * - Finds the used functions
 * - Generates the output code
 * - Writes the output code to the output file
 * @param {string} inputFile - file with the original code to transpile
 * @param {object} options - options to transpile
 */
module.exports = async function transpile(inputFile, options) {
  try {
    let input = await fs.readFile(inputFile, 'utf-8');     // read the input file
    const ast = p.parse(input);                            // lexical and syntax analysis
  
    const dependencies = findUsedFunctions(ast);           // semantic analysis
    
    const output = await generateCode(dependencies, ast);  // code generation
  
    await writeOutput(output, options);        // output
  } catch (e) {
    console.error(e.message);
  }
}


// module.exports = async function run(inputFile, options, outputFile = "output.js") {
//   try {
//     let input = await fs.readFile(inputFile, 'utf-8');     // read the input file
//     const ast = p.parse(input);                            // lexical and syntax analysis
  
//     const dependencies = findUsedFunctions(ast);           // semantic analysis
    
//     const output = await generateCode(dependencies, ast);  // code generation
  

//   } catch (e) {
//     console.error(e.message);
//   }
// }