/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 *
 * @author ...
 * @since Thu 27 Mar 2025
 * @desc This file defines the FunctionObject class, which is a subclass of the 
 * CallableInstance class. Now it uses the StoreMap class to cache the results
 * of function calls for specific arguments.
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 */

const CallableInstance = require('callable-instance');
const { StoreMap } = require('./store-map.js');

/**
 * @class FunctionObject
 * @extends CallableInstance
 * @description This class represents a function object that can be called with
 * arguments. It now uses an internal StoreMap (as a tree) to cache results for
 * specific sequences of arguments.
 */
class FunctionObject extends CallableInstance {
  constructor(rawFunction) {
    super("_call");
    this.rawFunction = rawFunction;
    // Se utiliza un StoreMap para almacenar las asignaciones.
    // La estructura será una especie de árbol en la que cada nivel corresponde a un argumento.
    this.cacheTree = new StoreMap();
  }

  /**
   * Método que se invoca cuando se llama al objeto.
   * Recorre el árbol de caché según los argumentos recibidos y, si existe
   * un valor asignado para la secuencia correspondiente, lo retorna. 
   * En caso contrario, ejecuta la función original.
   * @param  {...any} args Los argumentos de la llamada.
   * @returns {*} El valor cacheado o el resultado de la función original.
   */
  _call(...args) {
    let currentMap = this.cacheTree;
    let valueFound;

    for (let i = 0; i < args.length; i++) {
      if (currentMap.has(args[i])) {
        valueFound = currentMap.get(args[i]);
        // Si el valor obtenido es otro StoreMap, seguimos descendiendo.
        if (valueFound instanceof StoreMap) {
          currentMap = valueFound;
        } else {
          // Se encontró un valor cacheado: se retorna inmediatamente.
          return valueFound;
        }
      } else {
        break;
      }
    }
    // Si no se encuentra asignación completa, se ejecuta la función original.
    return this.rawFunction(...args) ?? null;
  }

  /**
   * Devuelve una versión de la función que utiliza la caché.
   * @returns {Function} La función del FunctionObject.
   */
  toFunction() {
    return (...args) => this._call(...args);
  }

  toString() {
    return this.rawFunction.toString();
  }

  /**
   * Para la función actual, asigna que la llamada con la secuencia de argumentos
   * en cacheArgs retorne cacheValue en lugar de ejecutar la función original.
   * 
   * La implementación recorre (o crea) un árbol de StoreMap de modo que:
   * 
   * Por ejemplo, al ejecutar:
   * 
   *    assign([5, 2], "valor")
   * 
   * se crea una estructura similar a:
   * 
   *    cacheTree: {
   *       5 => StoreMap { 2 => "valor" }
   *    }
   *
   * De modo que, si la función es llamada con los argumentos (5, 2, ...),
   * se devolverá "valor". En cualquier otro caso se ejecutará rawFunction.
   *
   * @param {Array} cacheArgs Los argumentos a interceptar.
   * @param {*} cacheValue El valor a retornar cuando la secuencia coincide.
   * @throws {Error} Si cacheArgs es un array vacío.
   */
  assign(cacheArgs, cacheValue) {
    if (cacheArgs.length === 0) {
      throw new Error("Invalid empty argument on the left side of the assignment");
    }
    let currentMap = this.cacheTree;
    // Recorremos todos los argumentos, excepto el último, creando (o
    // utilizando) instancias de StoreMap para el enrutamiento.
    for (let i = 0; i < cacheArgs.length - 1; i++) {
      const key = cacheArgs[i];
      if (!currentMap.has(key)) {
        currentMap.set(key, new StoreMap());
      } else {
        const next = currentMap.get(key);
        if (!(next instanceof StoreMap)) {
          // En caso de que exista la clave pero no sea un StoreMap, se sobreescribe.
          currentMap.set(key, new StoreMap());
        }
      }
      currentMap = currentMap.get(cacheArgs[i]);
    }
    // Al final del recorrido, se asigna cacheValue al último argumento.
    const finalKey = cacheArgs[cacheArgs.length - 1];
    currentMap.set(finalKey, cacheValue);
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
