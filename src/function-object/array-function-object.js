/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 *
 * @author Himar Edhey Hernández Alonso
 * @since Wed 26 Feb 2025
 * @desc This file defines the FunctionObject class, which is a subclass of the 
 * CallableInstance class.
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 */

const CallableInstance = require("callable-instance");

class ArrayFunctionObject extends CallableInstance {
  constructor(...array) {
    super("_call");
    this.array = array;
  }

  assign(cacheArgs, cacheValue) {
    let aux = this.array;
    for (let i = 0; i < cacheArgs.length - 1; i++) {
      let index = cacheArgs[i];
      if (index.re < 0 && index.im === 0 && Number.isInteger(index.re)) {
        index.re = aux.length + index.re;
      }
      aux = aux[index]?.array;
    }
    let index = cacheArgs[cacheArgs.length - 1];
    if (index.re < 0 && index.im === 0 && Number.isInteger(index.re)) {
      index.re = aux.length + index.re;
    }
    aux[index] = cacheValue;
  }

  _call(index) {
    if (index.re < 0 && index.im === 0 && Number.isInteger(index.re)) {
      index.re = this.array.length + index.re;
    }
    return this.array[index];
  }

  toFunction() {
    return this.array;
  }
}

function arrayObject(...array) {
  return new ArrayFunctionObject(...array);
}

module.exports = { ArrayFunctionObject, arrayObject };