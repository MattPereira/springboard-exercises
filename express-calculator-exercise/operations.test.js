const { mean, median, mode, convertNumsArray } = require("./operations");

describe("test mean function", function () {
  it("handles empty arrays by returning 0", function () {
    expect(mean([])).toEqual(0);
  });
  it("returns average of array of numbers", function () {
    expect(mean([5, 10, 15, 20, 50])).toEqual(20);
  });
});

describe("test median function", function () {
  it("returns the median of an odd length array", function () {
    expect(median([1, 2, 5, 6, 7])).toEqual(5);
  });
  it("returns the median of an even length array", function () {
    expect(median([1, 2, 6, 7])).toEqual(4);
  });
});

describe("test mode function", function () {
  test("mode returns the single number that occurs most frequently", function () {
    let result = mode([4, 4, 2, 1, 3, 4, 6, 7]);
    expect(result).toEqual([4]);
  });

  it("returns all numbers that occur most frequently", function () {
    let result = mode([1, 1, 2, 2, 3, 3, 3, 4, 4, 4]);
    expect(result).toEqual([3, 4]);
  });
});

describe("test converting and validating an array of strings", function () {
  it("returns array of numbers", function () {
    let result = convertNumsArray(["1", "2", "3", "4", "5"]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("throws error if item in array not convertible to number", function () {
    expect(convertNumsArray(["1", "2", "welp", "4", "5"])).toBeInstanceOf(
      Error
    );
  });
});
