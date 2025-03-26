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

class FunctionObject extends CallableInstance {
  constructor(rawFunction) {
    super("_call");
    this.rawFunction = rawFunction;
    this.cache = new Map();
    this.function = function (...args) {
      if (args.length) {
        let arg = args[0];
        arg = arg.toString(); // TODO check
        if (this?.cache && this.cache.get(arg)) {
          return this.cache.get(arg);
        }
      }
      return this.rawFunction(...args);
    };
  }

  _call(arg) {
    return this.function(arg) ?? null;
  }

  // toFunction() {
  //   return this.function;
  // }

  // toString() {
  //   return this.function.toString();
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

module.exports = { FunctionObject };