/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura Procesadores de Lenguajes
 * Práctica 2 - Arith2js
 *
 * @autor Himar Edhey Hernández Alonso
 * @since Wed 19 Feb 2025 
 * @desc Este archivo contiene los tests de la práctica
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 */

const { transpile } = require("../src/transpile.js");
const run = require("../src/run.js");
const fs = require("fs/promises");
const { expect } = require('chai');

const TestExample = require('./test-example-description.js');
const TestHard = require('./test-hard-description.js');

const ExampleTest = TestExample.map(t => ({
  input: __dirname + '/examples/' + t.input,
  output: __dirname + '/examples/' + t.output,
  expected: __dirname + '/examples/' + t.expected,
  correctOut: __dirname + '/examples/' + t.correctOut,
}));

const HardTest = TestHard.map(t => ({
  input: __dirname + '/hard/' + t.input,
  output: __dirname + '/hard/' + t.output,
  expected: __dirname + '/hard/' + t.expected,
  correctOut: __dirname + '/hard/' + t.correctOut,
}));

const removeRequires = /require\(["'][\S]+["']\)/g;

function removeSpaces(s) {
  return s.replace(/\s/g, '').replace(removeRequires, '');
}

describe('Example Test', function () {
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

describe('Hard Tests', function () {
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

  describe('Hard Run Tests', function () {
    for (let i = 0; i < HardTest.length; i++) {
      it(`run function with ${HardTest[i].input}`, async function () {
        // Mock console.log
        let result = "";
        const oldLog = console.log;
        console.log = function (...s) { result += s.join(''); };

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