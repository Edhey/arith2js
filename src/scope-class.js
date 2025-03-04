/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 * Práctica 3 - Hello Compilers
 * 
 * @autor Himar Edhey Hernández Alonso
 * @since Wed 26 Feb 2025
 * @desc Clase Scope que permite
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 *
 */

const {
  buildIdentifier,
  buildVariableDeclaration,
  buildVariableDeclarator,
} = require('./ast-build.js');


/**
 * Represents a scope in which variables can be declared, initialized, and used.
 * This class helps in tracking variable declarations and usage within a given scope.
 */
class Scope {
  /**
   * Creates an instance of Scope.
   * @param {Scope|null} parent - The parent scope, or null if this is the root scope.
   */
  constructor(parent) {
    this.parent = parent;
    this.initialized = new Set();
    this.used = new Set();
    this.usedBeforeDeclaration = new Set();
    this.letDeclarations = [];
  }

  /**
   * Adds a variable to the scope and marks it as initialized.
   * @param {string} name - The name of the variable to add.
   */
  add(name) {
    this.initialized.add(name);
    this.letDeclarations.push(buildVariableDeclarator(buildIdentifier(name)));
  }

  /**
   * Marks a variable as initialized.
   * @param {string} name - The name of the variable to mark as initialized.
   */
  setAsInitialized(name) {
    this.initialized.add(name);
  }

  /**
   * Marks a variable as used.
   * @param {string} name - The name of the variable to mark as used.
   */
  setAsUsed(name) {
    this.used.add(name);
  }

  /**
   * Marks a variable as used before declaration.
   * @param {string} name - The name of the variable to mark as used before 
   * declaration.
   */
  setAsUsedBeforeDeclaration(name) {
    this.usedBeforeDeclaration.add(name);
  }

  /**
   * Checks if a variable is initialized in the current scope.
   * @param {string} name - The name of the variable to check.
   * @returns {boolean} - True if the variable is initialized, false otherwise.
   */
  has(name) {
    return this.initialized.has(name);
  }

  /**
   * Builds a variable declaration statement for all let declarations in the scope.
   * @returns {Object} - The AST node representing the variable declaration.
   */
  buildDeclaration() {
    return buildVariableDeclaration(this.letDeclarations);
  }

  /**
   * Returns the variables that are declared but not used
   * @returns {Set} set of not used variables
   */
  notUsedVariables() {
    return this.initialized.difference(this.used);
  }

  /**
   * Returns the variables that are declared but not used as an array
   * of strings
   * @returns {String[]} array of strings with the not used variables
   */
  notUsedVariablesAnalysis() {
    const notUsedVariables = this.notUsedVariables();
    return this.showVariableErrorMessages(notUsedVariables,
      'Variable declared but not used:');
  }

  /**
   * Returns the variables that are used but not declared
   * @returns {Set} set of not declared variables
   */
  notDeclaredVariables() {
    return this.used.difference(this.initialized);
  }

  /**
   * Returns the variables that are declared but not used as an array
   * of strings
   * @returns {string[]} array of strings with the not used variables
   */
  notDeclaredVariablesAnalysis() {
    const notDeclaredVariables = this.notDeclaredVariables();
    return this.showVariableErrorMessages(notDeclaredVariables,
      'Variable not declared:');
  }

  usedBeforeDeclarationVariablesAnalysis() {
    const usedBeforeDeclarationVariables = this.usedBeforeDeclaration;
    return this.showVariableErrorMessages(usedBeforeDeclarationVariables,
      'Variable used before declaration:');
  }

  /**
   * Helper function to show the errors related with variables
   * @returns {String} string with the error messages or null if there are no 
   * errors
   */
  showVariableErrorMessages(variables, message) {
    if (variables.size > 0) {
      return Array.from(variables).
        map(element => element.replace(/^[$]/, '')).
        map(element => `${message} ${element}`).join('\n');
    }
    return null;
  }

  /**
   * Returns the number of variables declared in the scope
   * @returns {Number} number of variables declared in the scope
   */
  get length() {
    return this.letDeclarations.length;
  }
}

module.exports = Scope;