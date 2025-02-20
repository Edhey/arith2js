
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

## Licencia

Este proyecto está licenciado bajo la Licencia ISC.