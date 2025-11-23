import { describe, it } from "node:test";
import assert from "node:assert";
import RabbitHoleSolution from "../../../lib/solutions/RBT/rabbit_hole_solution.js";

describe("RBT challenge: room creation", function () {
  it("should render a 2x2 room with central pillar removed", function () {
    const rows = 2;
    const columns = 2;
    // Moves: enter (D), then loop to dig all cells
    // D R D L U R D (to visit all 4 cells)
    const moves = "DRDLURD";
    const expected =
      "+   +---+\n" +
      "|       |\n" +
      "+       +\n" +
      "|       |\n" +
      "+---+---+\n";
    assert.equal(new RabbitHoleSolution().rabbit_hole(rows, columns, moves), expected);
  });

  it("should render a 3x3 room with central pillars removed", function () {
    const rows = 3;
    const columns = 3;
    // Moves to dig through all internal walls of 3x3 grid
    const moves = "DDDRUURDDLLURRULL";
    const expected =
      "+   +---+---+\n" +
      "|           |\n" +
      "+           +\n" +
      "|           |\n" +
      "+           +\n" +
      "|           |\n" +
      "+---+---+---+\n";
    assert.equal(new RabbitHoleSolution().rabbit_hole(rows, columns, moves), expected);
  });

  it("should render a 2x3 room with central pillars removed", function () {
    const rows = 2;
    const columns = 3;
    // Moves to dig through all internal walls of 2x3 grid
    const moves = "DDRURDRULLLDRRR";
    const expected =
      "+   +---+---+---+\n" +
      "|               |\n" +
      "+               +\n" +
      "|               |\n" +
      "+---+---+---+---+\n";
    assert.equal(new RabbitHoleSolution().rabbit_hole(rows, columns, moves), expected);
  });
});



