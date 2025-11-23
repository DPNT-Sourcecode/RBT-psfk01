export default class RabbitHoleSolution {
  rabbit_hole(rows, columns, digging_moves, rendering_options) {
    if (rows <= 0 || columns <= 0) return "";

    const moves = (digging_moves || "").toUpperCase();

    // Parse scaling options (default to 3 horizontal, 1 vertical)
    const hScale = parseInt((rendering_options && rendering_options.HORIZONTAL_SCALE) || "3", 10);
    const vScale = parseInt((rendering_options && rendering_options.VERTICAL_SCALE) || "1", 10);

    // Parse rendering theme (default to ASCII)
    const theme = (rendering_options && rendering_options.RENDERING_THEME) || "ASCII";
    const isUnicode = theme === "UNICODE";

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

    // Build output with scaling
    let out = "";

    const spaceChar = " ";

    // Choose character set based on theme
    const hChar = isUnicode ? "━" : "-";
    const vChar = isUnicode ? "┃" : "|";

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

        // Determine connector character
        let connector;
        if (isUnicode) {
          connector = this._getUnicodeConnector(cells, row, col, rows, columns);
        } else if (pillarIsSpace) {
          connector = spaceChar;
        } else {
          connector = "+";
        }

        out += connector + (cells[row][col].top ? hChar.repeat(hScale) : spaceChar.repeat(hScale));
      }

      // Right edge connector
      const rightConnector = isUnicode ? this._getUnicodeConnector(cells, row, columns, rows, columns) : "+";
      out += rightConnector + "\n";

      // content lines (vScale lines per row)
      for (let vLine = 0; vLine < vScale; vLine++) {
        for (let col = 0; col < columns; col++) {
          out += (cells[row][col].left ? vChar : spaceChar) + spaceChar.repeat(hScale);
        }
        out += (cells[row][columns - 1].right ? vChar : spaceChar) + "\n";
      }
    }

    // final horizontal border (bottom of last row)
    for (let col = 0; col < columns; col++) {
      const connector = isUnicode ? this._getUnicodeConnector(cells, rows, col, rows, columns) : "+";
      out += connector + (cells[rows - 1][col].bottom ? hChar.repeat(hScale) : spaceChar.repeat(hScale));
    }
    const bottomRightConnector = isUnicode ? this._getUnicodeConnector(cells, rows, columns, rows, columns) : "+";
    out += bottomRightConnector + "\n";

    return out;
  }

  _getUnicodeConnector(cells, row, col, rows, columns) {
    // Determine which walls connect at this position
    let hasTop = false, hasBottom = false, hasLeft = false, hasRight = false;

    // Vertical walls (check left/right walls of cells)
    if (col === 0) {
      // Left edge: check left walls
      if (row > 0) hasTop = cells[row - 1][col].left;
      if (row < rows) hasBottom = cells[row][col].left;
    } else if (col === columns) {
      // Right edge: check right walls
      if (row > 0) hasTop = cells[row - 1][col - 1].right;
      if (row < rows) hasBottom = cells[row][col - 1].right;
    } else {
      // Interior: check if there's a vertical wall between cells
      if (row > 0) hasTop = cells[row - 1][col - 1].right || cells[row - 1][col].left;
      if (row < rows) hasBottom = cells[row][col - 1].right || cells[row][col].left;
    }

    // Horizontal walls (check top/bottom walls of cells)
    if (row === 0) {
      // Top edge: check top walls
      if (col > 0) hasLeft = cells[row][col - 1].top;
      if (col < columns) hasRight = cells[row][col].top;
    } else if (row === rows) {
      // Bottom edge: check bottom walls
      if (col > 0) hasLeft = cells[row - 1][col - 1].bottom;
      if (col < columns) hasRight = cells[row - 1][col].bottom;
    } else {
      // Interior: check if there's a horizontal wall between cells
      if (col > 0) hasLeft = cells[row - 1][col - 1].bottom || cells[row][col - 1].top;
      if (col < columns) hasRight = cells[row - 1][col].bottom || cells[row][col].top;
    }

    // Count connections
    const connections = [hasTop, hasBottom, hasLeft, hasRight].filter(x => x).length;

    // Return appropriate Unicode character based on connections
    if (connections === 0) return " ";

    if (connections === 1) {
      if (hasLeft) return "╸";    // U+2578
      if (hasRight) return "╺";   // U+257A
      if (hasTop) return "╹";     // U+2579
      if (hasBottom) return "╻";  // U+257B
    }

    if (connections === 2) {
      if (hasLeft && hasRight) return "━";  // horizontal line
      if (hasTop && hasBottom) return "┃";  // vertical line
      if (hasTop && hasRight) return "┗";   // bottom-left corner
      if (hasTop && hasLeft) return "┛";    // bottom-right corner
      if (hasBottom && hasRight) return "┏"; // top-left corner
      if (hasBottom && hasLeft) return "┓";  // top-right corner
    }

    if (connections === 3) {
      if (!hasTop) return "┳";     // T pointing down
      if (!hasBottom) return "┻";  // T pointing up
      if (!hasLeft) return "┣";    // T pointing right
      if (!hasRight) return "┫";   // T pointing left
    }

    if (connections === 4) {
      return "╋";  // cross intersection
    }

    return "+";  // fallback
  }
}



