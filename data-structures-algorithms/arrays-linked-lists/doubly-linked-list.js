/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class DoublyLinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** _get(idx): retrieve node at idx. */

  _get(idx) {
    let cur = this.head;
    let count = 0;

    while (cur !== null && count != idx) {
      count += 1;
      cur = cur.next;
    }

    return cur;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    //handles empty llist
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      //handles not empty llist
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    //handle empty llist
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      //handle not empty llist
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    //edge case : length === 1
    if (this.length === 1) {
      let removedVal = this.head.val;
      this.head = null;
      this.tail = null;
      this.length -= 1;
      return removedVal;
    }

    ////// normal case: length > 1 //////
    let prev = this.tail.prev;
    let removedVal = this.tail.val;
    prev.next = null;
    this.tail = prev;
    this.length -= 1;
    return removedVal;
  }

  /** shift(): return & remove first item. */

  shift() {
    //edge case: length === 1
    if (this.length === 1) {
      let removedVal = this.head.val;
      this.head = null;
      this.tail = null;
      this.length -= 1;
      return removedVal;
    }

    //normal case: length > 1
    let removedVal = this.head.val;
    this.head = this.head.next;
    this.length -= 1;
    return removedVal;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let count = 0;
    let cur = this.head;

    while (cur && count < idx) {
      cur = cur.next;
      count++;
    }

    return cur.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0 || idx > this.length) {
      throw new Error("Invalid index!");
    }

    let cur = this._get(idx);

    cur.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) {
      throw new Error("Invalid index!");
    }

    // edge cases for adding to start or end of llist
    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    // target the node before idx
    let target = this._get(idx - 1);
    let newNode = new Node(val);
    newNode.next = target.next;
    target.next.prev = newNode;
    newNode.prev = target;
    target.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0 || idx > this.length) {
      throw new Error("Invalid index!");
    }

    // find the target node to remove from idx
    let target = this._get(idx);

    ///// edge case: remove first item (head) /////
    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if (this.length < 2) this.tail = this.head;
      if (this.length >= 2) this.head.prev = null;
      return val;
    }

    ///// edge case: removing tail /////
    if (idx === this.length - 1) {
      let val = target.val;
      //disconnect link between previous node and tail
      target.prev.next = null;
      //update tail to be the previous node
      this.tail = target.prev;
      this.length -= 1;
      return val;
    }

    ///// normal case: remove somewhere in middle of llist /////
    let val = target.val;
    let prev = target.prev;
    //handle removal of target and reconnection of doubly linked list
    prev.next = target.next;
    target.next.prev = prev;
    this.length -= 1;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    //edge case of empty llist
    if (this.length === 0) return 0;

    let sum = 0;
    let cur = this.head;

    while (cur) {
      sum += cur.val;
      cur = cur.next;
    }

    return sum / this.length;
  }
}

module.exports = DoublyLinkedList;
