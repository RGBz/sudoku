import { Grid, GridCoordinates } from "./grid.ts";

export class SudokuPuzzle {
  static solve(initial: number[][]): SudokuPuzzle | null {
    return new SudokuPuzzle(new Grid(initial)).solve();
  }

  private constructor(
    public readonly grid: Grid<number>,
    public iterations = 0,
  ) {}

  private solve(iteration = 0): SudokuPuzzle | null {
    const nextUnknown = this.grid.find(({ value }) => !value);
    if (!nextUnknown) {
      return this;
    }
    const possibilities = this.getPossibleValues(nextUnknown);
    if (possibilities.size === 0) {
      return null;
    }
    for (const possibility of possibilities) {
      const result = this.set(nextUnknown, possibility).solve(iteration);
      if (result) {
        return result;
      }
    }
    return null;
  }

  private set(coords: GridCoordinates, value: number): SudokuPuzzle {
    return new SudokuPuzzle(this.grid.set(coords, value), this.iterations + 1);
  }

  private getPossibleValues(
    { rowIndex, columnIndex }: GridCoordinates,
  ): Set<number> {
    const possibilities = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const cell of this.grid.iterRow(rowIndex)) {
      if (cell && possibilities.has(cell)) {
        possibilities.delete(cell);
        if (possibilities.size === 0) {
          return possibilities;
        }
      }
    }
    for (const cell of this.grid.iterColumn(columnIndex)) {
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
    for (const cell of this.grid.iterSubgrid(start, end)) {
      if (cell && possibilities.has(cell.value)) {
        possibilities.delete(cell.value);
        if (possibilities.size === 0) {
          return possibilities;
        }
      }
    }
    return possibilities;
  }

  toString(): string {
    return this.grid.toString((value) => String(value || "?"));
  }
}
