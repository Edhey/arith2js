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

const CallableInstance = require('callable-instance');
const { Complex } = require('complex.js');

/**
 * @class FunctionObject
 * @extends CallableInstance
 * @description This class represents a function object that can be called with
 * arguments. It extends the CallableInstance class and provides a way to cache
 * the results of function calls for specific arguments.
 */
class FunctionObject extends CallableInstance {
  constructor(rawFunction) {
    super("_call");
    this.rawFunction = rawFunction;
    this.cache = new Map();
    this.wrappedFunction = function (...args) {
      for (let argument of args) {
        if (argument instanceof Complex) {
          argument = argument.toString(); // TODO check
        }
        if (this.cache && this.cache.get(argument)) {
          return this.cache.get(argument);
        }
      }
      return this.rawFunction(...args);
    };
  }

  _call(arg) {
    return this.wrappedFunction(arg) ?? null;
  }

  toFunction() {
    return this.wrappedFunction;
  }

  toString() {
    return this.wrappedFunction.toString();
  }

  setCache(arg, value) {
    if (arg instanceof Complex) {
      arg = arg.toString(); // TODO check
    }
    this.cache.set(arg, value);
  }

  getCache(arg) {
    if (arg instanceof Complex) {
      arg = arg.toString();
    }
    return this.cache.get(arg);
  }
}

/** 
 * @description This function creates a new FunctionObject instance if the
 * provided argument is not an instance of FunctionObject. Otherwise, it returns
 * the provided argument.
 * @param {FunctionObject} rawFunction - The function to be wrapped.
 * @returns {FunctionObject} - The FunctionObject instance.
 */
function functionObject(rawFunction) {
  if (rawFunction instanceof FunctionObject) return rawFunction;
  return new FunctionObject(rawFunction);
}

module.exports = { FunctionObject, functionObject };