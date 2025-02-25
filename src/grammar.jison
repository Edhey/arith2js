%{
const { 
  buildLiteral, 
  buildBinaryExpression, 
  buildUnaryExpression,
  buildCallExpression,
  buildRoot
} = require('./ast-build.js');
%}

%token NUMBER
%left '+' '-'
%left '*' '/'
%right '**'
%left '!'
%nonassoc 'UMINUS'
// %left '(' ')'

%%
// console.log(JSON.stringify($1, null, 2));
endExpresion: 
    expresion EOF { return buildRoot($1, @1); } // Must contain a list of operations (listExpresion) and EOF
;

// listExpresion: 
//       listExpresion ',' expresion { $$ = $1.concat($3); }   // Operation list 
//     | expresion                   { $$ = [$1]; }            // Single operation
// ;

expresion: 
      NUMBER                        { $$ = buildLiteral($1, @1); } // NUMBER
      | expresion '+' expresion     { $$ = buildBinaryExpression($1, '+', $3, @1, @3); } // Addition
      | expresion '-' expresion     { $$ = buildBinaryExpression($1, '-', $3, @1, @3); } // Subtraction 
      | expresion '*' expresion     { $$ = buildBinaryExpression($1, '*', $3, @1, @3); } // Multiplication
      | expresion '/' expresion     { $$ = buildBinaryExpression($1, '/', $3, @1, @3); } // Division
      | '-' expresion %prec UMINUS  { $$ = buildUnaryExpression('-', $2, @1, @2); } // Unary minus
      | expresion '**' expresion    { $$ = buildCallExpression('power', [$1, $3], @1, @3); } // Power
      | expresion '!'               { $$ = buildCallExpression('factorial', [$1], @1, @2); } // Factorial
      | '(' expresion ')'           { $$ = $2; }  // Parentheses
;