%%
\s           /* skip whites */;
[0-9]+([.]\d+)?     return 'Number';
[-+*/()]              return yytext;
','                 return ',';
<<EOF>>             return 'EOF';