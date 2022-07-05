/** Stack: using an array */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
    this.arr = [];
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    this.arr.push(val);

    this.size++;
  }

  /** pop(): remove the item from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if (!this.size) throw new Error("Stack is empty!");
    this.size--;
    return this.arr.pop();
  }

  /** peek(): return the value of the top item. */

  peek() {
    return this.arr[this.arr.length - 1];
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Stack;
