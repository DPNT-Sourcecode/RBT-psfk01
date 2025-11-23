import RabbitHoleSolution from './lib/solutions/RBT/rabbit_hole_solution.js';

class DebugSolution extends RabbitHoleSolution {
  testConnector() {
    const rows = 3, columns = 4;
    const digging_moves = 'DRDLDRRUURDD';
    const moves = digging_moves.toUpperCase();
    
    // Initialize cells
    const cells = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({ top: true, bottom: true, left: true, right: true }))
    );
    const visited = Array.from({ length: rows }, () => Array(columns).fill(false));
    let cur = null;
    const inBounds = (r, c) => r >= 0 && r < rows && c >= 0 && c < columns;

    for (const m of moves) {
      if (cur === null) {
        if (m === 'D') {
          cells[0][0].top = false;
          visited[0][0] = true;
          cur = { r: 0, c: 0 };
        }
        continue;
      }

      const { r, c } = cur;
      let nr = r, nc = c;
      if (m === 'U') nr = r - 1;
      else if (m === 'D') nr = r + 1;
      else if (m === 'L') nc = c - 1;
      else if (m === 'R') nc = c + 1;
      else continue;

      if (!inBounds(nr, nc)) continue;

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
    
    // Check connector at row=1, col=2
    const row = 1, col = 2;
    console.log('Checking connector at position (1, 2)');
    console.log('Top-left cell (0,1):', cells[0][1]);
    console.log('Top-right cell (0,2):', cells[0][2]);
    console.log('Bottom-left cell (1,1):', cells[1][1]);
    console.log('Bottom-right cell (1,2):', cells[1][2]);
    
    // Check each direction
    let hasTop = false, hasBottom = false, hasLeft = false, hasRight = false;
    if (row > 0 && col > 0 && cells[row - 1][col - 1].right) hasTop = true;
    if (row > 0 && col < columns && cells[row - 1][col].left) hasTop = true;
    console.log('hasTop:', hasTop, '(need right of (0,1) OR left of (0,2))');
    
    if (row < rows && col > 0 && cells[row][col - 1].right) hasBottom = true;
    if (row < rows && col < columns && cells[row][col].left) hasBottom = true;
    console.log('hasBottom:', hasBottom, '(need right of (1,1) OR left of (1,2))');
    
    if (row > 0 && col > 0 && cells[row - 1][col - 1].bottom) hasLeft = true;
    if (row < rows && col > 0 && cells[row][col - 1].top) hasLeft = true;
    console.log('hasLeft:', hasLeft, '(need bottom of (0,1) OR top of (1,1))');
    
    if (row > 0 && col < columns && cells[row - 1][col].bottom) hasRight = true;
    if (row < rows && col < columns && cells[row][col].top) hasRight = true;
    console.log('hasRight:', hasRight, '(need bottom of (0,2) OR top of (1,2))');
    
    const connector = this._getUnicodeConnector(cells, row, col, rows, columns);
    console.log('Connector character:', connector);
    console.log('Expected: ┃ (vertical line)');
  }
}

new DebugSolution().testConnector();
