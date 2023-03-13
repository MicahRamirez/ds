import { Comparator } from "../../common";
import { heapsort } from "../heap-sort";

describe("heapsort", () => {
  it("should sort numbers ascending by default when not given a comparator", () => {
    const input = [100, 99, 2, 4, 61];
    const actual = heapsort(input);

    const expectedResult = [2, 4, 61, 99, 100];

    expect(actual).toEqual(expectedResult);
  });
});
