export default class RabbitHoleSolution {
  rabbit_hole(rows, columns, digging_moves, rendering_options) {
    if (rows <= 0 || columns <= 0) return "";

    const moves = (digging_moves || "").toUpperCase();

    // Initialize cells with all walls present
    const cells = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({ top: true, bottom: true, left: true, right: true }))
    );

    const visited = Array.from({ length: rows }, () => Array(columns).fill(false));

    // Current position: null means just above top-left outside the grid
    let cur = null;

    const inBounds = (r, c) => r >= 0 && r < rows && c >= 0 && c < columns;

    for (const m of moves) {
      if (cur === null) {
        // Rabbit is outside above (0,0). Only a Down move can enter (0,0).
        if (m === "D") {
          // Enter cell (0,0) from above: remove top wall
          cells[0][0].top = false;
          visited[0][0] = true;
          cur = { r: 0, c: 0 };
        }
        continue;
      }

      const { r, c } = cur;
      let nr = r, nc = c;
      if (m === "U") nr = r - 1;
      else if (m === "D") nr = r + 1;
      else if (m === "L") nc = c - 1;
      else if (m === "R") nc = c + 1;
      else continue;

      if (!inBounds(nr, nc)) continue;

      // Remove walls between (r,c) and (nr,nc)
      if (nr === r - 1 && nc === c) {
        cells[r][c].top = false;
        cells[nr][nc].bottom = false;
      } else if (nr === r + 1 && nc === c) {
        cells[r][c].bottom = false;
        cells[nr][nc].top = false;
      } else if (nr === r && nc === c - 1) {
        cells[r][c].left = false;
        cells[nr][nc].right = false;
      } else if (nr === r && nc === c + 1) {
        cells[r][c].right = false;
        cells[nr][nc].left = false;
      }

      visited[nr][nc] = true;
      cur = { r: nr, c: nc };
    }

    // After all moves, check for 2x2 blocks where all 4 internal walls are removed
    for (let i = 0; i < rows - 1; i++) {
      for (let j = 0; j < columns - 1; j++) {
        // Check if all 4 internal walls of the 2x2 block are removed (check both sides of each wall)
        if (
          !cells[i][j].right && !cells[i][j + 1].left &&
          !cells[i][j].bottom && !cells[i + 1][j].top &&
          !cells[i][j + 1].bottom && !cells[i + 1][j + 1].top &&
          !cells[i + 1][j].right && !cells[i + 1][j + 1].left
        ) {
          // All 4 internal walls removed - this is a room, remove central pillar
          cells[i][j].bottom = false;
          cells[i][j].right = false;
          cells[i][j + 1].bottom = false;
          cells[i + 1][j].right = false;
        }
      }
    }

    // Build ASCII output
    let out = "";

    for (let row = 0; row < rows; row++) {
      // horizontal border for this row
      for (let col = 0; col < columns; col++) {
        // Check if pillar at this position should be rendered as space
        // Pillar is at the intersection of 4 cells: (row-1, col-1), (row-1, col), (row, col-1), (row, col)
        let pillarIsSpace = false;
        if (row > 0 && col > 0) {
          // All 4 walls meeting at this pillar must be removed
          pillarIsSpace = !cells[row - 1][col - 1].bottom && !cells[row - 1][col - 1].right &&
                          !cells[row - 1][col].bottom && !cells[row][col - 1].right;
        }
        out += (pillarIsSpace ? " " : "+") + (cells[row][col].top ? "---" : "   ");
      }
      out += "+\n";

      // content line
      for (let col = 0; col < columns; col++) {
        out += (cells[row][col].left ? "|" : " ") + "   ";
      }
      out += (cells[row][columns - 1].right ? "|" : " ") + "\n";
    }

    // final horizontal border (bottom of last row)
    for (let col = 0; col < columns; col++) {
      out += "+" + (cells[rows - 1][col].bottom ? "---" : "   ");
    }
    out += "+\n";

    return out;
  }
}


