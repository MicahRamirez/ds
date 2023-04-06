import Graph, { Node, Edge } from "../graph";
import { DiscoveryState, BFSOptions, PathTree } from "./traversal-types";

type NodeState = Record<string, DiscoveryState>;
function dfsHelper(
  g: Graph,
  node: Node,
  state: NodeState,
  pathTree: PathTree,
  options: {
    time: number;
    processEdge: (e: Edge) => void;
    processVertex: (v: Node) => void;
  },
) {
  options.time += 1;
  state[node.id] = DiscoveryState.discovered;
  for (const edge of node.listEdges()) {
    // cases
    // start -> thisEdge where thisEdge is undiscovered null !== node T (Tree Edge)
    // start -> thisEdge where thisEdge is discovered  but would've been discovered by this path (BackEdge)
    // thisEdge -> start where thisEdge is direct ancestor to start
    if (state[edge.node.id] === DiscoveryState.undiscovered) {
      pathTree[edge.node.id] = node;
      processEdge(edge);
      dfsHelper(g, edge.node, state, pathTree, options);
    } else if (state[edge.node.id] === DiscoveryState.discovered) {
      processEdge(edge);
    }
  }
  options.time += 1;
  processVertex(node);
  state[node.id] = DiscoveryState.processed;
}

function processEdge(edge: Edge) {
  console.log(`edgeprocessed: ${edge.node.id}`);
}

function processVertex(vertex: Node) {
  console.log(`vertexprocessed: ${vertex.id}`);
}

export function dfs(g: Graph, start: string) {
  const startNode = g.nodeMap.get(start);
  const state: NodeState = {};
  const pathTree: PathTree = {};
  const options = { time: 0, processEdge, processVertex };
  for (const vertex of g.nodesToArray()) {
    state[vertex.id] = DiscoveryState.undiscovered;
    pathTree[vertex.id] = null;
  }
  dfsHelper(g, startNode, state, pathTree, options);
  return pathTree;
}
