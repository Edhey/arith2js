const { transpile } = require("../src/transpile.js");
const { expect } = require('chai');
const fs = require("fs/promises");

const Tst = require('./test-error-description.js');

const Test = Tst.map(t => ({
  input: __dirname + '/errors/' + t.input,
  output: __dirname + '/errors/' + t.output,
  expected: __dirname + '/errors/' + t.expected,
  correctOut: __dirname + '/errors/' + t.correctOut,
})
)

function removeSpaces(s) {
  return s.replace(/\s/g, '')
}

describe('Error Tests', function () {
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
        const correctOut = await fs.readFile(Test[i].correctOut, 'utf-8');
        expect(removeSpaces(consoleOutput)).to.include(removeSpaces(correctOut.trim()));
      } finally {
        console.error = originalConsoleError;
        // Clean up the output file if it exists
        try {
          await fs.unlink(Test[i].output);
        } catch (err) {
          // Ignore error if file does not exist
        }
      }
    });
  }
});