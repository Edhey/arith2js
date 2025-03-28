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

  /**
 * For the given function, assign the function call with the arguments provided 
 * to the value especified in the parameter cacheValue.
 * @param {FunctionObject} otherFunction It the function (callableInstance) 
 * to be assigned.
 * @param {Array} cacheArgs The arguments to be assigned to the function.
 * @param {Array} cacheValue The values to be assigned to the function.  
 */
  assign(cacheArgs, cacheValue) {
    for (let i = 0; i < cacheArgs.length; i++) {
      let cacheArgument = cacheArgs[i];
      let cacheValueArgument = cacheValue[i];
      if (cacheArgument !== undefined && cacheValueArgument !== undefined) {
        this.cache.set(cacheArgument, cacheValueArgument);
      }
    }
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