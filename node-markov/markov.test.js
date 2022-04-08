const { MarkovMachine } = require("./markov");

describe("Markov Machine", function () {
  let mm;

  beforeEach(function () {
    mm = new MarkovMachine("the cat in the hat");
  });

  test("makes chains", function () {
    expect(mm.chains).toEqual(
      new Map([
        ["the", ["cat", "hat"]],
        ["cat", ["in"]],
        ["in", ["the"]],
        ["hat", [null]],
      ])
    );
  });

  test("makeText returns a string", function () {
    expect(mm.makeText()).toEqual(expect.any(String));
    expect(mm.makeText()).not.toBeUndefined();
    expect(mm.makeText()).not.toBeNull();
  });

  test("choice picks from an array", function () {
    expect(MarkovMachine.choice([7, 7, 7, 7, 7])).toEqual(7);
    expect([8, 9, 10]).toContain(MarkovMachine.choice([8, 9, 10]));
  });

  test("always ends with last word", function () {
    let output = mm.makeText();
    expect(output.endsWith("hat")).toBe(true);
  });

  test("generates valid text", function () {
    let bigrams = ["the cat", "cat in", "in the", "the hat", "hat "];

    let outputWords = mm.makeText().split(/[ \r\n]+/);

    for (let i = 0; i < outputWords.length - 1; i++) {
      expect(bigrams).toContain(outputWords[i] + " " + outputWords[i + 1]);
    }
  });

  test("cuts off at length", function () {
    let bigrams = ["the cat", "cat in", "in the", "the hat", "hat "];
    let mm = new MarkovMachine("the cat in the hat");
    let output = mm.makeText(5);

    let outputWords = output.split(/[ \r\n]+/);
    expect([1, 2, 3, 4, 5]).toContain(outputWords.length);
  });
});
