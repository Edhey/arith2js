%{
const { 
  buildLiteral, 
  buildBinaryExpression, 
  buildUnaryExpression,
  buildCallExpression,
  buildRoot
} = require('./ast-build.js');
%}

%token Number
%left '+' '-'
// %left '*' '/'
// %left '**'
// %left '!'
// %left 'UMINUS'
%left '(' ')'

%%
end: 
    listExpresion EOF { return buildRoot($1, @1); } // Must contain a list of operations (listExpresion) and EOF
;

listExpresion: 
      listExpresion ',' expresion { $$ = $1.concat($3); }   // Operation list 
    | expresion                   { $$ = [$1]; }            // Single operation
;

expresion: 
        expresion '-' expresion   { $$ = $1 - $3; } 
      | Number                    { $$ = Number($1); }
;