const LinkedList = require("./linked-list");

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
    this._list = new LinkedList();
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    // const newNode = new Node(val);

    this._list.push(val);
    console.log(this._list);

    if (!this.size) {
      this.first = this._list.head;
      this.last = this._list.tail;
    } else {
      this.last = this._list.tail;
    }

    this.size++;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if (!this.size) {
      throw new Error("Queue is empty!");
    }

    let temp = this._list.head;

    // edge case: dequeue with only one node left in Queue
    // must also handle deletion of this.last
    if (this.size === 1) {
      this.last = null;
    }

    //remove node from start and updates this.first
    //if only one node left, this.first will be set to null?
    this.first = temp.next;
    this.size--;

    return temp.val;
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Queue;
