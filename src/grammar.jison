%{
const { 
  buildRoot,
  buildLiteral, 
  buildIdentifier,
  buildCallExpression,
  buildCallMemberExpression,
  buildAssigmentExpression,
  buildSequenceExpression,
  buildFunctionExpression,
  buildIdentifierOrCalls,
  buildParOrCallExpression,
  buildLogicalExpression,
  buildUnaryExpression,
} = require('./ast-build.js');
%}

%token NUMBER
%token ID
%token PID
%token FUN
%left ','
%right '='
%left '=='
%left '&&' '||'
%left '<'
%left '!'
%nonassoc '|'
%left '@'
%left '&'
%left '+' '-'
%left '*' '/'
%nonassoc UMINUS
%right '**'
%left 'ç'
// %left '(' ')' Esto es gestionado automáticamente por el analizador sintáctico

%%
// console.log(JSON.stringify($1, null, 2));
endExpresion: 
    expresion EOF { return { ast: buildRoot($1, @1) }; } // End of expression
;

expresion: 
      NUMBER                        { $$ = buildCallExpression('Complex', [buildLiteral($1, @1)], @1); } // Complex Number
      | ID                          { $$ = buildIdentifier('$' + $1, @1); } // Identifier
      | ID '=' expresion            { $$ = buildAssigmentExpression(buildIdentifier('$' + $1, @1), '=', $3, @1, @3); } // Assigment
      | expresion ',' expresion     { $$ = buildSequenceExpression([$1, $3], @1, @3); } // Sequence
      | expresion '+' expresion     { $$ = buildCallMemberExpression($1, 'add', [$3], false, @1, @3); } // Addition
      | expresion '-' expresion     { $$ = buildCallMemberExpression($1, 'sub', [$3], false, @1, @3); } // Subtraction 
      | expresion '/' expresion     { $$ = buildCallMemberExpression($1, 'div', [$3], false, @1, @3); } // Division
      | expresion '*' expresion     { $$ = buildCallMemberExpression($1, 'mul', [$3], false, @1, @3); } // Multiplication
      | expresion '**' expresion    { $$ = buildCallMemberExpression($1, 'pow', [$3], false, @1, @3); } // Power
      | '|' expresion '|'           { $$ = buildCallMemberExpression($2, 'abs', [], false, @1, @3); } // Absolute value
      | '-' expresion %prec UMINUS  { $$ = buildCallMemberExpression($2, 'neg', [], false, @1, @2); } // Unary minus
      | expresion '==' expresion    { $$ = buildCallMemberExpression($1, 'equals', [$3], false, @1, @3); } // Equality
      | expresion '<' expresion     { $$ = buildCallMemberExpression($1, 'lessThan', [$3], false, @1, @3); } // Less than
      | expresion '&' expresion     { $$ = buildCallExpression('min', [$1, $3], @1, @3); } // Minimum
      | expresion '@' expresion     { $$ = buildCallExpression('max', [$1, $3], @1, @3); } // Maximum 
      | expresion 'ç'               { $$ = buildCallExpression('gamma', [$1], @1, @2); } // Factorial
      | expresion '&&' expresion    { $$ = buildLogicalExpression($1, '&&', $3, @1, @3); } // Logical AND
      | expresion '||' expresion    { $$ = buildLogicalExpression($1, '||', $3, @1, @3); } // Logical OR
      | '!' expresion               { $$ = buildUnaryExpression('!', $2, true, @1, @2); } // Logical NOT
      | PID '(' expresion ')'       { $$ = buildCallExpression($PID, [$3], @1, @4); } // Function call 
      | '(' expresion ')'           { $$ = $2; }  // Parentheses
      | TRUE                        { $$ = buildLiteral(true, @1); } // True
      | FALSE                       { $$ = buildLiteral(false, @1); } // False
      // | ID apply                    { $$ = buildParOrCallMemberExpression(buildIdentifier('$' + $1, @1), $apply, @1, @2); }
      | '(' expresion ')' calls     { $$ = buildParOrCallExpression($expresion, $calls, @1, @calls); }
      | ID calls                    { $$ = buildIdentifierOrCalls('$' + $1, $calls, @ID, @calls); } 
      | FUN '(' idOrEmpty ')' '{' expresion '}'     { $$ = buildFunctionExpression($idOrEmpty, $expresion, @1, @6); } // Function definition
;

// apply:
//       /* empty */               { $$ = []; }
//     | '(' ')' apply             { $$ = [ null ].concat($apply); }
//     | '(' expresion ')' apply   { $$ = [ $expresion ].concat($apply); }
// //     //  | '(' idOrEmpty ')' apply { $$ = [ $2 ].concat($4); }
// ;

calls:
      '(' expresion ')' calls { $$ = [ $expresion ].concat($calls); }
    | '(' ')' calls           { $$ = [ null ].concat($calls); }
    | '(' expresion ')'       { $$ = [ $expresion ]; }
    | '(' ')'                 { $$ = [ null ]; }
;

idOrEmpty: 
    /* empty */     { $$ = []; }
    | ID            { $$ = [ buildIdentifier('$' + $1, @1) ]; }
;