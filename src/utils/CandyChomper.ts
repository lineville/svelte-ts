import { Point, colorFill, colors } from './ColorFill';

export const chomp = (grid: Array<Array<string>>, location: Point): Array<Array<string>> => {
  return canChomp(grid, location) ? chompCandy(grid, location) : grid;
};

export const chompCandy = (grid: Array<Array<string>>, location: Point): Array<Array<string>> => {
  let copy = copyGrid(grid);

  let verticalsBottomUp = adjacentMatches(copy, location)
    .concat([{ x: location.x, y: location.y }])
    .filter(p => p.y === location.y)
    .sort((a, b) => a.x - b.x);

  let horizontalsExcludingCurrent = adjacentMatches(copy, location).filter(
    p => p.x === location.x && p.y !== location.y,
  );

  [...verticalsBottomUp, ...horizontalsExcludingCurrent].forEach(candy => {
    copy = deleteCandy(copy, { x: candy.x, y: candy.y });
  });

  return copy;
};

export const deleteCandy = (grid: Array<Array<string>>, location: Point): Array<Array<string>> => {
  let copy = copyGrid(grid);
  let currentRowIdx = location.x;
  while (currentRowIdx > 0) {
    copy[currentRowIdx][location.y] = grid[currentRowIdx - 1][location.y];
    currentRowIdx--;
  }
  copy[0][location.y] = ' ';
  return copy;
};

export const canChomp = (grid: Array<Array<string>>, location: Point): boolean => {
  return (
    searchUp(grid, location).length + searchDown(grid, location).length >= 2 ||
    searchLeft(grid, location).length + searchRight(grid, location).length >= 2
  );
};

export const swapCandies = (grid: Array<Array<string>>, location: Point): Array<Array<string>> => {
  let gridCopy = grid.map(row => {
    return row.slice();
  });

  // * Naively check potential future states in this order, in order to avoid swapping in
  // * an ambiguous case user would need designate the direction not just cell.

  let futureGrids = [
    swap(gridCopy, location, { x: location.x, y: location.y - 1 < 0 ? 0 : location.y - 1 }),
    swap(gridCopy, location, { x: location.x, y: location.y + 1 == grid.length ? location.y : location.y + 1 }),
    swap(gridCopy, location, { x: location.x - 1 < 0 ? 0 : location.x - 1, y: location.y }),
    swap(gridCopy, location, { x: location.x + 1 == grid.length ? location.x : location.x + 1, y: location.y }),
  ];

  let bestOptions = futureGrids.filter(grid => canChomp(grid, location));
  return bestOptions.length > 0 ? bestOptions[0] : grid;
};

export const swap = (grid: Array<Array<string>>, location: Point, other: Point): Array<Array<string>> => {
  let gridCopy = grid.map(row => {
    return row.slice();
  });

  let temp = gridCopy[location.x][location.y];
  gridCopy[location.x][location.y] = gridCopy[other.x][other.y];
  gridCopy[other.x][other.y] = temp;
  return gridCopy;
};

export const adjacentMatches = (grid: Array<Array<string>>, location: Point): Array<Point> => {
  const allMatches = [
    ...searchUp(grid, location),
    ...searchDown(grid, location),
    ...searchLeft(grid, location),
    ...searchRight(grid, location),
  ];
  return allMatches;
};

export const searchUp = (grid: Array<Array<string>>, location: Point): Array<Point> => {
  let result: Array<Point> = [];
  let currentRow = location.x - 1;

  while (currentRow >= 0 && grid[currentRow][location.y] === grid[location.x][location.y]) {
    result.push({ x: currentRow, y: location.y });
    currentRow--;
  }
  return result;
};

export const searchDown = (grid: Array<Array<string>>, location: Point): Array<Point> => {
  let result: Array<Point> = [];
  let currentRow = location.x + 1;

  while (currentRow < grid.length && grid[currentRow][location.y] === grid[location.x][location.y]) {
    result.push({ x: currentRow, y: location.y });
    currentRow++;
  }
  return result;
};

export const searchLeft = (grid: Array<Array<string>>, location: Point): Array<Point> => {
  let result: Array<Point> = [];
  let currentColumn = location.y - 1;

  while (currentColumn >= 0 && grid[location.x][currentColumn] === grid[location.x][location.y]) {
    result.push({ x: location.x, y: currentColumn });
    currentColumn--;
  }
  return result;
};

export const searchRight = (grid: Array<Array<string>>, location: Point): Array<Point> => {
  let result: Array<Point> = [];
  let currentColumn = location.y + 1;

  while (currentColumn < grid.length && grid[location.x][currentColumn] === grid[location.x][location.y]) {
    result.push({ x: location.x, y: currentColumn });
    currentColumn++;
  }
  return result;
};

const copyGrid = (grid: Array<Array<string>>): Array<Array<string>> => {
  return grid.map(row => {
    return row.slice();
  });
};
