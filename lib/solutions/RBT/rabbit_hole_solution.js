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
        // ignore any other moves
        continue;
      }

      const { r, c } = cur;
      let nr = r, nc = c;
      if (m === "U") nr = r - 1;
      else if (m === "D") nr = r + 1;
      else if (m === "L") nc = c - 1;
      else if (m === "R") nc = c + 1;
      else continue; // ignore unknown chars

      if (!inBounds(nr, nc)) continue; // cannot move outside
      if (visited[nr][nc]) continue; // cannot revisit dug cell

      // Remove walls between (r,c) and (nr,nc)
      if (nr === r - 1 && nc === c) {
        // moved Up
        cells[r][c].top = false;
        cells[nr][nc].bottom = false;
      } else if (nr === r + 1 && nc === c) {
        // moved Down
        cells[r][c].bottom = false;
        cells[nr][nc].top = false;
      } else if (nr === r && nc === c - 1) {
        // moved Left
        cells[r][c].left = false;
        cells[nr][nc].right = false;
      } else if (nr === r && nc === c + 1) {
        // moved Right
        cells[r][c].right = false;
        cells[nr][nc].left = false;
      }

      visited[nr][nc] = true;
      cur = { r: nr, c: nc };
    }

    // Build ASCII output
    let out = "";

    for (let row = 0; row < rows; row++) {
      // horizontal border for this row
      for (let col = 0; col < columns; col++) {
        out += "+" + (cells[row][col].top ? "---" : "   ");
      }
      out += "+\n";

      // content line
      for (let col = 0; col < columns; col++) {
        out += (cells[row][col].left ? "|" : " ") + "   ";
      }
      // rightmost border for the row
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
