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
  timeMap?: Record<string, number>;
};

type EdgeClassificationOptions = {
  timeMap: Record<string, number>;
  state: Record<string, DiscoveryState>;
  pathTree: Record<string, Node>;
  isDirected: boolean;
};

function edgeClassification(
  x: string,
  y: string,
  { timeMap, state, pathTree, isDirected }: EdgeClassificationOptions,
) {
  const yParent = pathTree[y];
  if (state[y] === DiscoveryState.undiscovered || yParent?.id === x) {
    return EdgeType.tree;
  } else if (state[y] === DiscoveryState.discovered) {
    return EdgeType.back;
    // every edge in an undirected graph is a tree or back edge. Forward and cross edges only exist in
    // directed graphs
  } else if (
    isDirected &&
    state[y] === DiscoveryState.processed &&
    timeMap[y] > timeMap[x]
  ) {
    return EdgeType.forward;
  } else if (
    isDirected &&
    state[y] === DiscoveryState.processed &&
    timeMap[y] > timeMap[x]
  ) {
    return EdgeType.cross;
  } else {
    throw new Error("CANNOT FIGURE OUT THE EDGE TYPE");
  }
}

function dfsHelper(
  g: Graph,
  node: Node,
  state: NodeState,
  pathTree: PathTree,
  options: DFSOptions & { timeMap: Record<string, number>; time: number },
) {
  options.time += 1;
  options.timeMap[node.id] = options.time;
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
        edgeType: edgeClassification(node.id, edge.node.id, {
          timeMap: options.timeMap,
          pathTree,
          state,
          isDirected: g.isDirected(),
        }),
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
        edgeType: edgeClassification(node.id, edge.node.id, {
          timeMap: options.timeMap,
          pathTree,
          state,
          isDirected: g.isDirected(),
        }),
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
  optionsParam: DFSOptions = { pathTree: {}, state: {}, timeMap: {} },
) {
  const startNode = g.nodeMap.get(start);
  const state = optionsParam.state ?? {};
  const pathTree = optionsParam.pathTree ?? {};
  const timeMap = optionsParam.timeMap ?? {};
  const options = {
    time: 0,
    timeMap,
    ...optionsParam,
  };
  for (const vertex of g.nodesToArray()) {
    state[vertex.id] = DiscoveryState.undiscovered;
    pathTree[vertex.id] = null;
  }

  dfsHelper(g, startNode, state, pathTree, options);
  return pathTree;
}
