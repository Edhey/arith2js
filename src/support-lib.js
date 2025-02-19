/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 * Práctica 2 - Arith2js
 *
 * @author Himar Edhey Hernández Alonso
 * @since Wed 19 Feb 2025 
 * @desc Librería de soporte con funciones de potencia y factorial 
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 *
 */

const power = (base, exponent) => Math.pow(base, exponent);
// const factorial = number => number === 0 ? 1 : number * factorial(number - 1);
// ! Gamma for factorial (float)
const factorial = n => gamma(n + 1); 

module.exports = { 
  power, 
  factorial 
};