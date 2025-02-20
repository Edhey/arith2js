#!/usr/bin/env node

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura Procesadores de Lenguajes
 * Práctica 2 - Arith2js
 *
 * @author Himar Edhey Hernández Alonso
 * @since Wed 19 Feb 2025 
 * @desc Este archivo contiene el código para la ejecución del programa que
 *       convierte una expresión aritmética en un programa en JavaScript
 * @see {@link https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392}
 */


import { program } from "commander";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version } = require("../package.json");
import { transpile } from "../src/transpile.js";
import run from "../src/run.js";

program
  .version(version)
  .showSuggestionAfterError()
  //. fill the argument
  //. fill with option "-o, --output <filename>"
  //. write the action

program
  .command("transpile")
  .argument("<file>", "file with the original code to transpile")
  .option("-o, --output <filename>", "file to write the transpiled code")
  .option("-v, --verbose", "show the generated code")
  .description("Transpile an arithmetic expression into a JavaScript program")
  .action((file, options) => {
    transpile(file, options);
  });

program
  .command("run")
  .argument("<file>", "file with the original code to run")
  .description("Transpile to JS the code and run it")
  .option("-v, --verbose", "show the generated code")
  .action((file, options) => {
    run(file, options);
  });

// write the code to parse process.argv;
program.parse(process.argv);