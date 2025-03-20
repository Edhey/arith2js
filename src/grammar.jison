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
  buildDoWhileStatement,
  buildWhileStatement,
  buildForStatement,
} = require('./ast-build.js');
%}

// %token NUMBER
// %token ID
// %token PID
// %token FUN
// %token STRING
// %token TRUE
// %token FALSE
// %token WHILE
// %token FOR
%left ','
%right '='
%left '==' '!='
%left '&&' '||'
%left '<'
%nonassoc '|'
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
endExpression: 
    expression EOF { return { ast: buildRoot($1, @1) }; } // End of expression
;

expression: 
      NUMBER                             { $$ = buildCallExpression(buildIdentifier('Complex', @1), [buildLiteral($1, @1)], @1); } // Complex Number
      | ID                               { $$ = buildIdentifier('$' + $1, @1); } // Identifier
      | ID '=' expression                { $$ = buildAssigmentExpression(buildIdentifier('$' + $1, @1), '=', $3, @1, @3); } // Assigment
      | expression ',' expression        { $$ = buildSequenceExpression([$1, $3], @1, @3); } // Sequence
      | expression '+' expression        { $$ = buildCallMemberExpression($1, 'add', [$3], false, @1, @3); } // Addition
      | expression '-' expression        { $$ = buildCallMemberExpression($1, 'sub', [$3], false, @1, @3); } // Subtraction 
      | expression '/' expression        { $$ = buildCallMemberExpression($1, 'div', [$3], false, @1, @3); } // Division
      | expression '*' expression        { $$ = buildCallMemberExpression($1, 'mul', [$3], false, @1, @3); } // Multiplication
      | expression '**' expression       { $$ = buildCallMemberExpression($1, 'pow', [$3], false, @1, @3); } // Power
      | '|' expression '|'               { $$ = buildCallMemberExpression($2, 'abs', [], false, @1, @3); } // Absolute value
      | '-' expression %prec UMINUS      { $$ = buildCallMemberExpression($2, 'neg', [], false, @1, @2); } // Unary minus
      | expression '==' expression       { $$ = buildCallMemberExpression($1, 'equals', [$3], false, @1, @3); } // Equality
      | expression '!=' expression       { $$ = buildCallMemberExpression($1, 'notEquals', [$3], false, @1, @3); } // Not equality
      | expression '<' expression        { $$ = buildCallMemberExpression($1, 'lessThan', [$3], false, @1, @3); } // Less than
      | expression '&' expression        { $$ = buildCallExpression(buildIdentifier('min', @2), [$1, $3], @1, @3); } // Minimum
      | expression '@' expression        { $$ = buildCallExpression(buildIdentifier('max', @2), [$1, $3], @1, @3); } // Maximum 
      | expression '&&' expression       { $$ = buildLogicalExpression($1, '&&', $3, @1, @3); } // Logical AND
      | expression '||' expression       { $$ = buildLogicalExpression($1, '||', $3, @1, @3); } // Logical OR
      | '!' expression                   { $$ = buildCallMemberExpression($2, 'not', [], false, @1, @2); } // Logical NOT
      | expression '!'                   { $$ = buildCallExpression(buildIdentifier('gamma', @2), [$1], @1, @2); } // Factorial
      | PID '(' printList ')'            { $$ = buildCallExpression(buildIdentifier($PID, @1), $3, @1, @4); } // Function call 
      | '(' expression ')'               { $$ = $2; }  // Parentheses
      | TRUE                             { $$ = buildLiteral(true, @1); } // True
      | FALSE                            { $$ = buildLiteral(false, @1); } // False
      // | ID apply                      { $$ = buildParOrCallMemberExpression(buildIdentifier('$' + $1, @1), $apply, @1, @2); }
      | '(' expression ')' calls         { $$ = buildIdentifierOrCalls($expression, $calls, @1, @calls); }
      | ID calls                         { $$ = buildIdentifierOrCalls('$' + $1, $calls, @ID, @calls); } 
      | FUN '(' idOrEmpty ')' '{' expression '}'              { $$ = buildFunctionExpression($idOrEmpty, $expression, @1, @6); } // Function definition
      | STRING                                                { $$ = buildLiteral($1, @1); } // String
      | WHILE expression '{'expression'}'                     { $$ = buildWhileStatement($expression1, $expression2, @1, @5);}
      | DO '{' expression '}' WHILE '(' expression ')'        { $$ = buildDoWhileStatement($expression1, $expression2, @1, @3, @7); }
      | FOR '(' expression ';' expression ';' expression ')' '{' expression '}' { $$ = buildForStatement($expression1, $expression2, $expression3, $expression4, @1, @11); };

calls:
      '(' expression ')' calls { $$ = [ $expression ].concat($calls); }
    | '(' ')' calls           { $$ = [ null ].concat($calls); }
    | '(' expression ')'       { $$ = [ $expression ]; }
    | '(' ')'                 { $$ = [ null ]; }
;

idOrEmpty: 
    /* empty */     { $$ = []; }
    | ID            { $$ = [ buildIdentifier('$' + $1, @1) ]; }
;

printList:
    /* empty */     { $$ = []; }
    | expression ';' printList { $$ = [ $expression ].concat($printList); }
    | expression     { $$ = [ $expression ]; }
;