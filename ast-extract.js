const acorn = require("acorn")
const walk = require("acorn-walk")

const graph = require("./graph-gen")


function addChild(acorn_child, parent) {
    var child = parseNode(acorn_child)
    graph.addEdge(parent.id, child.id)
}

function parseNode(acorn_node) {
    console.log("\nparsing...")
    var new_node = graph.createNode(acorn_node.type)

    possible_next = [
        "arguments","argument","alternate",
        "body",
        "callee",
        "declaration","declarations",
        "expression","element","exported","expressions","elements",
        "init","imported","id",
        "key",
        "left","local",
        "meta",
        "object",
        "param","property","properties",
        "quasi","quasis",
        "right",
        "superClass","source","specifiers",
        "tag","test"
    ];
    possible_next.forEach(function(attr)  {
        //try as plural
        try {
            acorn_node[attr].forEach(function(c) {
                console.log(`${new_node.id} has a ${attr}`)
                addChild(c, new_node)
            })
        }
        //okay, probably a single thing
        catch {
            if(acorn_node[attr]) {
                console.log(`${new_node.id} has a ${attr}`)
                addChild(acorn_node[attr], new_node)
            }
        }

    })

    possible_next_plural = [
        
        
    ]
    possible_next_plural.forEach(function(attr)  {
        if(acorn_node[attr]) {
            console.log("node")
            console.log(acorn_node)
            console.log("body")
            console.log(acorn_node[attr])
            
        }
    })

    return new_node

}

exports.parse = function(text) {

    ast_array = [];

    parsed = acorn.parse(text)
    console.log(JSON.stringify(parsed,null,2))
    ast = parseNode(parsed);
}

exports.extractFromFile = function(filepath)  {
    var fs = require('fs');
    exports.parse(fs.readFileSync(filepath, 'utf8'));
    return graph
}