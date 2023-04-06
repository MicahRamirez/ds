import Graph, { Node, Edge } from "../graph";
import LinkedQueue from "../../queue/linked-queue";

enum DiscoveryState {
  undiscovered = "undiscovered",
  discovered = "discovered",
  processed = "processed",
}
type BFSOptions = {
  processVertex: (v: Node) => void;
  processEdge: (e: Edge) => void;
};
type PathTree = Record<string, Node | null>;

/**
 * TODO move refactor to "traversals" module
 */
function BFS(g: Graph, start: string, options?: BFSOptions) {
  const state: Record<string, DiscoveryState> = {};
  const pathTree: Record<string, Node | null> = {};
  const queue = new LinkedQueue<Node>();

  // init bfs structs
  for (const node of g) {
    state[node.id] = DiscoveryState.undiscovered;
    pathTree[node.id] = null;
  }

  pathTree[start] = null;
  state[start] = DiscoveryState.discovered;
  // TODO: node map should be private need a method for this
  queue.enqueue(g.nodeMap.get(start));
  while (queue.size() !== 0) {
    const u = queue.dequeue();
    // do some processing?
    options?.processVertex(u);
    for (const edge of u.listEdges()) {
      const { node: adjacentNode } = edge;
      options?.processEdge(edge);
      // do some processing on edge (u,v)
      if (state[adjacentNode.id] === DiscoveryState.undiscovered) {
        state[adjacentNode.id] = DiscoveryState.discovered;
        pathTree[adjacentNode.id] = u;
        queue.enqueue(adjacentNode);
      }
    }
    state[u.id] = DiscoveryState.processed;
  }
  return pathTree;
}

export function shortestUnweightedPath(g: Graph, x: string, y: string) {
  const pathTree = BFS(g, x);
  if (pathTree[x] !== null) {
    throw new Error(
      "shortest unweighted path from x to y must be anchored at x",
    );
  }
  const pathString = constructPathString(pathTree, g.nodeMap.get(y));
  const reversedString = [];
  for (let i = pathString.length - 1; i >= 0; i--) {
    reversedString.push(pathString[i]);
  }
  return reversedString.join("");
}

function constructPathString(pathTree: PathTree, node: Node): string {
  const parent = pathTree[node.id];
  if (parent === null) {
    return node.id;
  }
  return node.id + constructPathString(pathTree, parent);
}
