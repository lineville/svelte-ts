import { Point, colorFill } from './ColorFill';

export const chomp = (grid: Array<Array<string>>, location: Point): Array<Array<string>> => {
  return canChomp(grid, location) ? chompCandy(grid, location) : grid;
};

export const chompCandy = (grid: Array<Array<string>>, location: Point): Array<Array<string>> => {
  let gridCopy = grid.map(row => {
    return row.slice();
  });
  const candiesToChomp = adjacentMatches(gridCopy, location);
  candiesToChomp.forEach(candy => {
    gridCopy[candy.x][candy.y] = '💣';
  });

  gridCopy[location.x][location.y] = '💣';

  return gridCopy;
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
  let locationToSwap = { x: location.x, y: location.y };
  if (location.y > 0) {
    locationToSwap.y - 1;
  }

  let futureGrid = swap(gridCopy, location, locationToSwap);
  return gridCopy;
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
  return [
    ...searchUp(grid, location),
    ...searchDown(grid, location),
    ...searchLeft(grid, location),
    ...searchRight(grid, location),
  ];
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
