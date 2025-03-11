%{
const reservedwords = ["fun", "true", "false", "i"]
const predefinedIds = ["print", "write" ] // predefined identifiers

const idOrReserved = text => {
    if (reservedwords.find(w => w == text)) return text.toUpperCase();
    if (predefinedIds.find(w => w == text)) return 'PID';
    return 'ID';
  }
%}
number \d+(\.\d+)?([eE][-+]?\d+)?"i"?|"i"

%%
\s+                                   /* skip whites */;
'#'.*                                 /* skip comments */;
[/][*](.|\n)*?[*][/]                  /* skip multiple line comments | The * is greedy so we need to make it lazy with ? */;
{number}                              return 'NUMBER';
[_$a-zA-Z][$\w]*                      return idOrReserved(yytext);
'**'                                  return '**'; // It must be before '*' because it is more specific, otherwise it will be recognized as '*'
[-+*/!()&@|=,{}]                      return yytext;
<<EOF>>                               return 'EOF';