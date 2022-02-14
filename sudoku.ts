import { Grid, GridCoordinates } from "./grid.ts";

interface SudokuSolution {
  grid?: Grid<number>;
  iterations: number;
}

export function solve(initial: number[][]): SudokuSolution {
  return solveGrid(new Grid(initial));
}

function solveGrid(grid: Grid<number>): SudokuSolution {
  const nextUnknown = grid.find(({ value }) => !value);
  if (!nextUnknown) {
    return { grid, iterations: 1 };
  }
  const possibilities = getPossibleValues(nextUnknown, grid);
  if (possibilities.size === 0) {
    return { iterations: 1 };
  }
  let iterations = 0;
  for (const possibility of possibilities) {
    const solution = solveGrid(grid.set(nextUnknown, possibility));
    iterations += solution.iterations;
    if (solution.grid) {
      return { grid: solution.grid, iterations };
    }
  }
  return { iterations };
}

function getPossibleValues(
  { rowIndex, columnIndex }: GridCoordinates,
  grid: Grid<number>,
): Set<number> {
  const possibilities = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (const cell of grid.iterRow(rowIndex)) {
    if (cell && possibilities.has(cell)) {
      possibilities.delete(cell);
      if (possibilities.size === 0) {
        return possibilities;
      }
    }
  }
  for (const cell of grid.iterColumn(columnIndex)) {
    if (cell && possibilities.has(cell)) {
      possibilities.delete(cell);
      if (possibilities.size === 0) {
        return possibilities;
      }
    }
  }
  const start = {
    rowIndex: rowIndex - rowIndex % 3,
    columnIndex: columnIndex - columnIndex % 3,
  };
  const end = {
    rowIndex: start.rowIndex + 3,
    columnIndex: start.columnIndex + 3,
  };
  for (const cell of grid.iterSubgrid(start, end)) {
    if (cell && possibilities.has(cell.value)) {
      possibilities.delete(cell.value);
      if (possibilities.size === 0) {
        return possibilities;
      }
    }
  }
  return possibilities;
}
