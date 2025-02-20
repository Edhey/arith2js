
# arith2js

## Autor

Himar Edhey Hernández Alonso - [GitHub](https://github.com/Edhey)

## Descripción

Este proyecto transpila expresiones aritméticas a programas en JavaScript. Utiliza Jison para el análisis léxico y sintáctico, y genera un AST (Árbol de Sintaxis Abstracta) que luego se convierte en código JavaScript.

## Estructura del Proyecto

```
.
├── .gitignore
├── .nyc_output/
├── bin/
│   └── calc2js.mjs
├── package.json
├── README.md
├── src/
│   ├── ast-build.js
│   ├── calc.js
│   ├── grammar.jison
│   ├── lexer.l
│   ├── run.js
│   ├── support-lib.js
│   ├── templates.js
│   └── transpile.js
├── test/
│   ├── errors/
│   ├── examples/
│   ├── hard/
│   ├── test-error-description.js
│   ├── test-error.js
│   ├── test-example-description.js
│   ├── test-hard-description.js
│   └── test.js
```

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/ULL-ESIT-PL-2425/arith2js-himar_edhey-hernandez-alu0101552392.git
    cd arith2js-himar_edhey-hernandez-alu0101552392
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

## Uso

### Transpilar una expresión aritmética

Para transpilar una expresión aritmética a un programa en JavaScript, usa el siguiente comando:

```sh
node bin/calc2js.mjs transpile <archivo.calc> -o <archivo.js>
```

### Ejecutar una expresión aritmética

Para ejecutar una expresión aritmética directamente, usa el siguiente comando:

```sh
node bin/calc2js.mjs run <archivo.calc>
```

## Scripts de npm

- `npm run compile`: Compila la gramática y el lexer.
- `npm test`: Ejecuta los tests.
- `npm run cov`: Ejecuta los tests y genera un reporte de cobertura.
- `npm run report`: Genera un reporte de cobertura en formato HTML.
- `npm run test-example`: Ejecuta los tests de ejemplos.
- `npm run test-hard`: Ejecuta los tests difíciles.

## Tests

Para ejecutar los tests, usa el siguiente comando:

```sh
npm run test
```
## Test Coverage Report

  45 passing (118ms)
```
----------------|---------|----------|---------|---------|-----------------------------------------------------------------------------------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                             
----------------|---------|----------|---------|---------|-----------------------------------------------------------------------------------------------
All files       |   64.59 |    50.52 |   57.77 |   62.13 |                                                                                               
 ast-build.js   |     100 |      100 |     100 |     100 |                                                                                               
 calc.js        |   59.87 |    48.87 |   40.62 |   56.29 | ...65,473,479-482,490,511-519,534-537,557-566,575-596,605-607,609,611,613-615,617,639-644,647 
 run.js         |   84.61 |       50 |     100 |   91.66 | 40                                                                                            
 support-lib.js |     100 |      100 |     100 |     100 |                                                                                               
 transpile.js   |   90.32 |       80 |     100 |   93.33 | 76,104                                                                                        
----------------|---------|----------|---------|---------|-----------------------------------------------------------------------------------------------
```

## Licencia

Este proyecto está licenciado bajo la Licencia ISC.