it("should calculate the monthly rate correctly", function () {
  const values = {
    amount: 1000,
    years: 2,
    rate: 2,
  };
  expect(calculateMonthlyPayment(values)).toEqual("42.54");
});

it("should return a result with 2 decimal places", function () {
  const values = {
    amount: 3000,
    years: 3,
    rate: 3.33,
  };
  expect(calculateMonthlyPayment(values)).toEqual("87.68");
});

it("should handle less than one year term", function () {
  const values = {
    amount: 4000,
    years: 0.4,
    rate: 4.44,
  };
  expect(calculateMonthlyPayment(values)).toEqual("842.30");
});

it("should handle micro loans", function () {
  const values = {
    amount: 50,
    years: 1,
    rate: 1.11,
  };
  expect(calculateMonthlyPayment(values)).toEqual("4.19");
});

it("should return nothing with no inputs", function () {
  const values = {};
  expect(calculateMonthlyPayment(values)).nothing();
});
