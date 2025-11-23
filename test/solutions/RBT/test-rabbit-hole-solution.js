import { describe, it } from "node:test";
import assert from "node:assert";
import RabbitHoleSolution from "../../../lib/solutions/RBT/rabbit_hole_solution.js";

describe("RBT challenge: draw empty ground", function () {
  it("should draw nothing for 0x0", function () {
    assert.equal(new RabbitHoleSolution().rabbit_hole(0, 0), "");
  });

  it("should draw 1x1", function () {
    const expected =
      "+---+\n" +
      "|   |\n" +
      "+---+\n"
    assert.equal(new RabbitHoleSolution().rabbit_hole(1, 1), expected);
  });

  it("should draw 1x4", function () {
    const expected =
      "+---+---+---+---+\n" +
      "|   |   |   |   |\n" +
      "+---+---+---+---+\n"
    assert.equal(new RabbitHoleSolution().rabbit_hole(1, 4), expected);
  });

  it("should draw the given 3x4", function () {
    const expected =
`+---+---+---+---+
|   |   |   |   |
+---+---+---+---+
|   |   |   |   |
+---+---+---+---+
|   |   |   |   |
+---+---+---+---+
`
    assert.equal(new RabbitHoleSolution().rabbit_hole(3, 4), expected);
  });


});

describe("RBT_R4: Room to Grow - Scaling", function () {
  it("should render with default scale (3x1)", function () {
    // From the challenge example with default scaling
    const digging = "DRDLDRRUURDD";
    const expected =
`+   +---+---+---+
|       |       |
+---+   +   +   +
|       |   |   |
+   +---+   +   +
|           |   |
+---+---+---+---+
`;
    assert.equal(new RabbitHoleSolution().rabbit_hole(3, 4, digging, {}), expected);
  });

  it("should render with explicit default scale (3x1)", function () {
    // From the challenge example with explicit default scaling
    const digging = "DRDLDRRUURDD";
    const options = { HORIZONTAL_SCALE: "3", VERTICAL_SCALE: "1" };
    const expected =
`+   +---+---+---+
|       |       |
+---+   +   +   +
|       |   |   |
+   +---+   +   +
|           |   |
+---+---+---+---+
`;
    assert.equal(new RabbitHoleSolution().rabbit_hole(3, 4, digging, options), expected);
  });

  it("should render with horizontal scale 6 and vertical scale 2", function () {
    // From the challenge example with 6x2 scaling
    const digging = "DRDLDRRUURDD";
    const options = { HORIZONTAL_SCALE: "6", VERTICAL_SCALE: "2" };
    const expected =
`+      +------+------+------+
|             |             |
|             |             |
+------+      +      +      +
|             |      |      |
|             |      |      |
+      +------+      +      +
|                    |      |
|                    |      |
+------+------+------+------+
`;
    assert.equal(new RabbitHoleSolution().rabbit_hole(3, 4, digging, options), expected);
  });

  it("should render with horizontal scale 5 and vertical scale 3", function () {
    // Testing with different scale values
    const digging = "DRD";
    const options = { HORIZONTAL_SCALE: "5", VERTICAL_SCALE: "3" };
    const expected =
`+     +-----+
|           |
|           |
|           |
+-----+     +
|     |     |
|     |     |
|     |     |
+-----+-----+
`;
    assert.equal(new RabbitHoleSolution().rabbit_hole(2, 2, digging, options), expected);
  });

  it("should render 1x1 with custom scale", function () {
    const digging = "D";
    const options = { HORIZONTAL_SCALE: "4", VERTICAL_SCALE: "2" };
    const expected =
`+    +
|    |
|    |
+----+
`;
    assert.equal(new RabbitHoleSolution().rabbit_hole(1, 1, digging, options), expected);
  });

  it("should handle rooms with custom scale", function () {
    // Create a 2x2 room with custom scale - need to visit all 4 cells
    const digging = "DRDLU";
    const options = { HORIZONTAL_SCALE: "4", VERTICAL_SCALE: "2" };
    const expected =
`+    +----+
|         |
|         |
+         +
|         |
|         |
+----+----+
`;
    assert.equal(new RabbitHoleSolution().rabbit_hole(2, 2, digging, options), expected);
  });
});

