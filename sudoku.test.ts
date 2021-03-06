import { assertEquals } from "https://deno.land/std@0.125.0/testing/asserts.ts";
import { solve } from "./sudoku.ts";

Deno.test("solves easy puzzles", () => {
  const solution = solve([
    [8, 5, 1, 9, 4, 0, 0, 0, 6],
    [7, 4, 0, 0, 1, 8, 0, 0, 5],
    [0, 0, 6, 0, 0, 0, 8, 1, 4],
    [2, 1, 0, 3, 8, 0, 6, 0, 0],
    [0, 8, 0, 4, 5, 1, 2, 0, 0],
    [0, 3, 0, 0, 0, 0, 4, 0, 0],
    [0, 0, 9, 0, 0, 6, 0, 7, 8],
    [0, 0, 3, 0, 0, 7, 0, 4, 0],
    [1, 0, 8, 0, 2, 0, 0, 0, 3],
  ]);
  assertEquals(
    solution.grid?.toString(),
    `8 5 1 9 4 3 7 2 6
7 4 2 6 1 8 3 9 5
3 9 6 2 7 5 8 1 4
2 1 4 3 8 9 6 5 7
6 8 7 4 5 1 2 3 9
9 3 5 7 6 2 4 8 1
4 2 9 1 3 6 5 7 8
5 6 3 8 9 7 1 4 2
1 7 8 5 2 4 9 6 3`,
  );
  assertEquals(solution.iterations, 4);
});

Deno.test("solves hard puzzles", () => {
  const solution = solve([
    [3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 6, 0, 0, 0, 0, 3, 8, 0],
    [8, 0, 0, 0, 7, 0, 0, 2, 0],
    [0, 0, 0, 0, 1, 0, 6, 0, 0],
    [0, 1, 4, 0, 0, 0, 0, 0, 9],
    [0, 0, 0, 0, 0, 2, 0, 0, 7],
    [0, 0, 5, 6, 0, 0, 0, 0, 0],
    [0, 0, 0, 8, 2, 3, 0, 0, 0],
    [9, 0, 6, 7, 0, 0, 0, 0, 0],
  ]);
  assertEquals(
    solution.grid?.toString(),
    `3 5 2 1 8 4 7 9 6
1 6 7 2 5 9 3 8 4
8 4 9 3 7 6 5 2 1
5 2 3 9 1 7 6 4 8
7 1 4 5 6 8 2 3 9
6 9 8 4 3 2 1 5 7
2 8 5 6 9 1 4 7 3
4 7 1 8 2 3 9 6 5
9 3 6 7 4 5 8 1 2`,
  );
  assertEquals(solution.iterations, 102040);
});
