const acorn = require("acorn")
const esgraph = require("esgraph")
const graph = require("./graph-gen")


exports.parse = function(text) {
    graph.clean()

    console.log("parsing cfg")
    parsed = acorn.parse(text)

    cfg = esgraph(parsed)[2] //2 is the array of nodes

    //assign ids
    id_count = 0
    cfg.forEach(function(node)  {
        node.id = id_count++
        graph.createNode(JSON.stringify(node.id))
    })

    //draw edges
    cfg.forEach(function(node)  {
        node.next.forEach(function(next) {
            graph.addEdge(node.id, next.id)
        })
    })
    return graph
}

exports.extractFromFile = function(filepath)  {
    var fs = require('fs');
    var graph = exports.parse(fs.readFileSync(filepath, 'utf8'));

    return graph
}