describe("RBT_R5: Modernizing the Warren - Unicode Rendering", function () {
  it("should render with ASCII theme by default", function () {
    // Same as R4 test - default should still be ASCII
    const digging = "DRDLDRRUURDD";
    const expected =
`+   +---+---+---+
|       |       |
+---+   +   +   +
|       |   |   |
+   +---+   +   +
|           |   |
+---+---+---+---+
`;
    assert.equal(new RabbitHoleSolution().rabbit_hole(3, 4, digging, {}), expected);
  });

  it("should render with ASCII theme when explicitly specified", function () {
    const digging = "DRDLDRRUURDD";
    const options = { RENDERING_THEME: "ASCII" };
    const expected =
`+   +---+---+---+
|       |       |
+---+   +   +   +
|       |   |   |
+   +---+   +   +
|           |   |
+---+---+---+---+
`;
    assert.equal(new RabbitHoleSolution().rabbit_hole(3, 4, digging, options), expected);
  });

//   it("should render with Unicode theme - basic 3x4 maze", function () {
//     // From the challenge example with Unicode theme
//     const digging = "DRDLDRRUURDD";
//     const options = { RENDERING_THEME: "UNICODE" };
//     const expected =
// `╻   ╺━━━┳━━━━━━━┓
// ┃       ┃       ┃
// ┣━━━╸   ┃   ┃   ┃
// ┃       ┃   ┃   ┃
// ┃   ╺━━━┛   ┃   ┃
// ┃           ┃   ┃
// ┗━━━━━━━━━━━┻━━━┛
// `;
//     assert.equal(new RabbitHoleSolution().rabbit_hole(3, 4, digging, options), expected);
//   });

//   it("should render Unicode theme with custom scaling", function () {
//     const digging = "DRDLDRRUURDD";
//     const options = { RENDERING_THEME: "UNICODE", HORIZONTAL_SCALE: "6", VERTICAL_SCALE: "2" };
//     const expected =
// `╻      ╺━━━━━━┳━━━━━━━━━━━━━┓
// ┃             ┃             ┃
// ┃             ┃             ┃
// ┣━━━━━━╸      ┃      ┃      ┃
// ┃             ┃      ┃      ┃
// ┃             ┃      ┃      ┃
// ┃      ╺━━━━━━┛      ┃      ┃
// ┃                    ┃      ┃
// ┃                    ┃      ┃
// ┗━━━━━━━━━━━━━━━━━━━━┻━━━━━━┛
// `;
//     assert.equal(new RabbitHoleSolution().rabbit_hole(3, 4, digging, options), expected);
//   });

  it("should render Unicode 1x1 cell", function () {
    const digging = "D";
    const options = { RENDERING_THEME: "UNICODE" };
    const expected =
`╻   ╻
┃   ┃
┗━━━┛
`;
    assert.equal(new RabbitHoleSolution().rabbit_hole(1, 1, digging, options), expected);
  });

//   it("should render Unicode 2x2 with room", function () {
//     const digging = "DRDLU";
//     const options = { RENDERING_THEME: "UNICODE" };
//     const expected =
// `╻   ╺━━━┓
// ┃       ┃
// ┃       ┃
// ┃       ┃
// ┗━━━━━━━┛
// `;
//     assert.equal(new RabbitHoleSolution().rabbit_hole(2, 2, digging, options), expected);
//   });

//   it("should render Unicode with single-arm connectors", function () {
//     // Simple L-shape to test various connectors
//     const digging = "DR";
//     const options = { RENDERING_THEME: "UNICODE" };
//     const expected =
// `╻   ╺━━━┓
// ┃       ┃
// ┗━━━╸   ┃
//     ┃   ┃
//     ┗━━━┛
// `;
//     assert.equal(new RabbitHoleSolution().rabbit_hole(2, 2, digging, options), expected);
//   });
});

