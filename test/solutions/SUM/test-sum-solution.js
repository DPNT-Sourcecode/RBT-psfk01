import { describe, it } from "node:test";
import assert from "node:assert";
import SumSolution from "../../../lib/solutions/SUM/sum_solution.js";

describe("SUM challenge: adding two numbers", function () {
  it("should return 3, which is the sum of 1 and 2", function () {
    assert.equal(new SumSolution().compute(1, 2), 3);
  });
});
