%{
const { 
  buildLiteral, 
  buildCallExpression,
  buildCallMemberExpression,
  buildIdentifier,
  buildAssigmentExpression,
  buildSequenceExpression,
  buildRoot
} = require('./ast-build.js');
%}

%token NUMBER
%token ID
%token PID
%nonassoc '|'
%left ','
%right '='
%left '@'
%left '&'
%left '+' '-'
%left '*' '/'
%nonassoc UMINUS
%right '**'
%left '!'
// %left '(' ')' Esto es gestionado automáticamente por el analizador sintáctico

%%
// console.log(JSON.stringify($1, null, 2));
endExpresion: 
    expresion EOF { return { ast: buildRoot($1, @1) }; } // End of expression
;

expresion: 
      NUMBER                        { $$ = buildCallExpression('Complex', [buildLiteral($1, @1)], @1); } // Complex Number
      | ID                          { $$ = buildIdentifier('$' + $1, @1); } // Identifier
      | expresion '+' expresion     { $$ = buildCallMemberExpression($1, 'add', [$3], false, @1, @3); } // Addition
      | expresion '-' expresion     { $$ = buildCallMemberExpression($1, 'sub', [$3], false, @1, @3); } // Subtraction 
      | expresion '*' expresion     { $$ = buildCallMemberExpression($1, 'mul', [$3], false, @1, @3); } // Multiplication
      | expresion '/' expresion     { $$ = buildCallMemberExpression($1, 'div', [$3], false, @1, @3); } // Division
      | '-' expresion %prec UMINUS  { $$ = buildCallMemberExpression($2, 'neg', [], false, @1, @2); } // Unary minus
      | expresion '**' expresion    { $$ = buildCallMemberExpression($1, 'pow', [$3], false, @1, @3); } // Power
      | '|' expresion '|'           { $$ = buildCallMemberExpression($2, 'abs', [], false, @1, @3); } // Absolute value
      | expresion '!'               { $$ = buildCallExpression('gamma', [$1], @1, @2); } // Factorial
      | expresion '&' expresion     { $$ = buildCallExpression('min', [$1, $3], @1, @3); } // Minimum
      | expresion '@' expresion     { $$ = buildCallExpression('max', [$1, $3], @1, @3); } // Maximum 
      | ID '=' expresion            { $$ = buildAssigmentExpression(buildIdentifier('$' + $1, @1), '=', $3, @1, @3); } // Assigment
      | expresion ',' expresion     { $$ = buildSequenceExpression([$1, $3], @1, @3); } // Sequence
      | '(' expresion ')'           { $$ = $2; }  // Parentheses
      | PID '(' expresion ')'       { $$ = buildCallExpression($PID, [$3], @1, @4); } // Function call 
;