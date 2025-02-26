%{
const { 
  buildLiteral, 
  buildCallExpression,
  buildCallMemberExpression,
  buildRoot
} = require('./ast-build.js');
%}

%token NUMBER
%left '@'
%left '&'
%left '+' '-'
%left '*' '/'
%nonassoc 'UMINUS'
%right '**'
%left '!'
// %left '(' ')' Esto es gestionado automáticamente por el analizador sintáctico

%%
// console.log(JSON.stringify($1, null, 2));
endExpresion: 
    expresion EOF { return buildRoot($1); } // Must contain a list of operations (listExpresion) and EOF
;

// listExpresion: 
//       listExpresion ',' expresion { $$ = $1.concat($3); }   // Operation list 
//     | expresion                   { $$ = [$1]; }            // Single operation
// ;

expresion: 
      NUMBER                        { $$ = buildCallExpression('Complex', [buildLiteral($1)]) } // Complex Number
      | expresion '+' expresion     { $$ = buildCallMemberExpression($1, 'add', [$3]); } // Addition
      | expresion '-' expresion     { $$ = buildCallMemberExpression($1, 'sub', [$3]); } // Subtraction 
      | expresion '*' expresion     { $$ = buildCallMemberExpression($1, 'mul', [$3]); } // Multiplication
      | expresion '/' expresion     { $$ = buildCallMemberExpression($1, 'div', [$3]); } // Division
      | '-' expresion %prec UMINUS  { $$ = buildCallMemberExpression($2, 'neg', []); } // Unary minus
      | expresion '**' expresion    { $$ = buildCallMemberExpression($1, 'pow', [$3]); } // Power
      | expresion '!'               { $$ = buildCallExpression('gamma', [$1]); } // Factorial
      | '(' expresion ')'           { $$ = $2; }  // Parentheses
;