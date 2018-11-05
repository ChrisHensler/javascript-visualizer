const ast = require("./ast-extract")
const cfg = require("./cfg-extract")
const vis = require("vis")

function write(text, dest)  {
    var fs = require('fs');
    fs.writeFile(dest,text, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

var input_path = process.argv[2]
if(!input_path)  {
    console.log("No Input file detected, using default")
    input_path = './input/input.js'
}

var ast_graph = ast.extractFromFile(input_path);
write(ast_graph.printState(), "html/ast.json")

//will affect global graph state, no needs to be here
var cfg_graph = cfg.extractFromFile(input_path);
write(cfg_graph.printState(), "html/cfg.json")

