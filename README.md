# Scope Intro

## Autor

Himar Edhey Hernández Alonso - [GitHub](https://github.com/Edhey)

## Descripción

Este proyecto transpila expresiones aritméticas a programas en JavaScript. Utiliza Jison para el análisis léxico y sintáctico, y genera un AST (Árbol de Sintaxis Abstracta) que luego se convierte en código JavaScript. Es capaz de funcionar tanto con expresiones aritméticas simples como con expresiones aritméticas complejas, con números enteros, decimales, en notación científica y complejos.

A partir de la versión 1.6.0, se ha añadido la capacidad de manejar variables, que se pueden definir y asignar en las expresiones aritméticas.

A partir de la versión 1.7.0, se ha añadido la capacidad de manejar funciones anónimas, de un solo parámetro, que se pueden utilizar en las expresiones aritméticas. Además, se han añadido operadores lógicos y de comparación. Cambio en factorial antes ! -> ahora ç, pues ahora ! es el operador de negación.

En la versión 1.8.0, se ha añadido la capacidad de usar bucles for y while que funcionan como expresiones aritméticas. Se usa monkey patching para añadir las diferentes funciones entre tipos y operandos, habiéndose extendido el uso del programa para tipos Complex, Boolean, String y Function.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

- `bin/`: Contiene los scripts de ejecución.
  - `calc2js.mjs`: Script principal.
  - `test-script/`: Contiene scripts de automatización de tests.
- `docs/`: Contiene la documentación.
- `examples/`: Contiene ejemplos de expresiones aritméticas sencillas.
- `src/`: Contiene el código fuente.
  - `ast-build.js`: Construye el AST.
  - `calc.js`: Analiza y evalúa las expresiones aritméticas.
  - `code-generation.js`: Genera código JavaScript usando recast.
  - `grammar.jison`: Define la gramática.
  - `lexer.l`: Define las reglas del lexer.
  - `scope-class.js`: Define la clase Scope.
  - `scope.js`: Define el ámbito de las variables.
  - `support-lib.js`: Contiene funciones auxiliares.
  - `templates/`: Contiene plantillas de código JavaScript.
  - `transpile.js`: Convierte el AST en código JavaScript.
  - `write-code.js`: Escribe el código JavaScript en un archivo.
- `test/`: Contiene los tests.
  - `data/`: Contiene los datos de los tests simples.
  - `errors/`: Contiene los datos de los tests de errores.
  - `examples-data/`: Contiene los datos de los tests de ejemplos.
  - `hard/`: Contiene los datos de los tests difíciles.
  - `*.test.js`: Archivos que definen los tests.
  - `*.js`: Archivos que describen los datos de los tests.

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

Este programa permite transpilar expresiones aritméticas a programas en JavaScript y ejecutar expresiones aritméticas directamente.

#### Opciones

Uso: calc2js [opciones] <archivo>

Transpila una expresión aritmética a un programa en JavaScript

- Argumentos:
  - `archivo`                  archivo con el código original a transpilar

- Opciones:
  - `-V, --version`            muestra el número de versión
  - `-o, --output` <archivo>   archivo donde escribir el código transpiliado
  - `-v, --verbose`            muestra el código generado
  - `-a, --ast`                muestra el AST
  - `-s, --scope`              muestra el ámbito
  - `-D, --definitions`        muestra la definición de las variables
  - `-r, --run`                ejecuta el código generado
  - `-re, --return`            muestra el valor de la última sentencia
  - `-S, --string`             muestra el valor de la última sentencia como una cadena
  - `-h, --help`               muestra ayuda para el comando

#### Ejemplos

Transpilar una expresión aritmética a un programa en JavaScript:

```sh
node bin/calc2js.mjs examples/example1.txt
```

Transpilar una expresión aritmética a un programa en JavaScript y ejecutarla:

```sh
node bin/calc2js.mjs examples/example1.txt -r
```

Transpilar una expresión aritmética a un programa en JavaScript y mostrar el valor de la última sentencia:

```sh
node bin/calc2js.mjs examples/example1.txt -re
```

Transpilar una expresión aritmética a un programa en JavaScript y mostrar el valor de la última sentencia como una cadena:

```sh
node bin/calc2js.mjs examples/example1.txt -S
```

Transpilar una expresión aritmética a un programa en JavaScript y mostrar el código generado:

```sh
node bin/calc2js.mjs examples/example1.txt -v
```

Transpilar una expresión aritmética a un programa en JavaScript y mostrar el AST:

```sh
node bin/calc2js.mjs examples/example1.txt -a
```

Transpilar una expresión aritmética a un programa en JavaScript y mostrar el ámbito:

```sh
node bin/calc2js.mjs examples/example1.txt -s
```

Transpilar una expresión aritmética a un programa en JavaScript y mostrar la definición de las variables:

```sh
node bin/calc2js.mjs examples/example1.txt -D
```

## Scripts de npm (package.json)

- `npm test`: Ejecuta los tests.
- `npm run test-example`: Ejecuta los tests de ejemplos.
- `npm run test-simple`: Ejecuta los tests sencillos.
- `npm run test-hard`: Ejecuta los tests difíciles.
- `npm run test-error`: Ejecuta los tests de errores.
- `npm run cov`: Ejecuta los tests y genera un reporte de cobertura.
- `npm run report`: Genera un reporte de cobertura en formato HTML.
- `npm run compile`: Compila la gramática y el lexer.
- `npm run trans`: Transpila una expresión aritmética a un programa en JavaScript.
- `npm run exec`: Ejecuta el código generado.
- `npm run coverage`: Genera un reporte de cobertura en formato HTML y texto.
- `npm run jsdocs`: Genera la documentación del código usando JSDoc.
- `npm run docs`: Limpia y genera la documentación del código y el reporte de cobertura.
- `npm run clean`: Limpia los archivos generados.
- `npm run clean:docs`: Limpia la documentación generada.
- `npm run dev`: Inicia un servidor de desarrollo para visualizar la documentación.

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

## Tests

Existen test de ejemplos, test sencillos, test difíciles y test de errores.

- Los test de ejemplos son test faciles cuya respuesta es obvia a simple vista.
- Los test sencillos comprueban que las expresiones aritméticas se evalúan correctamente.
- Los test difíciles comprueban que las expresiones aritméticas complejas se evalúan correctamente.
- Los test de errores comprueban que las expresiones aritméticas con errores sintácticos se detectan correctamente.

Para ejecutar los tests, usa el siguiente comando:

```sh
npm run test
```

Si quisieras ejecutar alguna de las clases de test en concreto, puedes hacerlo con los comandos listados en la sección Scripts de npm.

## Test Coverage Report

El reporte de cobertura se genera con el siguiente comando:

```sh
npm run coverage
```

153 passing (1s)

--------------------|---------|----------|---------|---------|-------------------------------------------------------------------------------------------------------------------------------------------

File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|-------------------------------------------------------------------------------------------------------------------------------------------
All files           |   85.53 |     76.3 |   77.94 |   85.53 |
 ast-build.js       |     100 |      100 |     100 |     100 |
 calc.js            |   72.09 |    66.66 |   51.61 |   72.09 | ...45-469,488-489,496-497,501-506,513-514,534-543,557-565,580,585-590,598-599,604-609,614,619,636-639,641,643,645,647,649,671-676,679-680
 code-generation.js |     100 |    66.66 |     100 |     100 | 33
 scope-class.js     |     100 |      100 |     100 |     100 |
 scope.js           |     100 |      100 |     100 |     100 |
 support-lib.js     |   96.87 |    82.35 |     100 |   96.87 | 70-71,89
 transpile.js       |   84.14 |    63.63 |     100 |   84.14 | 45-47,65-69,72-76
 write-code.js      |     100 |       75 |     100 |     100 | 23
--------------------|---------|----------|---------|---------|-------------------------------------------------------------------------------------------------------------------------------------------

Se puede ver el reporte de cobertura en formato HTML con el siguiente comando:

```sh
npm run report
```

## Documentación

La documentación se genera con JSDoc. Cada clase y función tiene su propio comentario de documentación en dicho formato.
Para generarla , usa el siguiente comando:

```sh
npm run docs
```

Finalmente podrás visualizar toda la documentación incluyendo el reporte de cobertura en tu navegador con el siguiente comando:

```sh
npm run dev
```

También puedes abrir el index con alguna extensión como *live-server* para visualizarlo en tu navegador.

Esta docuemntación se despliega automáticamente en Github Pages al hacer push. Puedes acceder a él [aquí](https://ull-esit-pl-2425.github.io/arith2js-himar_edhey-hernandez-alu0101552392/).

## Workflow

### Coverage

Existe una Github Action que ejecuta los tests y genera un reporte de cobertura. Puedes ver el reporte de cobertura en el directorio `docs/` o en Github Pages.

### Github Registry

Otra Github Action que publica automáticamente el paquete en el Github Registry al hacer push.

### Clean Install

Esta Github Action instala las dependencias y ejecuta los tests.

## Licencia

Este proyecto está licenciado bajo la Licencia ISC.

## IA

Para realizar este proyecto, se ha utilizado la IA de GitHub mayoritariamente para aumentar la velocidad de desarrollo y la calidad del código. Las sugerencias de código han sido útiles para ello, pero se debe ir con mucho ojo pues no siempre son correctas. Por otra parte, la IA me ha resultado una buena herramienta para poder documentar el código de manera más eficiente. Por último, me he apoyado en ella para entender mejor el por qué de algunos errores y cómo solucionarlos.
