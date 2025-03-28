/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Procesadores de Lenguajes
 * Práctica 6 - While, for
 *
 * @author Himar Edhey Hernández Alonso
 * @since Wen 26 Mar 2025 
 * @desc Library to support the assign function
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himarlodashedhey-hernandez-alu0101552392}
 *
 */

/**
 * For the given function, assign the function call with the arguments provided 
 * to the value especified in the parameter cacheValue.
 * @param {FunctionObject} otherFunction It the function (callableInstance) 
 * to be assigned.
 * @param {Array} cacheArgs The arguments to be assigned to the function.
 * @param {Array} cacheValue The values to be assigned to the function.  
 */
function assign(otherFunction, cacheArgs, cacheValue) {
  for (let i = 0; i < cacheArgs.length; i++) {
    let cacheArgument = cacheArgs[i];
    let cacheValueArgument = cacheValue[i];
    if (cacheArgument !== undefined && cacheValueArgument !== undefined) {
      otherFunction.setCache(cacheArgument, cacheValueArgument);
    }
  }
}

module.exports = { assign };