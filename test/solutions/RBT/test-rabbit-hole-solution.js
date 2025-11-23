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
    const digging = "DRRURRDLLD";
    const expected =
`+   +---+---+---+
|       |       |
+---+   +   +   +
|       |   |   |
+   +---+   +   +
|           |   |
+---+---+---+---+
`;
    assert.equal(new RabbitHoleSolution().rabbit_hole(3, 3, digging, {}), expected);
  });

  it("should render with explicit default scale (3x1)", function () {
    // From the challenge example with explicit default scaling
    const digging = "DRRURRDLLD";
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
    assert.equal(new RabbitHoleSolution().rabbit_hole(3, 3, digging, options), expected);
  });

  it("should render with horizontal scale 6 and vertical scale 2", function () {
    // From the challenge example with 6x2 scaling
    const digging = "DRRURRDLLD";
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
    assert.equal(new RabbitHoleSolution().rabbit_hole(3, 3, digging, options), expected);
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
    // Create a 2x2 room with custom scale
    const digging = "DRRD";
    const options = { HORIZONTAL_SCALE: "4", VERTICAL_SCALE: "2" };
    const expected =
`+    +----+
|          |
|          |
+          +
|          |
|          |
+----+----+
`;
    assert.equal(new RabbitHoleSolution().rabbit_hole(2, 2, digging, options), expected);
  });
});

