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
    this.indexArray = [];
    for (let i = 0; i < array.length; i++) {
      i = new Complex(i);
      const value = (typeof array[i] !== "number") ? array[i] : new Complex(array[i]);
      this.assign([i], value);
    }
  }

  toString() {
    let output = "[ ";
    for (const index of this.indexArray) {
      const value = this._call(index);
      output += (value ? value.toString() : "null") + ", ";
    }
    return output.slice(0, -2) + " ]";
  }

  assign(cacheArgs, cacheValue) {
    if (cacheArgs.length === 0) {
      throw new Error("Invalid assignment of an empty array");
    }
    if (!cacheArgs.every(arg => arg instanceof Complex)) {
      throw new Error("Cannot use non numeric values in the index of an array");
    }
    if (!cacheArgs.every(arg => arg.re >= 0 && arg.im === 0)) {
      throw new Error("The index of an array must be a positive integer");
    }
    for (const arg of cacheArgs) this.indexArray.push(arg);
    let currentFunction = this.wrappedFunction;
    this.wrappedFunction = this._assing(currentFunction, cacheArgs, cacheValue, 0);
    return this; // TODO: Devolver this? wrappedFunction? nada?
  }

  _assing(currentFunction, cacheArgs, cacheValue, index) {
    let cacheArgument = cacheArgs[index];
    
    return (...args) => {
      let auxFunction = currentFunction;
      if (cacheArgument == null) {
        throw new Error("Invalid null argument on the left side of the assignment");
      }
      let equal = false;
      try {
        args[0]?.equals(cacheArgument);
        equal = args[0].equals(cacheArgument);
      } catch (e) {
        equal = args[0] === cacheArgument;
      }
      if (equal) {
        if (cacheArgs.length === index + 1) {
          return cacheValue;
        }
        auxFunction = currentFunction(...args);
        return this._assing(auxFunction, cacheArgs, cacheValue, index + 1);
      }
      return currentFunction(...args);
    };
  }
}

function arrayObject(...array) {
  return new ArrayFunctionObject(...array);
}

module.exports = { ArrayFunctionObject, arrayObject };