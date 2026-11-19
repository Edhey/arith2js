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
 * @see {@link https://github.com/Edhey/arith2js}
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
    this.rawFunction = rawFunction; // La función original
    this.cache = new StoreMap(); // Mapa para almacenar valores asignados
  }

  /**
   * Llama a la función con un argumento y utiliza el cache si está disponible.
   * @param {*} arg El argumento para la función
   * @returns {*} El resultado de la función o el valor cacheado
   */
  _call(arg) {
    if (this.cache.has(arg)) {
      return this.cache.get(arg); // Devuelve el valor cacheado si existe
    }
    const result = this.rawFunction(arg); // Llama a la función original
    this.cache.set(arg, result); // Almacena el resultado en el cache
    return result;
  }

  /**
   * Asigna un valor a una secuencia de argumentos.
   * @param {Array} cacheArgs Los argumentos para los que se asignará el valor
   * @param {*} cacheValue El valor a asignar
   */
  assign(cacheArgs, cacheValue) {
    if (cacheArgs.length === 0) {
      throw new Error("Invalid empty argument on the left side of the assignment");
    }
    this._assignRecursive(this.cache, cacheArgs, cacheValue, 0);
  }

  /**
   * Asigna recursivamente valores en el mapa de cache.
   * @param {StoreMap} currentCache El mapa de cache actual
   * @param {Array} cacheArgs Los argumentos para los que se asignará el valor
   * @param {*} cacheValue El valor a asignar
   * @param {number} index El índice actual en la secuencia de argumentos
   */
  _assignRecursive(currentCache, cacheArgs, cacheValue, index) {
    const cacheArgument = cacheArgs[index];
    if (index === cacheArgs.length - 1) {
      currentCache.set(cacheArgument, cacheValue); // Asigna el valor al último argumento
      return;
    }
    if (!currentCache.has(cacheArgument)) {
      currentCache.set(cacheArgument, new StoreMap()); // Crea un nuevo StoreMap si no existe
    }
    const nestedCache = currentCache.get(cacheArgument);
    this._assignRecursive(nestedCache, cacheArgs, cacheValue, index + 1); // Llama recursivamente
  }

  /**
   * Obtiene un valor asignado a una secuencia de argumentos.
   * @param {Array} args Los argumentos para buscar el valor
   * @returns {*} El valor asignado o undefined si no existe
   */
  getCacheValue(...args) {
    let currentCache = this.cache;
    for (const arg of args) {
      if (!currentCache.has(arg)) {
        return undefined; // Devuelve undefined si no se encuentra el argumento
      }
      currentCache = currentCache.get(arg);
    }
    return currentCache;
  }

  /**
   * Convierte el objeto en una función que utiliza el cache.
   * @returns {Function} La función que utiliza el cache
   */
  toFunction() {
    return (...args) => this._call(args[0]);
  }

  /**
   * Convierte el objeto en una representación de cadena.
   * @returns {string} La representación de cadena de la función
   */
  toString() {
    return this.rawFunction.toString();
  }
}

/** 
 * @description Esta función crea una nueva instancia de FunctionObject si el
 * argumento proporcionado no es una instancia de FunctionObject. De lo contrario,
 * devuelve el argumento proporcionado.
 * @param {FunctionObject} rawFunction - La función a envolver.
 * @returns {FunctionObject} - La instancia de FunctionObject.
 */
function functionObject(rawFunction) {
  if (rawFunction instanceof FunctionObject) return rawFunction;
  return new FunctionObject(rawFunction);
}

module.exports = { FunctionObject, functionObject };