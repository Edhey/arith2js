#!/usr/bin/env node

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 * 
 * @autor Himar Edhey Hernández Alonso
 * @since Wed 26 Feb 2025
 * @desc Este archivo contiene el código para la ejecución del programa que
 *       convierte una expresión aritmética en un programa en JavaScript
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 *
 */

const fs = require('fs/promises');
const p = require("./calc").parser;
const { generateCode, findUsedFunctions } = require('./transpile.js');

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