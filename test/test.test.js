/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 *
 * @autor Himar Edhey Hernández Alonso
 * @since Wed 26 Feb 2025
 * @desc Este archivo contiene los tests de la práctica
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 */

const { transpile } = require("../src/transpile.js");
const run = require("../src/run.js");
const fs = require("fs/promises");
const { expect } = require('chai');

const TestExample = require('./test-example-description.js');
const TestSimple = require('./test-description.js');
const TestHard = require('./test-hard-description.js');

/**
 * Test data for the examples
 */
const ExampleTest = TestExample.map(testDescription => ({
  input: __dirname + '/examples-data/input/' + testDescription.input,
  output: __dirname + '/examples-data/output/' + testDescription.output,
  expected: __dirname + '/examples-data/expected-js/' + testDescription.expected,
  correctOut: __dirname + '/examples-data/correct-out/' + testDescription.correctOut,
}));

/**
 * Test data for the simple tests
 */
const SimpleTest = TestSimple.map(testDescription => ({
  input: __dirname + '/data/input/' + testDescription.input,
  output: __dirname + '/data/output/' + testDescription.output,
  expected: __dirname + '/data/expected-js/' + testDescription.expected,
  correctOut: __dirname + '/data/correct-out/' + testDescription.correctOut,
}));

/**
 * Test data for the hard tests
 */
const HardTest = TestHard.map(testDescription => ({
  input: __dirname + '/hard/input/' + testDescription.input,
  output: __dirname + '/hard/output/' + testDescription.output,
  expected: __dirname + '/hard/expected-js/' + testDescription.expected,
  correctOut: __dirname + '/hard/correct-out/' + testDescription.correctOut,
}));

const removeRequires = /require\(["'][\S]+["']\)/g;

/**
 * Remove spaces and requires from the code
 * @param {string} code Input code to remove spaces and requires
 * @returns {string} Code without spaces and requires
 */
function removeSpaces(code) {
  return code.replace(/\s/g, '').replace(removeRequires, '');
}

/**
 * Example Tests
 * Run the simple tests and check the output
 */
describe('Example Test', function () {
  /**
   * Transpile the simple tests and check the output
   */
  describe('Example Transpile Tests', function () {
    for (let i = 0; i < ExampleTest.length; i++) {
      it(`transpile(${ExampleTest[i].input}, ${ExampleTest[i].output})`, async function () {
        // Compile the input and check the output program is what expected
        await transpile(ExampleTest[i].input, { output: ExampleTest[i].output });
        let output = await fs.readFile(ExampleTest[i].output, 'utf-8');
        let expected = await fs.readFile(ExampleTest[i].expected, 'utf-8');
        expect(removeSpaces(output)).to.equal(removeSpaces(expected));
        await fs.unlink(ExampleTest[i].output);
      });
    }
  });

  /**
   * Run the examples tests and check the output
   * Using mocking to check the output
   */
  describe('Example Run Tests', function () {
    for (let i = 0; i < ExampleTest.length; i++) {
      it(`run function with ${ExampleTest[i].input}`, async function () {
        // Mock console.log
        let result = "";
        const oldLog = console.log;
        console.log = function (...s) { result += s.join(''); };

        // Run the transpiled code using the run function and check the output
        await run(ExampleTest[i].input, { verbose: false });

        // Read the expected output
        let correctOut = await fs.readFile(ExampleTest[i].correctOut, 'utf-8');

        // Check the output
        expect(removeSpaces(result)).to.equal(removeSpaces(correctOut));

        // Restore console.log
        console.log = oldLog;
      });
    }
  });
});

/**
 * Simple Tests
 * Run the example tests and check the output
 */
describe('Simple Test', function () {
  /**
   * Transpile the example tests and check the output
   */
  describe('Simple Transpile Tests', function () {
    for (let i = 0; i < SimpleTest.length; i++) {
      it(`transpile(${SimpleTest[i].input}, ${SimpleTest[i].output})`, async function () {
        // Compile the input and check the output program is what expected
        await transpile(SimpleTest[i].input, { output: SimpleTest[i].output });
        let output = await fs.readFile(SimpleTest[i].output, 'utf-8');
        let expected = await fs.readFile(SimpleTest[i].expected, 'utf-8');
        expect(removeSpaces(output)).to.equal(removeSpaces(expected));
        await fs.unlink(SimpleTest[i].output);
      });
    }
  });

  /**
   * Run the simple tests and check the output
   * Using mocking to check the output
   */
  describe('Simple Run Tests', function () {
    for (let i = 0; i < SimpleTest.length; i++) {
      it(`run function with ${SimpleTest[i].input}`, async function () {
        // Mock console.log
        let result = "";
        const oldLog = console.log;
        console.log = function (...output) { result += output.join(''); };

        // Run the transpiled code using the run function and check the output
        await run(SimpleTest[i].input, { verbose: false });

        // Read the expected output
        let correctOut = await fs.readFile(SimpleTest[i].correctOut, 'utf-8');

        // Check the output
        expect(removeSpaces(result)).to.equal(removeSpaces(correctOut));

        // Restore console.log
        console.log = oldLog;
      });
    }
  });
});

/**
 * Hard Tests
 * Run the hard tests and check the output
 */
describe('Hard Tests', function () {
  /**
   * Transpile the hard tests and check the output
   */
  describe('Transpile Tests', function () {
    for (let i = 0; i < HardTest.length; i++) {
      it(`transpile(${HardTest[i].input}, ${HardTest[i].output})`, async function () {
        // Compile the input and check the output program is what expected
        await transpile(HardTest[i].input, { output: HardTest[i].output });
        let output = await fs.readFile(HardTest[i].output, 'utf-8');
        let expected = await fs.readFile(HardTest[i].expected, 'utf-8');
        expect(removeSpaces(output)).to.equal(removeSpaces(expected));
        await fs.unlink(HardTest[i].output);
      });
    }
  });

  /**
   * Run the hard tests and check the output
   * Using mocking to check the output
   */
  describe('Hard Run Tests', function () {
    for (let i = 0; i < HardTest.length; i++) {
      it(`run function with ${HardTest[i].input}`, async function () {
        // Mock console.log
        let result = "";
        const oldLog = console.log;
        console.log = function (...output) { result += output.join(''); };

        // Run the transpiled code using the run function and check the output
        await run(HardTest[i].input, { verbose: false });

        // Read the expected output
        let correctOut = await fs.readFile(HardTest[i].correctOut, 'utf-8');

        // Check the output
        expect(removeSpaces(result)).to.equal(removeSpaces(correctOut));

        // Restore console.log
        console.log = oldLog;
      });
    }
  });
});