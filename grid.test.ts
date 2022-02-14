import { assertEquals } from "https://deno.land/std@0.125.0/testing/asserts.ts";
import { Grid } from "./grid.ts";

Deno.test("iterate elements in a row", () => {
  assertEquals([...new Grid([[1, 2], [3, 4]]).iterRow(1)], [3, 4]);
});

Deno.test("iterate elements in a column", () => {
  assertEquals([...new Grid([[1, 2], [3, 4]]).iterColumn(1)], [2, 4]);
});

Deno.test("get a subgrid", () => {
  assertEquals(
    new Grid([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).getSubgrid({
      rowIndex: 1,
      columnIndex: 1,
    }, { rowIndex: 3, columnIndex: 3 }),
    new Grid([[5, 6], [8, 9]]),
  );
});
