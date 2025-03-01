number \d+(\.\d+)?([eE][-+]?\d+)?"i"?|"i"
%%
\s+                                   /* skip whites */;
'#'.*                                 /* skip comments */;
[/][*](.|\n)*?[*][/]                  /* skip multiple line comments | The * is greedy so we need to make it lazy with ? */;
{number}                              return 'NUMBER';
'**'                                  return '**'; // It must be before '*' because it is more specific, otherwise it will be recognized as '*'
[-+*/!()&@|=]                         return yytext;
','                                   return ',';
[_$a-zA-Z][$\w]*                      return 'ID';
<<EOF>>                               return 'EOF';