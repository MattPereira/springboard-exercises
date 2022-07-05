const LinkedList = require("./linked-list");

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
    this._list = new LinkedList();
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    //unshift a new Node(val) to start of this._list
    this._list.unshift(val);
    if (!this.size) {
      this.first = this._list.head;
      this.last = this._list.tail;
    } else {
      let temp = this.first;
      this.first = this._list.head;
      this.first.next = temp;
    }

    this.size++;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if (!this.size) throw new Error("The stack is empty!");

    let temp = this.first;

    if (this.first == this.last) {
      this.last = null;
    }

    this.first = this._list.head.next;
    this.size--;

    //_list.shift() will return and remove what was the head node
    return this._list.shift();
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Stack;
