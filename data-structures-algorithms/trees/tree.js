/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    //edge case for empty Tree
    if (!this.root) return 0;

    /////// ITERATIVE SOLUTION ////////
    // const toVisitStack = [this.root];
    // let sum = 0;
    // while (toVisitStack.length) {
    //   const current = toVisitStack.pop();
    //   sum += current.val;
    //   for (let child of current.children) {
    //     toVisitStack.push(child);
    //   }
    // }

    ////// RECURSIVE SOLUTION ////////
    let sum = this.root.val;

    function sumHelper(node) {
      //go through all the children for a Node
      for (let child of node.children) {
        //accumulate all values
        sum += child.val;
        //if it has any children
        if (child.children.length) {
          //recurse with the child as the root
          sumHelper(child);
        }
      }
    }

    sumHelper(this.root);
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    //edge case for empty Tree
    if (!this.root) return 0;

    //////// ITERATIVE SOLUTION ////////
    //let count = 0
    // const toVisitStack = [this.root];
    // while (toVisitStack.length) {
    //   const current = toVisitStack.pop();
    //   if (current.val % 2 === 0) {
    //     count++;
    //   }
    //   for (let child of current.children) {
    //     toVisitStack.push(child);
    //   }
    // }

    /////// RECURSIVE SOLUTION ///////
    let count = this.root.val % 2 === 0 ? 1 : 0;

    function countEvensHelper(node) {
      //go through all the children for a Node
      for (let child of node.children) {
        //count the child if the value is even
        if (child.val % 2 === 0) count++;
        //if it has any children (if no children recurse will not trigger)
        if (child.children.length) {
          //recurse with the child as the root
          countEvensHelper(child);
        }
      }
    }

    countEvensHelper(this.root);

    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    //edge case for empty tree
    if (!this.root) return 0;

    /////// ITERATIVE SOLUTION ///////
    // let count = 0;
    // const toVisitStack = [this.root];
    // while (toVisitStack.length) {
    //   const current = toVisitStack.pop();
    //   if (current.val > lowerBound) count++;
    //   for (let child of current.children) {
    //     toVisitStack.push(child);
    //   }
    // }
    // return count;

    //////// RECURSIVE SOLUTION ///////
    let count = this.root.val > lowerBound ? 1 : 0;

    function numGreaterHelper(node) {
      //for each child of a node
      for (let child of node.children) {
        // add to count if child's value is > lowerBound
        if (child.val > lowerBound) count++;
        //if the child has children
        if (child.children.length) {
          //recurse with the child as the new root
          numGreaterHelper(child);
        }
      }
    }

    numGreaterHelper(this.root);

    return count;
  }
}

module.exports = { Tree, TreeNode };
