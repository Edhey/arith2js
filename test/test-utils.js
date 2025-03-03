/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 *
 * @autor Himar Edhey Hernández Alonso
 * @since Fri 28 Feb 2025
 * @desc Este archivo contiene los tests de los errores de la práctica
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 */

const { transpile } = require("../src/transpile.js");
const run = require("../src/run.js");
const fs = require("fs/promises");
const { expect } = require('chai');

/**
 * Remove spaces and requires from the code
 * @param {string} code Input code to remove spaces and requires
 * @returns {string} Code without spaces and requires
 */
function removeSpaces(string) {
  return string.replace(/\s/g, '').
    replace(/^.*\/\*endofpreambleofgeneratedcode\*\//, '');
}

/**
 * Function that executes the transpile function and checks the output result
 * removing spaces and requires
 * @param {object} testsFiles Object with the input, output, expectedjs and 
 * correctout files 
 * @param {boolean} unlink If true, it will delete the output file after 
 * checking
 */
async function checkTranspile(testsFiles, unlink = false) {
  // Compile the input and check the output program is what expected
  await transpile(testsFiles.input, { output: testsFiles.output });
  let output = await fs.readFile(testsFiles.output, 'utf-8');
  let expected = await fs.readFile(testsFiles.expected, 'utf-8');
  expect(removeSpaces(output)).to.equal(removeSpaces(expected));
  if (unlink) await fs.unlink(testsFiles.output);
}

/**
 * Function that executes the run function and checks the output result
 * removing spaces and requires. It use mocking to check the console.log
 * @param {object} testsFiles Object with the input, output, expectedjs and
 * correctout files
 * @param {boolean} verbose If true, it will show the console.log output
 */
async function checkRunConsoleLog(testsFiles, verbose = false) {
  // Mock console.log
  let result = "";
  const oldLog = console.log;
  console.log = function (...s) { result += s.join(''); };

  // Run the transpiled code using the run function and check the output
  await run(testsFiles.input, { verbose: verbose, string: true });

  // Read the expected output
  let correctOut = await fs.readFile(testsFiles.correctOut, 'utf-8');

  // Check the output
  expect(removeSpaces(result)).to.equal(removeSpaces(correctOut));

  // Restore console.log
  console.log = oldLog;
}

async function checkRunConsoleError(testsFiles) {
  let consoleOutput = "";
  const originalConsoleError = console.error;
  console.error = (message) => { consoleOutput += message; };

  try {
    await transpile(testsFiles.input, { output: testsFiles.output });
    const output = await fs.readFile(testsFiles.output, 'utf-8');
    const expected = await fs.readFile(testsFiles.expected, 'utf-8');
    expect(removeSpaces(output)).to.equal(removeSpaces(expected));
  } catch (e) {
    const correctErr = await fs.readFile(testsFiles.correctErr, 'utf-8');
    expect(removeSpaces(consoleOutput)).to.include(removeSpaces(correctErr.trim()));
  } finally {
    console.error = originalConsoleError;
  }
}

module.exports = { 
  removeSpaces, 
  checkTranspile, 
  checkRunConsoleLog, 
  checkRunConsoleError
};