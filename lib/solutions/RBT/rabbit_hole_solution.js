export default class RabbitHoleSolution {
  rabbit_hole(rows, columns, digging_moves, rendering_options) {
    if (rows <= 0 || columns <= 0) return "";

    let result = "";

    // Build horizontal border
    const horizontalBorder = "+" + "---+".repeat(columns) + "\n";

    // Build row content
    const rowContent = "|" + "   |".repeat(columns) + "\n";

    // Construct the grid
    for (let row = 0; row < rows; row++) {
      result += horizontalBorder;
      result += rowContent;
    }

    // Add final horizontal border
    result += horizontalBorder;

    return result;
  }
}




