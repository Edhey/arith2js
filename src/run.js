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

const { transpile } = require('./transpile.js');

/**
 * Transpile to JS the code and run it
 * @param {string} inputFile Is the file with the original code to run
 * @param {Object} options Are the options to run
 */
module.exports = async function run(inputFile, options) {
  try {
    const transpiledCode = await transpile(inputFile, options);
    const output = eval(transpiledCode);
    if (options.string) console.log(output.toString());
    else if (options.return) console.log(output);
  } catch (e) {
    console.error(e.message);
  }
};