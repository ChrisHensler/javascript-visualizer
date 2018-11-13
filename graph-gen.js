
var NODE_ID_COUNTER = 0

var NODE_LOOKUP={}

var EDGES = []
var COLORS = {
    "ROOT":"#4d94ff",
    "STATEMENT":"#ff9900",
    "EXPRESSION":"#ff66cc",
    "IDENTIFIER":"#5cd65c",
    "LITERAL":"#ff4343",
    "OTHER":"#D2E5FF"
}

var OPTIONS = {
    LABEL_EDGES: false,
}

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
        label:data,
        color:COLORS.ROOT,
        num_edges:0
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

    NODE_LOOKUP[child_id].color=getColor(NODE_LOOKUP[child_id].label);
    NODE_LOOKUP[parent_id].num_edges+=1;

    edge = {"from": parent_id,"to": child_id, "arrows":"to"}
    if(OPTIONS.LABEL_EDGES) {
        edge.label = "" + NODE_LOOKUP[parent_id].num_edges
    }

    EDGES.push(edge)
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
        edges: EDGES,
    }
}

exports.loadGraph = function(file_location) {
    var fs = require('fs');
    return JSON.parse(fs.readFileSync(file_location, 'utf8'));
}

//note: AST only right now. Also should move this to a different file at some point
function getColor(type) {
    patternToColor = {
        "Expression": COLORS.EXPRESSION,
        "Statement": COLORS.STATEMENT,
        "Identifier": COLORS.IDENTIFIER,
        "Literal": COLORS.LITERAL,
    }
    for (var pattern in patternToColor)  {
        if(type.toString().indexOf(pattern) != -1) {
            return patternToColor[pattern];
        }
    }
    return COLORS.OTHER
}