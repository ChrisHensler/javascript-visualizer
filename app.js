const ast = require("./ast-extract")
const vis = require("vis")
var ast_graph = ast.extractFromFile('./input/input.js');

var fs = require('fs');
fs.writeFile("html/input.json",ast_graph.printState(), function(err) {
    if(err) {
        return console.log(err);
    }
});