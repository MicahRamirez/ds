import Graph, { Node, Edge } from "../graph";
import {
  DiscoveryState,
  PathTree,
  NodeState,
  ProcessEdgeOptions,
  EdgeType,
} from "./traversal-types";

type DFSOptions = {
  processEdge?: (e: Edge, options?: ProcessEdgeOptions) => void;
  processVertexEarly?: (v: Node) => void;
  processVertexLate?: (v: Node) => void;
  pathTree?: PathTree;
  state?: NodeState;
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
  for (const edge of node.listEdges(g.isDirected())) {
    // TODO: it's getting hard to reason about this
    if (state[edge.node.id] === DiscoveryState.undiscovered) {
      pathTree[edge.node.id] = node;
      options.processEdge?.(edge, {
        pathTree,
        edgeState: DiscoveryState.discovered,
        from: node.id,
        edgeType: EdgeType.tree,
      });
      dfsHelper(g, edge.node, state, pathTree, options);
    } else if (
      state[edge.node.id] !== DiscoveryState.processed ||
      g.isDirected()
    ) {
      options.processEdge?.(edge, {
        pathTree,
        edgeState: DiscoveryState.discovered,
        from: node.id,
        edgeType: EdgeType.back,
      });
    }
  }
  options.time += 1;
  options.processVertexLate?.(node);
  state[node.id] = DiscoveryState.processed;
}

export function dfs(
  g: Graph,
  start: string,
  optionsParam: DFSOptions = { pathTree: {}, state: {} },
) {
  const startNode = g.nodeMap.get(start);
  const state = optionsParam.state ?? {};
  const pathTree = optionsParam.pathTree ?? {};
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
