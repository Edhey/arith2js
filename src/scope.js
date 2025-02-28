const Support = require("./support-lib.js");
// Build regexp matching the names of the support functions /factorial| power|min|max| ... /
let functionNames = Object.keys(Support).map(n => n.replace(/[$ *. ^]/, '[$&]')) // Escape regexp special characters
const patternIsSupport = new RegExp(functionNames. join(' |'));

// Detect what support functions are used: dependency analysis
function dependencies(dAst) {
const functionNames = Object.keys(require("./support-lib.js"));

dAst.dependencies = new Set( []);
visit(dAst.ast, {
visitCallExpression(path) {
const node = path.node;
let name = node. callee. name;
if (functionNames. includes(name) ) {
dAst.dependencies.add(name);

this. traverse(path);

:

return dAst;

// Builde the set of variables the set of variables that are used in the code