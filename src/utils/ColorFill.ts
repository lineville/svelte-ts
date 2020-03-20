// * Daily Coding Problem March 13th 2020

// ********************************

// * [Medium] -- unknown

// * Given a 2-D matrix representing an image, a location of a pixel in the screen and a color C,
// * replace the color of the given pixel and all adjacent same colored pixels with C.

// ! Ex; given the following matrix, and location pixel of (2, 2), and 'G' for green

// * B B W
// * W W W
// * W W W
// * B B B

export type Point = { x: number; y: number };

// * Time: O(M * N) where M and N are the dimensions of the grid provided

// * Step 1: Create a deep copy of the grid,
// * Step 2: Save the old color at the location given.
// * Step 3: Traverse the entire grid and replace and occurrence of oldColor with color
// * return the updated copy of the grid
export const colorFill = (grid: Array<Array<string>>, location: Point, color: string): Array<Array<string>> => {
  let gridCopy = grid.map(row => {
    return row.slice();
  });

  let oldColor = grid[location.x][location.y];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === oldColor) {
        gridCopy[i][j] = color;
      }
    }
  }
  return gridCopy;
};

export const randomGrid = (rows: number, columns: number): Array<Array<string>> => {
  let result = new Array<Array<string>>();

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    result.push(row);
  }

  return result;
};

export const colors = ['🦮', '🦦', '🧇', '🪐', '🪓', '☘️', '🔴', '💙', '💛', '💜', '⬛️', '🔶', '📦'];

export const completedGrid = (grid: string[][]): boolean => {
  const firstColor = grid[0][0];
  return grid.map(row => row.every(color => color === firstColor)).every(valid => valid);
};
