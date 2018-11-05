
var NODE_ID_COUNTER = 0

var NODE_LOOKUP={}

var EDGES = []


//todo: make a constructor
exports.clean=function()  {
    NODE_ID_COUNTER = 0

    NODE_LOOKUP={}

    EDGES = []
}

exports.createGraph= function(root=null) {
    return {
        root: exports.createNode(root)
    }
}

exports.createNode = function(data = {}) {
    id= NODE_ID_COUNTER++
    n = {
        id: id,
        label:data
    }
    NODE_LOOKUP[id] = n;

    console.log(`created node ${id}`)
    console.log(data)
    return n;
}

exports.getNodeByID = function(id)  {
    return NODE_LOOKUP[id];
}

exports.addEdge = function(parent_id, child_id)  {
    console.log(`adding edge ${parent_id} -> ${child_id}`)

    EDGES.push({"from": parent_id,"to": child_id, "arrows":"to"})
}

exports.printState = function()  {
    return JSON.stringify(exports.getObj(), null, 2);
    
}

exports.exportState = function()  {
    var fs = require('fs');
    fs.writeFile("graph.out.json",exports.printState(), function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

exports.getObj = function() {
    return {
        nodes: Object.values(NODE_LOOKUP),
        edges: EDGES
    }
}

exports.loadGraph = function(file_location) {
    var fs = require('fs');
    return JSON.parse(fs.readFileSync(file_location, 'utf8'));
}
