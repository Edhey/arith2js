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

class FunctionObject extends CallableInstance {
  constructor(rawFunction) {
    super("_call");
    this.rawFunction = rawFunction;
    this.cache = new Map();
    this.wrappedFunction = function (...args) {
      if (args.length) {
        let arg = args[0];
        if (arg instanceof Complex) {
          arg = arg.toString(); // TODO check
        }
        if (this?.cache && this.cache.get(arg)) {
          return this.cache.get(arg);
        }
      }
      return this.rawFunction(...args);
    };
  }

  _call(arg) {
    return this.wrappedFunction(arg) ?? null;
  }

  // toFunction() {
  //   return this.wrappedFunction;
  // }

  // toString() {
  //   return this.wrappedFunction.toString();
  // }

  setCache(arg, value) {
    if (arg instanceof Complex) {
      arg = arg.toString();
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

function functionObject(rawFunction) {
  if (rawFunction instanceof FunctionObject) return rawFunction;
  return new FunctionObject(rawFunction);
}

module.exports = { FunctionObject, functionObject };