import Graph, { Node, Edge } from "../graph";
import {
  DiscoveryState,
  PathTree,
  NodeState,
  ProcessEdgeOptions,
} from "./traversal-types";

type DFSOptions = {
  processEdge?: (e: Edge, options?: ProcessEdgeOptions) => void;
  processVertexEarly?: (v: Node) => void;
  processVertexLate?: (v: Node) => void;
};

function dfsHelper(
  g: Graph,
  node: Node,
  state: NodeState,
  pathTree: PathTree,
  options: DFSOptions & { time: number },
) {
  options.time += 1;
  state[node.id] = DiscoveryState.discovered;
  options.processVertexEarly?.(node);
  for (const edge of node.listEdges()) {
    if (state[edge.node.id] === DiscoveryState.undiscovered) {
      pathTree[edge.node.id] = node;
      options.processEdge?.(edge);
      dfsHelper(g, edge.node, state, pathTree, options);
    } else if (state[edge.node.id] === DiscoveryState.discovered) {
      options.processEdge?.(edge, {
        pathTree,
        edgeState: DiscoveryState.discovered,
        from: node.id,
      });
    }
  }
  options.time += 1;
  options.processVertexLate?.(node);
  state[node.id] = DiscoveryState.processed;
}

export function dfs(g: Graph, start: string, optionsParam: DFSOptions = {}) {
  const startNode = g.nodeMap.get(start);
  const state: NodeState = {};
  const pathTree: PathTree = {};
  const options = {
    time: 0,
    ...optionsParam,
  };
  for (const vertex of g.nodesToArray()) {
    state[vertex.id] = DiscoveryState.undiscovered;
    pathTree[vertex.id] = null;
  }

  dfsHelper(g, startNode, state, pathTree, options);
  return pathTree;
}
