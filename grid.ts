export interface GridCoordinates {
  rowIndex: number;
  columnIndex: number;
}

export interface GridCell<T> extends GridCoordinates {
  value: T;
}

export class Grid<T> {
  constructor(public readonly rows: T[][]) {}

  *iterRow(rowIndex: number): Iterable<T> {
    const row = this.rows[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      yield row[columnIndex];
    }
  }

  *iterColumn(columnIndex: number): Iterable<T> {
    for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
      const row = this.rows[rowIndex];
      yield row[columnIndex];
    }
  }

  *iterCells(): Iterable<GridCell<T>> {
    for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
      const row = this.rows[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        yield { rowIndex, columnIndex, value: row[columnIndex] };
      }
    }
  }

  *iterSubgrid(
    start: GridCoordinates,
    end: GridCoordinates,
  ): Iterable<GridCell<T>> {
    for (let rowIndex = start.rowIndex; rowIndex < end.rowIndex; rowIndex++) {
      const row = this.rows[rowIndex];
      for (
        let columnIndex = start.columnIndex;
        columnIndex < end.columnIndex;
        columnIndex++
      ) {
        yield { rowIndex, columnIndex, value: row[columnIndex] };
      }
    }
  }

  getSubgrid(start: GridCoordinates, end: GridCoordinates): Grid<T> {
    return new Grid(
      this.rows.slice(start.rowIndex, end.rowIndex).reduce(
        (
          elements: T[][],
          row,
        ) => [...elements, row.slice(start.columnIndex, end.columnIndex)],
        [],
      ),
    );
  }

  set({ rowIndex, columnIndex }: GridCoordinates, value: T): Grid<T> {
    return new Grid(
      this.rows.map((row, ri) =>
        row.map((cell, ci) =>
          ri === rowIndex && ci === columnIndex ? value : cell
        )
      ),
    );
  }

  setMut({ rowIndex, columnIndex }: GridCoordinates, value: T): this {
    this.rows[rowIndex][columnIndex] = value;
    return this;
  }

  find(fn: (cell: GridCell<T>) => boolean): GridCell<T> | null {
    for (const cell of this.iterCells()) {
      if (fn(cell)) {
        return cell;
      }
    }
    return null;
  }

  filter(fn: (cell: GridCell<T>) => boolean): GridCell<T>[] | null {
    const cells = [];
    for (const cell of this.iterCells()) {
      if (fn(cell)) {
        cells.push(cell);
      }
    }
    return cells;
  }

  some(fn: (cell: GridCell<T>) => boolean): boolean {
    for (const cell of this.iterCells()) {
      if (fn(cell)) {
        return true;
      }
    }
    return false;
  }

  every(fn: (cell: GridCell<T>) => boolean): boolean {
    for (const cell of this.iterCells()) {
      if (!fn(cell)) {
        return false;
      }
    }
    return true;
  }

  toString(format: (value: T) => string = String): string {
    let padding = 0;
    const strRows = [];
    for (const row of this.rows) {
      const strRow = [];
      for (const cell of row) {
        const strCell = format(cell);
        padding = Math.max(strCell.length, padding);
        strRow.push(strCell);
      }
      strRows.push(strRow);
    }
    return strRows.map((strRow) =>
      strRow.map((strCell) => strCell.padStart(padding)).join(" ")
    ).join("\n");
  }
}
