import { describe, it } from "node:test";
import assert from "node:assert";

import one from "../../../lib/solutions/TST/one.js";
// noinspection JSUnusedLocalSymbols
import two from "../../../lib/solutions/TST/two.js";

describe("TST challenge", function () {
  it("show one", function () {
    assert.equal(one(), 1);
  });
});
