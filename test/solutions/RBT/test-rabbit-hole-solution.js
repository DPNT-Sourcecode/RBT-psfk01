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
      "+   +\n" +
      "+---+\n"
    assert.equal(new RabbitHoleSolution().rabbit_hole(1, 1), expected);
  });
});

