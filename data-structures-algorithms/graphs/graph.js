class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray) {
      this.nodes.add(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let neighbor of vertex.adjacent.values()) {
      this.removeEdge(neighbor, vertex);
    }

    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    //array to collect node values
    const dfsArr = [];

    const toVisitStack = [start];
    const seen = new Set(toVisitStack);

    while (toVisitStack.length) {
      let currNode = toVisitStack.pop();

      dfsArr.push(currNode.value);

      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }

    return dfsArr;
  }

  depthFirstSearchRecursive(start) {
    const seen = new Set();
    const dfsArr = [];

    function traverse(vertex) {
      //base case
      if (!vertex) return null;

      //visit node
      seen.add(vertex);
      dfsArr.push(vertex.value);

      //visit neighbors
      vertex.adjacent.forEach((neighbor) => {
        if (!seen.has(neighbor)) {
          return traverse(neighbor);
        }
      });
    }

    traverse(start);
    return dfsArr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const bfsArr = [];

    const toVisitQueue = [start];
    const seen = new Set(toVisitQueue);

    while (toVisitQueue.length) {
      const currNode = toVisitQueue.shift();

      bfsArr.push(currNode.value);

      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }

    return bfsArr;
  }

  shortestPath(start, end) {
    if (start === end) {
      return [start.value];
    }

    let queue = [start];
    let visited = new Set();
    let predecessors = {};
    let path = [];

    while (queue.length) {
      let currentVertex = queue.shift();

      if (currentVertex === end) {
        let stop = predecessors[end.value];

        while (stop) {
          path.push(stop);
          stop = predecessors[stop];
        }

        path.unshift(start.value);
        path.reverse();
        return path;
      }

      visited.add(currentVertex);

      for (let vertex of currentVertex.adjacent) {
        if (!visited.has(vertex)) {
          predecessors[vertex.value] = currentVertex.value;
          queue.push(vertex);
        }
      }
    }
  }
}

module.exports = { Graph, Node };
