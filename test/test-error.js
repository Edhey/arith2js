const { transpile } = require("../src/transpile.js");
const { expect } = require('chai');
const fs = require("fs/promises");

const Tst = require('./test-error-description.js');

const Test = Tst.map(testDescription => ({
  input: __dirname + '/errors/syntax-error/' + testDescription.input,
  output: __dirname + '/errors/output/' + testDescription.output,
  correctErr: __dirname + '/errors/correct-err/' + testDescription.correctErr,
})
)

function removeSpaces(s) {
  return s.replace(/\s/g, '')
}

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
        try {
          await fs.unlink(Test[i].output);
        } catch (err) {
          // Ignore error if file does not exist
        }
      }
    });
  }
});