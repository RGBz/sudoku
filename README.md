# Sudoku Solver

Got bored and made a recursive Sudoku puzzle solver in deno.

```typescript
import { solve } from "./sudoku.ts";

// Enter the puzzle row by row with 0s for unknowns
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

// Sokution grid may be undefined if the puzzle is unsolvable
console.log(solution.grid?.toString()));
```

## Algorithm

The solver operates recursively by:

1. Finding the top-left-most unknown (if none are found then the puzzle is
   complete)
2. Finding the valid numbers that could fill the spot (if none are found then
   the puzzle is impossible to solve based on what's filled in already so give
   up)
3. Filling in the puzzle with each valid number and recursing
