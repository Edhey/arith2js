const { transpile } = require("../src/transpile.js");
const assert = require('assert');
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

for (let i = 0; i < Test.length; i++) {
  it(`transpile(${Tst[i].input}, ${Tst[i].output})`, async () => {
   // Write the code 
  });
}


