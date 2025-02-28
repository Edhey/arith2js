%{
const { 
  buildLiteral, 
  buildCallExpression,
  buildCallMemberExpression,
  buildRoot
} = require('./ast-build.js');
%}

%token NUMBER
%token ID
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
    expresion EOF { return buildRoot($1); } // Must contain a list of operations (listExpresion) and EOF
;

expresion: 
      NUMBER                        { $$ = buildCallExpression('Complex', [buildLiteral($1)]) } // Complex Number
      | ID                            { $$ = buildIdentifier($1) } // Identifier
      | expresion '+' expresion     { $$ = buildCallMemberExpression($1, 'add', [$3]); } // Addition
      | expresion '-' expresion     { $$ = buildCallMemberExpression($1, 'sub', [$3]); } // Subtraction 
      | expresion '*' expresion     { $$ = buildCallMemberExpression($1, 'mul', [$3]); } // Multiplication
      | expresion '/' expresion     { $$ = buildCallMemberExpression($1, 'div', [$3]); } // Division
      | '-' expresion %prec UMINUS  { $$ = buildCallMemberExpression($2, 'neg', []); } // Unary minus
      | expresion '**' expresion    { $$ = buildCallMemberExpression($1, 'pow', [$3]); } // Power
      | '|' expresion '|'           { $$ = buildCallMemberExpression($2, 'abs', []); } // Absolute value
      | expresion '!'               { $$ = buildCallExpression('gamma', [$1]); } // Factorial
      | expresion '&' expresion     { $$ = buildCallExpression('min', [$1, $3]); } // Minimum
      | expresion '@' expresion     { $$ = buildCallExpression('max', [$1, $3]); } // Maximum 
      | expresion '=' expresion     { $$ = buildAssigmentExpression($1, '=', $3) }
      | expresion ',' expresion     { $$ = buildSequenceExpression([$1, $3]) }
      | '(' expresion ')'           { $$ = $2; }  // Parentheses
;