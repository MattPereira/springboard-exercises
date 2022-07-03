const {
  findRotatedIndex,
  findPivot,
  binarySearch,
} = require("./find-rotated-index");

describe("#findRotatedIndex", function () {
  it("returns the correct index", function () {
    expect(findRotatedIndex([3, 4, 1, 2], 4)).toBe(1);
    expect(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8)).toBe(2);
    expect(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)).toBe(6);
    expect(findRotatedIndex([37, 44, 66, 102, 10, 22], 14)).toBe(-1);
    expect(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)).toBe(-1);
  });
});

describe("#findPivot", function () {
  it("returns the pivot index", function () {
    expect(findPivot([3, 4, 1, 2], 4)).toBe(2);
    expect(findPivot([6, 7, 8, 9, 1, 2, 3, 4], 8)).toBe(4);
    expect(findPivot([37, 44, 66, 102, 10, 22], 14)).toBe(4);
    expect(findPivot([6, 7, 8, 9, 1, 2, 3, 4], 12)).toBe(4);
  });
});

describe("#binarySearch", function () {
  it("returns the pivot index", function () {
    expect(binarySearch([1, 2, 3, 4], 4, 0, 3)).toBe(3);
    expect(binarySearch([1, 2, 3, 4, 6, 7, 8, 9], 8, 0, 7)).toBe(6);
    expect(binarySearch([37, 44, 66, 102, 10, 22], 14, 0, 5)).toBe(-1);
  });
});
