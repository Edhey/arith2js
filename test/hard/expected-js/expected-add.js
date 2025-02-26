const { print,Complex } = require("./src/support-lib.js");
print(Complex('1').add(Complex('2i')).mul(Complex('3').add(Complex('4i'))).add(Complex('5').mul(Complex('6').add(Complex('7i'))))); 