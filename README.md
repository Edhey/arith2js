# arith2js

> **Note:** This project is the legacy core calculator transpiler, which later evolved into a fully-fledged Langium-based DSL and VS Code Language Server in [calcjs-langium](https://github.com/Edhey/calcjs-langium).

## Author

Himar Edhey Hernández Alonso - [GitHub](https://github.com/Edhey)

## Description

This project transpiles arithmetic expressions into JavaScript programs. It uses Jison for lexical and syntactic analysis, generating an AST (Abstract Syntax Tree) that is subsequently converted into executable JavaScript code. It supports both simple and complex arithmetic expressions, including integers, decimals, scientific notation, and complex numbers.

- **v1.6.0+:** Added support for variable handling, allowing definitions and assignments within arithmetic expressions.
- **v1.7.0+:** Added support for single-parameter anonymous functions, logical operators, and comparison operators. *(Note: Factorial operator changed from `!` to `ç`, as `!` is now reserved for logical negation).*
- **v1.8.0+:** Added `for` and `while` loops functioning as arithmetic expressions. Utilizes monkey-patching to extend operations across `Complex`, `Boolean`, `String`, and `Function` types.

## Project Structure

- `bin/`: Execution scripts.
  - `calc2js.mjs`: Main CLI script.
  - `test-script/`: Test automation scripts.
- `docs/`: Documentation folder.
- `examples/`: Sample arithmetic expression files.
- `src/`: Source code.
  - `ast-build.js`: AST builder.
  - `calc.js`: Parser and evaluator.
  - `code-generation.js`: JavaScript code generator using `recast`.
  - `grammar.jison`: Grammar definition.
  - `lexer.l`: Lexer rules.
  - `scope-class.js`: Scope class definition.
  - `scope.js`: Variable scope handler.
  - `support-lib.js`: Helper utilities.
  - `templates/`: JS code templates.
  - `transpile.js`: AST-to-JS conversion logic.
  - `write-code.js`: File writer for transpiled output.
- `test/`: Test suites (`data`, `errors`, `examples-data`, `hard`).

## Installation

1. Clone the repository:

    ```sh
    git clone [https://github.com/Edhey/arith2js.git](https://github.com/Edhey/arith2js.git)
    cd arith2js
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

## Usage

Allows transpiling arithmetic expressions to JavaScript programs or executing them directly.

### Options

Usage: `calc2js [options] <file>`

- **Arguments:**
  - `file`: Source code file to transpile.
- **Options:**
  - `-V, --version`: Output the version number.
  - `-o, --output <file>`: Write output to a specific file.
  - `-v, --verbose`: Display generated code.
  - `-a, --ast`: Display the AST.
  - `-s, --scope`: Display variable scopes.
  - `-D, --definitions`: Display variable definitions.
  - `-r, --run`: Execute the generated code.
  - `-re, --return`: Show the value of the last statement.
  - `-S, --string`: Show the value of the last statement as a string.
  - `-h, --help`: Display help.

#### Examples

Transpile an expression to JavaScript:

```sh
node bin/calc2js.mjs examples/example1.txt

```

Transpile and execute:

```sh
node bin/calc2js.mjs examples/example1.txt -r

```

## NPM Scripts

- `npm test`: Run tests.
- `npm run test-example`: Run example tests.
- `npm run test-simple`: Run simple tests.
- `npm run test-hard`: Run hard tests.
- `npm run test-error`: Run error tests.
- `npm run cov`: Run tests with `nyc` coverage.
- `npm run coverage`: Generate coverage reports (HTML & text).
- `npm run compile`: Compile grammar and lexer (`jison`).
- `npm run docs`: Clean and generate JSDoc and coverage documentation.
- `npm run dev`: Start a local development server to preview documentation.

```json
"scripts": {
  "test": "npm run compile; mocha test/",
  "test-example": "npm run compile; mocha test/ --grep 'Example Test'",
  "test-simple": "npm run compile; mocha test/ --grep 'Simple Test'",
  "test-hard": "npm run compile; mocha test/ --grep 'Hard Test'",
  "test-error": "npm run compile; mocha test/ --grep 'Error Test'",
  "compile": "jison src/grammar.jison src/lexer.l -o src/calc.js",
  "trans": "./bin/calc2js.mjs",
  "exec": "./bin/calc2js.mjs --run",
  "cov": "nyc npm test",
  "report": "nyc --report --reporter=html --report-dir=docs/coverage -x src/template.js npm test",
  "coverage": "c8 --reporter=html --reporter=text --report-dir='docs/coverage' npm test",
  "jsdocs": "jsdoc -c jsdoc.json",
  "docs": "npm run clean:docs && npm run jsdocs && npm run coverage",
  "clean": "rm -f src/calc.js && npm run clean:docs",
  "clean:docs": "rm -fR docs/coverage && rm -fR docs/jsdoc",
  "dev": "http-server -c-1 -o docs"
}

```

## Testing & Coverage

Run the main test suite via:

```sh
npm run test

```

Documentation and coverage reports can be generated and served locally using:

```sh
npm run docs
npm run dev

```

## License

This project is licensed under the **MIT License**.

## AI Assistance Disclaimer

AI tools (such as GitHub Copilot) were utilized during the development of this project to assist with code structuring, efficiency, debugging, and generating JSDoc comments. All suggestions were carefully reviewed and validated.
