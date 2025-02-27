# Hello Compiler

## Autor
Himar Edhey Hernández Alonso - [GitHub](https://github.com/Edhey)

## Descripción
Este proyecto transpila expresiones aritméticas a programas en JavaScript. Utiliza Jison para el análisis léxico y sintáctico, y genera un AST (Árbol de Sintaxis Abstracta) que luego se convierte en código JavaScript. Es capaz de funcionar tanto con expresiones aritméticas simples como con expresiones aritméticas complejas, con números enteros, decimales, en notación científica y complejos.

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
    - `grammar.jison`: Define la gramática.
    - `lexer.l`: Define las reglas del lexer.
    - `run.js`: Ejecuta una expresión aritmética.
    - `support-lib.js`: Contiene funciones auxiliares.
    - `templates/`: Contiene plantillas de código JavaScript.
    - `transpile.js`: Convierte el AST en código JavaScript.
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
- `-V, --version`: Muestra la versión.
- `-h, --help`: Muestra la ayuda.

### Transpilar una expresión aritmética
Para transpilar una expresión aritmética a un programa en JavaScript, usa el siguiente comando:

```sh
node bin/calc2js.mjs transpile <archivo.calc> -o <archivo.js>
```

#### Opciones
- `-o, --output <archivo.js>`: Especifica el archivo de salida.
- `-v, --verbose`: Muestra el código JavaScript generado.

### Ejecutar una expresión aritmética
Para ejecutar una expresión aritmética directamente, usa el siguiente comando:

```sh
node bin/calc2js.mjs run <archivo.calc>
```

#### Opciones
- `-v, --verbose`: Muestra el código JavaScript generado.

## Scripts de npm (package.json)
- `npm test`: Ejecuta los tests.
- `npm run test-example`: Ejecuta los tests de ejemplos.
- `npm run test-simple`: Ejecuta los tests sencillos.
- `npm run test-hard`: Ejecuta los tests difíciles.
- `npm run test-error`: Ejecuta los tests de errores.
- `npm run cov`: Ejecuta los tests y genera un reporte de cobertura.
- `npm run report`: Genera un reporte de cobertura en formato HTML.
- `npm run compile`: Compila la gramática y el lexer.

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
npm run cov
```

  96 passing (332ms)

----------------|---------|----------|---------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                                                                                                    
----------------|---------|----------|---------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------
All files       |    71.6 |    58.73 |   67.39 |   70.05 |                                                                                                                                                                      
 ast-build.js   |     100 |      100 |     100 |     100 |                                                                                                                                                                      
 calc.js        |   67.18 |    56.66 |   53.12 |   64.13 | ...9,155,160-162,195,206,221-225,238,267-270,286-289,308,316-395,428-449,470,478,484-487,495,516-524,539-542,562-571,580-601,610-612,614,616,618-620,622,644-649,652 
 run.js         |   84.61 |       50 |     100 |   91.66 | 40                                                                                                                                                                   
 support-lib.js |   89.65 |    78.57 |     100 |   92.59 | 70,89                                                                                                                                                                
 transpile.js   |   90.32 |       70 |     100 |   93.33 | 41,76                                                                                                                                                                
----------------|---------|----------|---------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------

Se puede ver el reporte de cobertura en formato HTML con el siguiente comando:

```sh
npm run report
```

Esto crea en el directorio `docs/` documentación en formato HTML sobre las clases y la cobertura de los tests. Puedes usar *live-server* para visualizarlo en tu navegador.

Este reporte se despliega automáticamente en Github Pages al hacer push. Puedes acceder a él [aquí](https://ull-esit-pl-2425.github.io/arith2js-himar_edhey-hernandez-alu0101552392/).

## Workflow
### Coverage
Existe una Github Action que ejecuta los tests y genera un reporte de cobertura. Puedes ver el reporte de cobertura en el directorio `docs/` o en Github Pages.

### Github Registry
Otra Github Action que publica automáticamente el paquete en el Github Registry al hacer push.

## Licencia
Este proyecto está licenciado bajo la Licencia ISC.