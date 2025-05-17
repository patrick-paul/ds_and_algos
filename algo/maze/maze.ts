import { readFileSync } from "node:fs";

// read data from the txt file
const mazeString = readFileSync("./mazeFolder/maze5.txt", {
  encoding: "utf8",
  flag: "r",
}).split("");

// Make a matrix 2D plane
const mazeData = makeMatrix(mazeString);

// solve the maze
console.log(
  solveMaze(mazeData) ? "Maze Has Atleast 1 Solution!" : "Maze has NO Solution!"
);

/// Operational Functions
// function to create a matrix 2D plane
function makeMatrix(arry: Array<string>): Array<Array<string>> {
  const supArry: Array<Array<string>> = [];
  let subArary: Array<string> = [];

  function pushToSupArryAndClearSubArry(): void {
    supArry.push(subArary);
    subArary = [];
    return;
  }

  for (let x = 0; x < arry.length; x++) {
    // get the curent characcter
    const char = arry[x];

    if (char === "\r") {
      if (arry[x + 1] === "\n") {
        // windows
        pushToSupArryAndClearSubArry();
        x = x + 1;
      } else {
        // macOs
        pushToSupArryAndClearSubArry();
      }
    } else if (char === "\n") {
      // linix
      pushToSupArryAndClearSubArry();
    } else {
      subArary.push(arry[x]);
    }
  }

  // check the last row and push it
  if (subArary.length != 0) supArry.push(subArary);

  return supArry;
}

// collect possible moves
function getPossibleMoves(
  initialCoordinates: [number, number] = [1, 1]
): Array<[number, number]> {
  const [x, y] = initialCoordinates;

  const theFourSides: Array<[number, number]> = [
    [x - 1, y], //upCoord
    [x + 1, y], //downCoord
    [x, y - 1], //leftCoord
    [x, y + 1], //rightCoord
  ];

  const possibleMoves: Array<[number, number]> = [];

  for (const coordinate of theFourSides) {
    if (
      mazeData[coordinate[0]][coordinate[1]] &&
      mazeData[coordinate[0]][coordinate[1]] !== "#"
    ) {
      possibleMoves.push(coordinate);
    }
  }

  return possibleMoves;
}

// function to solve the maze (in recusive mode)
function solveMaze(mazeData: Array<Array<string>>): boolean {
  let isPathFound = false;
  let currentCoordinates: [number, number] = [1, 1]; // starting point

  // hash table to check if a coordinate has already been visited
  const visitedCoordinated: Record<string, boolean> = {
    "1,1": true, // initial values for staring points
  };

  function solveMazeByParts(currentCoordinates: [number, number]): boolean {
    if (isPathFound) return true;

    let possibleMoves = getPossibleMoves(currentCoordinates);

    // filter out the coordinates already visited
    possibleMoves = possibleMoves.filter(
      (coordinate) => !visitedCoordinated[coordinate.join(",")]
    );

    if (possibleMoves.length !== 0) {
      for (const coordinate of possibleMoves) {
        if (checkDestiantion(coordinate)) {
          console.log(
            `Destination found at coordiantes: ${coordinate.join(",")}`
          );
          isPathFound = true;
          return isPathFound;
        } else {
          visitedCoordinated[coordinate.join(",")] = true;
          solveMazeByParts(coordinate);
        }
      }
    } else return isPathFound;

    return isPathFound;
  }

  function checkDestiantion(coordinate: Array<number>): boolean {
    return mazeData[coordinate[0]][coordinate[1]] === "G" ? true : false;
  }

  return solveMazeByParts(currentCoordinates);
}
