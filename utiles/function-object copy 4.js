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

const CallableInstance = require('callable-instance');
const { StoreMap } = require('../src/function-object/store-map.js');

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
    this.cache = new StoreMap();
  }

  _call(arg) {
    const result = this.getCacheValue(arg);
    if (result) {
      return result;
    }
    return this.rawFunction(arg);
  }

  toFunction() {
    return this.rawFunction;
  }

  toString() {
    return this.rawFunction.toString(); // TODO: Comprobar si es wrappedFunction
  }

  getCacheValue(...args) {
    for (const arg of args) {
      if (this.cache.get(arg)) {
        return this.cache.get(arg);
      }
    }
  }

  /**
 * For the given function, assign the function call with the arguments provided 
 * to the value especified in the parameter cacheValue.
 * @param {FunctionObject} otherFunction It the function (callableInstance) 
 * to be assigned.
 * @param {Array} cacheArgs The arguments to be assigned to the function.
 * @param {Array} cacheValue The value to be assigned to the function in the 
 * call with the arguments provided.   
 */
  assign(cacheArgs, cacheValue) {
    if (cacheArgs.length === 0) {
      throw new Error("Invalid empty argument on the left side of the assignment");
    }
    this.rawFunction = this._assing(this.rawFunction, cacheArgs, cacheValue, 0);
  }

  _assing(currentFunction, cacheArgs, cacheValue, index) {
    if (index === cacheArgs.length - 1) {
      this.cache.set(cacheArgs[index], cacheValue);
      return currentFunction;
    }
    this(cacheArgs[index])._assing(currentFunction, cacheArgs, cacheValue, index + 1);
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