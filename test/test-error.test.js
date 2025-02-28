/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 *
 * @autor Himar Edhey Hernández Alonso
 * @since Wed 26 Feb 2025
 * @desc Este archivo contiene los tests de los errores de la práctica
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 */

const { transpile } = require("../src/transpile.js");
const { expect } = require('chai');
const fs = require("fs/promises");

const Tst = require('./test-error-description.js');

const { removeSpaces } = require('./test-utils.js');

/**
 * Test data for the simple tests
 */
const Test = Tst.map(testDescription => ({
  input: __dirname + '/errors/syntax-error/' + testDescription.input,
  output: __dirname + '/errors/output/' + testDescription.output,
  correctErr: __dirname + '/errors/correct-err/' + testDescription.correctErr,
})
);

/**
 * Syntax Error Tests
 * Run the simple tests and check the output
 */
describe('Syntax Error Tests', function () {
  for (let i = 0; i < Test.length; i++) {
    it(`transpile(${Tst[i].input}, ${Tst[i].output})`, async () => {
      let consoleOutput = "";
      const originalConsoleError = console.error;
      console.error = (message) => { consoleOutput += message; };

      try {
        await transpile(Test[i].input, { output: Test[i].output });
        const output = await fs.readFile(Test[i].output, 'utf-8');
        const expected = await fs.readFile(Test[i].expected, 'utf-8');
        expect(removeSpaces(output)).to.equal(removeSpaces(expected));
      } catch (e) {
        const correctErr = await fs.readFile(Test[i].correctErr, 'utf-8');
        expect(removeSpaces(consoleOutput)).to.include(removeSpaces(correctErr.trim()));
      } finally {
        console.error = originalConsoleError;
        // Clean up the output file if it exists
        // try {
        //   await fs.unlink(Test[i].output);
        // } catch (err) {
        //   // Ignore error if file does not exist
        // }
      }
    });
  }
});