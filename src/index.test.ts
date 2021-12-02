import { sum } from ".";

describe("sum", () => {
  it("adds 2 numbers", () => {
    expect(sum(40, 2)).toEqual(42);
  });
});
