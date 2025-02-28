/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 *
 * @autor Himar Edhey Hernández Alonso
 * @since Fri 28 Feb 2025
 * @desc Este archivo contiene los tests de los errores de la práctica
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 */

/**
 * Remove spaces and requires from the code
 * @param {string} code Input code to remove spaces and requires
 * @returns {string} Code without spaces and requires
 */
function removeSpaces(string) {
  return string.replace(/\s/g, '').
    replace(/^.*\/\*endofpreambleofgeneratedcode\*\//, '');
}

module.exports = { removeSpaces };