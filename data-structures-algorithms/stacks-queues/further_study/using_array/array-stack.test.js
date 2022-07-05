// const Stack = require("./stack");

//FURTHER STUDY using array for a stack
const Stack = require("./array-stack");

let stack;

beforeEach(function () {
  stack = new Stack();
});

describe("push", function () {
  it("places the value at the top of the stack and returns undefined", function () {
    expect(stack.push(10)).toBe(undefined);
    expect(stack.arr[0]).toBe(10);
    stack.push(100);
    expect(stack.arr[1]).toBe(100);
    stack.push(1000);
    expect(stack.arr[2]).toBe(1000);
  });
});

describe("pop", function () {
  it("returns the value of the node removed", function () {
    stack.push(10);
    stack.push(100);
    stack.push(1000);

    var removed = stack.pop();
    expect(removed).toBe(1000);
    expect(stack.size).toBe(2);
    expect(stack.arr[1]).toBe(100);
    expect(stack.arr[0]).toBe(10);
    stack.pop();
    expect(stack.arr[0]).toBe(10);
    stack.pop();

    expect(stack.size).toBe(0);
  });

  it("throws an error if the stack is empty", function () {
    expect(() => stack.pop()).toThrow(Error);
  });
});

describe("peek", function () {
  it("returns the value at the start of the stack", function () {
    stack.push(3);
    expect(stack.peek()).toBe(3);
    stack.push(5);
    expect(stack.peek()).toBe(5);
  });
});

describe("isEmpty", function () {
  it("returns true for empty stacks", function () {
    expect(stack.isEmpty()).toBe(true);
  });

  it("returns false for nonempty stacks", function () {
    stack.push(3);
    expect(stack.isEmpty()).toBe(false);
  });
});
