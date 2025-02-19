%%
\s                                    /* skip whites */;
#.*                                   /* skip comments */;
[/][*](.|\n)*?[*][/]                  /* skip multiple line comments | The * is greedy so we need to make it lazy with ? */;
[0-9]+([.]\d+)?([eE][-+]?\d+)?        return 'Number';
'**'                                  return '**'; // It must be before '*' because it is more specific, otherwise it will be recognized as '*'
[-+*/!()]                             return yytext;
','                                   return ',';
<<EOF>>                               return 'EOF';