/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 *
 * @author Himar Edhey Hernández Alonso
 * @since Thu 27 Mar 2025
 * @desc This file defines the FunctionObject class, which is a subclass of the 
 * CallableInstance class.
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 */

const { FunctionObject } = require("./function-object");
const { Complex } = require('complex.js');

class ArrayFunctionObject extends FunctionObject {
  constructor(...array) {
    const arrayInitialFunction = (index) => null;
    super(arrayInitialFunction);
    this.array = array;
    for (let i = 0; i < array.length; i++) {
      i = new Complex(i);
      const value = (typeof array[i] !== "number") ? array[i] : new Complex(array[i]);
      this.assign([i], value);
    }
  }

  toString() {
    let output = "[ ";
    for (let i = 0; i < this.array.length; i++) {
      i = new Complex(i);
      const value = this._call(i);
      output += (value ? value.toString() : "null") + ", ";
    }
    return output.slice(0, -2) + " ]";
  }
}

function arrayObject(...array) {
  return new ArrayFunctionObject(...array);
}

module.exports = { ArrayFunctionObject, arrayObject };

// if (!cacheArgs.every(arg => arg instanceof Complex)) {
//   throw new Error("Cannot use non numeric values in the index of an array");
// }