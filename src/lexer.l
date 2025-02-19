%%
\s           /* skip whites */;
[0-9]+([.]\d+)?     return 'Number';
'+'                 return '+';
'-'                 return '-';
','                 return ',';
<<EOF>>             return 'EOF';