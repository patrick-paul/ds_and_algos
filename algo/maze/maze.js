"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = require("node:fs");
// read data from the txt file
var mazeString = (0, node_fs_1.readFileSync)("./mazeFolder/maze5.txt", {
    encoding: "utf8",
    flag: "r",
}).split("");
// Make a matrix 2D plane
var mazeData = makeMatrix(mazeString);
// solve the maze
console.log(solveMaze(mazeData) ? "Maze Has Atleast 1 Solution!" : "Maze has NO Solution!");
/// Operational Functions
// function to create a matrix 2D plane
function makeMatrix(arry) {
    var supArry = [];
    var subArary = [];
    function pushToSupArryAndClearSubArry() {
        supArry.push(subArary);
        subArary = [];
        return;
    }
    for (var x = 0; x < arry.length; x++) {
        // get the curent characcter
        var char = arry[x];
        if (char === "\r") {
            if (arry[x + 1] === "\n") {
                // windows
                pushToSupArryAndClearSubArry();
                x = x + 1;
            }
            else {
                // macOs
                pushToSupArryAndClearSubArry();
            }
        }
        else if (char === "\n") {
            // linix
            pushToSupArryAndClearSubArry();
        }
        else {
            subArary.push(arry[x]);
        }
    }
    // check the last row and push it
    if (subArary.length != 0)
        supArry.push(subArary);
    return supArry;
}
// collect possible moves
function getPossibleMoves(initialCoordinates) {
    if (initialCoordinates === void 0) { initialCoordinates = [1, 1]; }
    var x = initialCoordinates[0], y = initialCoordinates[1];
    var theFourSides = [
        [x - 1, y], //upCoord
        [x + 1, y], //downCoord
        [x, y - 1], //leftCoord
        [x, y + 1], //rightCoord
    ];
    var possibleMoves = [];
    for (var _i = 0, theFourSides_1 = theFourSides; _i < theFourSides_1.length; _i++) {
        var coordinate = theFourSides_1[_i];
        if (mazeData[coordinate[0]][coordinate[1]] &&
            mazeData[coordinate[0]][coordinate[1]] !== "#") {
            possibleMoves.push(coordinate);
        }
    }
    return possibleMoves;
}
// function to solve the maze (in recusive mode)
function solveMaze(mazeData) {
    var isPathFound = false;
    var currentCoordinates = [1, 1]; // starting point
    // hash table to check if a coordinate has already been visited
    var visitedCoordinated = {
        "1,1": true, // initial values for staring points
    };
    function solveMazeByParts(currentCoordinates) {
        if (isPathFound)
            return true;
        var possibleMoves = getPossibleMoves(currentCoordinates);
        // filter out the coordinates already visited
        possibleMoves = possibleMoves.filter(function (coordinate) { return !visitedCoordinated[coordinate.join(",")]; });
        if (possibleMoves.length !== 0) {
            for (var _i = 0, possibleMoves_1 = possibleMoves; _i < possibleMoves_1.length; _i++) {
                var coordinate = possibleMoves_1[_i];
                if (checkDestiantion(coordinate)) {
                    console.log("Destination found at coordiantes: ".concat(coordinate.join(",")));
                    isPathFound = true;
                    return isPathFound;
                }
                else {
                    visitedCoordinated[coordinate.join(",")] = true;
                    solveMazeByParts(coordinate);
                }
            }
        }
        else
            return isPathFound;
        return isPathFound;
    }
    function checkDestiantion(coordinate) {
        return mazeData[coordinate[0]][coordinate[1]] === "G" ? true : false;
    }
    return solveMazeByParts(currentCoordinates);
}
