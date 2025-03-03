#!/usr/bin/env node

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 *
 * @author Himar Edhey Hernández Alonso
 * @since Wed 26 Feb 2025
 * @desc Este archivo contiene el código para la ejecución del programa que
 *       convierte una expresión aritmética en un programa en JavaScript
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 *
 */

const fileStream = require('fs').promises
const parser = require("./calc").parser;
const { scopeAnalysis, findDependecies } = require('./scope.js');
const { codeGeneration } = require('./code-generation.js');
const { writeCode } = require('./write-code.js');

module.exports = {
  transpile
};

/**
 * Transpile an arithmetic expression into a JavaScript program asynchronically
 * - Gets the code from the input file
 * - Parses the code to an AST
 * - Finds the used functions
 * - Generates the output code
 * - Writes the output code to the output file
 * @param {string} inputFile - file with the original code to transpile
 * @param {object} options - options to transpile
 * @returns {string} - The output code
 */
async function transpile(inputFile, options) {
  let input = await fileStream.readFile(inputFile, 'utf-8'); // 1. read the input file
  
  let ast;
  try {
    ast = parser.parse(input); // 2. parse the input code
  } catch (error) {
    let message = error.message;
    console.error(message);
    return message;
  }

  ast = findDependecies(ast); // 3. find the dependencies
  ast = scopeAnalysis(ast); // 4. create the scope

  let output = await codeGeneration(ast); // 5. generate the output code (JS)

  await writeCode(output, options); // 6. write the output (JS code) to the output file
  return output;
}

// async function transpile(inputFile, options) {
//   let input;
//   try {
//     input = await fileStream.readFile(inputFile, 'utf-8')          // 1. Read the input file
//   }
//   catch (error) {
//     console.error(`Can't read file "${inputFile}"`);
//     return error;
//   }

//   let ast;
//   try {
//     ast = p.parse(input);                                  // 2. Parse the input
//   } catch (error) {
//     let m = error.message
//     console.error(`Syntax error:\n${m}`);
//     return error;
//   }
//   let {
//     declarations,          // Map (name -> AssignmentExpression) Where the keys are the declared names
//     definitions,           // Map (name ->{declaration: AssignmentExpression, usages: [Identifier]}) Where the keys are the used names 
//     usedBeforeDeclaration  // Map (name -> [Identifier]]) Where the keys are the bad used names and the value is the array of the bad usages
//   } = scopeAnalysis(ast);                                  // 3. Modifies the AST by adding declarations at the beginning of the body
//   inspectAST(ast, declarations, definitions, options);     // Show the AST, declarations, definitions if requested in options
//   if (usedBeforeDeclaration.size) {                        // 4. Check for usage of undeclared variables
//     usedBeforeDeclaration.forEach((values, key, map) => {
//       values.forEach((value) =>
//         console.error(`Bad usage of variable "${key}" at line ${value.loc.first_line} column ${value.loc.first_column+1}`))
//     })
//     process.exit(1);
//   }
//   let usedFunctions = supportDependencies(ast);            // 5. Find what of the support functions are used by the source code
//   let output = codeGen(ast, usedFunctions);                // 6. Generate the JS code
//   await writeCode(output, options);                        // 7. Write the JS code to the output file
//   return output;
// }