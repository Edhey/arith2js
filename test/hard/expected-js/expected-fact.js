const { print,gamma,Complex } = require("./src/support-lib.js");
print(gamma(Complex('3.5').add(Complex('1.2i'))).add(gamma(Complex('2.3i')))); 