const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("SQL for partial updates", function () {
  it("works with 1 item", function () {
    const result = sqlForPartialUpdate(
      { firstName: "Matt" },
      { firstName: "first_name" }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1',
      values: ["Matt"],
    });
  });

  it("works with 3 items", function () {
    const result = sqlForPartialUpdate(
      { firstName: "Bojack", lastName: "Horseman", age: 31 },
      { firstName: "first_name", lastName: "last_name" }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1, "last_name"=$2, "age"=$3',
      values: ["Bojack", "Horseman", 31],
    });
  });

  it("throws error if empty dataToUpdate argument", function () {
    try {
      sqlForPartialUpdate(
        {},
        { firstName: "first_name", lastName: "last_name" }
      );
    } catch (e) {
      expect(e instanceof BadRequestError).toBeTruthy();
    }
  });

  it("works with 1 item", function () {
    const result = sqlForPartialUpdate({ age: 31 });
    expect(result).toEqual({
      setCols: '"first_name"=$1',
      values: ["Matt"],
    });
  });
});
