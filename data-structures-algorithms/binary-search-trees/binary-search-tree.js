class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    //insert at root if empty tree
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    //Otherwise, find the proper place for the new node.
    let currNode = this.root;
    while (true) {
      if (currNode.val > val) {
        if (currNode.left === null) {
          currNode.left = new Node(val);
          return this;
        } else {
          currNode = currNode.left;
        }
      } else if (currNode.val < val) {
        if (currNode.right === null) {
          currNode.right = new Node(val);
          return this;
        } else {
          currNode = currNode.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currNode = this.root) {
    //if empty tree insert at root
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (currNode.val > val) {
      //insert to the left
      if (currNode.left === null) {
        currNode.left = new Node(val);
        return this;
      } else {
        //recurse with currNode set to currNode.left
        return this.insertRecursively(val, currNode.left);
      }
    } else if (currNode.val < val) {
      //insert to the right
      if (currNode.right === null) {
        currNode.right = new Node(val);
        return this;
      } else {
        //recurse with currNode set to currNode.right
        return this.insertRecursively(val, currNode.right);
      }
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currNode = this.root;
    let found = false;

    //if the value being searched for is the root node value
    if (val === this.root.val) return currNode;

    while (currNode && !found) {
      if (currNode.val > val) {
        currNode = currNode.left;
      } else if (currNode.val < val) {
        currNode = currNode.right;
      } else if (currNode.val === val) {
        found = true;
      }
    }

    if (!found) return undefined;

    return currNode;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currNode = this.root) {
    //if currNode is not null
    if (currNode) {
      if (currNode.val > val) {
        //recurse to the left
        return this.findRecursively(val, currNode.left);
      } else if (currNode.val < val) {
        //recurse to the right
        return this.findRecursively(val, currNode.right);
      } else {
        return currNode;
      }
    }

    return undefined;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const visited = [];

    function traverse(node) {
      visited.push(node.val); //visit
      if (node.left) traverse(node.left); // go left if left is not null
      if (node.right) traverse(node.right); // go right if right is not null
    }

    traverse(this.root);

    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const visited = [];

    function traverse(node) {
      if (node.left) traverse(node.left); // go left if left is not null
      visited.push(node.val); // visit
      if (node.right) traverse(node.right); // go right if right is not null
    }

    traverse(this.root);

    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const visited = [];

    function traverse(node) {
      if (node.left) traverse(node.left); // go left if left is not null
      if (node.right) traverse(node.right); // go right if right is not null
      visited.push(node.val); // visit
    }

    traverse(this.root);

    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const visited = [];

    let queue = [this.root];

    while (queue.length > 0) {
      let currNode = queue.shift();
      visited.push(currNode.val);
      if (currNode.left) queue.push(currNode.left);
      if (currNode.right) queue.push(currNode.right);
    }

    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove = this.root;
    let parent;

    while (nodeToRemove.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    if (nodeToRemove !== this.root) {
      //if the nodeToRemove has no children
      if (nodeToRemove.left === null && nodeToRemove.right === null) {
        if (parent.left === nodeToRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
        //if the nodeToRemove has two children
      } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
        let rightParent = nodeToRemove;
        let right = nodeToRemove.right;
        //if the right child of the nodeToRemove has no left child
        if (right.left === null) {
          right.left = nodeToRemove.left;
          if (parent.left === nodeToRemove) {
            parent.left = right;
          } else {
            parent.right = right;
          }
          //if the right child of the nodeToRemove has a left child
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === nodeToRemove) {
            parent.left.val = right.val;
          } else {
            parent.right.val = right.val;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parent.left === nodeToRemove) {
          if (nodeToRemove.right === null) {
            parent.left = nodeToRemove.left;
          } else {
            parent.left = nodeToRemove.right;
          }
        } else {
          //if nodeToRemove has only a left child
          if (nodeToRemove.right === null) {
            parent.right = nodeToRemove.left;
          } else {
            parent.right = nodeToRemove.right;
          }
        }
      }
    }
    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(currNode = this.root) {
    if (currNode === null) return;

    return maxDepth(currNode) - minDepth(currNode) <= 1;

    function minDepth(currNode) {
      if (currNode === null) return 0;
      return 1 + Math.min(minDepth(currNode.left), minDepth(currNode.right));
    }

    function maxDepth(currNode) {
      if (currNode === null) return 0;
      return 1 + Math.max(maxDepth(currNode.left), maxDepth(currNode.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(current = this.root) {
    // if the tree is too small, return
    if (!this.root || (!this.root.left && !this.root.right)) return;

    while (current) {
      // Current is largest and has a left subtree and 2nd largest is the largest in that subtree
      if (current.left && !current.right) {
        return this.findSecondHighest(current.left);
      }
      // Current is parent of largest and largest has no children so current is 2nd largest
      if (current.right && !current.right.left && !current.right.right) {
        return current.val;
      }
      current = current.right;
    }
  }

  dfsInOrderIterative() {
    let cur = this.root;
    let stack = [];
    let dfs = [];
    while (stack.length > 0 || cur) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      if (cur) {
        dfs.push(cur.val);
        cur = cur.right;
      }
    }
    return dfs;
  }
}

module.exports = BinarySearchTree;
