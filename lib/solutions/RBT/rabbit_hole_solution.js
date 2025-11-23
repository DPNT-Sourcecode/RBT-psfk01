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

      // After each move, check for any 2x2 block fully visited and remove central pillar
      for (let i = 0; i < rows - 1; i++) {
        for (let j = 0; j < columns - 1; j++) {
          if (
            visited[i][j] &&
            visited[i][j + 1] &&
            visited[i + 1][j] &&
            visited[i + 1][j + 1]
          ) {
            // Remove central pillar: bottom-right of (i,j)
            cells[i][j].bottom = false;
            cells[i][j].right = false;
            cells[i][j + 1].bottom = false;
            cells[i + 1][j].right = false;
          }
        }
      }
    }

    // Build ASCII output
    let out = "";

    for (let row = 0; row < rows; row++) {
      // horizontal border for this row
      let col = 0;
      while (col < columns) {
        // Check if this is the TOP-LEFT corner of a fully visited 2x2 block with central pillar removed
        if (
          row > 0 && col < columns - 1 &&
          !cells[row - 1][col].bottom && !cells[row - 1][col].right &&
          !cells[row - 1][col + 1].bottom && !cells[row][col].right
        ) {
          out += "+       ";
          col += 2;
        } else {
          out += "+" + (cells[row][col].top ? "---" : "   ");
          col += 1;
        }
      }
      out += "+\n";

      // content line
      let col2 = 0;
      while (col2 < columns) {
        // Check if this is the TOP-LEFT corner of a fully visited 2x2 block with central pillar removed
        if (
          row > 0 && col2 < columns - 1 &&
          !cells[row - 1][col2].bottom && !cells[row - 1][col2].right &&
          !cells[row - 1][col2 + 1].bottom && !cells[row][col2].right
        ) {
          out += "|       ";
          col2 += 2;
        } else {
          out += (cells[row][col2].left ? "|" : " ") + "   ";
          col2 += 1;
        }
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


