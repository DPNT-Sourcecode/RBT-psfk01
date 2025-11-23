import { describe, it } from "node:test";
import assert from "node:assert";
import RabbitHoleSolution from "../../../lib/solutions/RBT/rabbit_hole_solution.js";

describe("RBT challenge: digging tunnel rendering", function () {
  it("should render tunnel after given move sequence", function () {
    const rows = 3;
    const columns = 4;
    const moves = "DRDLDRRUURDD";

    const expected =
      "+   +---+---+---+\n" +
      "|       |       |\n" +
      "+---+   +   +   +\n" +
      "|       |   |   |\n" +
      "+   +---+   +   +\n" +
      "|           |   |\n" +
      "+---+---+---+---+\n";

    assert.equal(new RabbitHoleSolution().rabbit_hole(rows, columns, moves), expected);
  });
});
