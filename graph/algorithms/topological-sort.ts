import Graph from "../graph";
import { dfs } from "./dfs";
import { DiscoveryState, ProcessEdgeOptions } from "./traversal-types";
import type { Node, Edge } from "../graph";

export default function topologicalSort(g: Graph): Array<string> {
  const stack: Array<string> = [];
  function processVertex(node: Node) {
    stack.push(node.id);
  }
  function processEdge(edge: Edge, opts: ProcessEdgeOptions) {
    const u = opts.from;
    const v = edge.node.id;
    const parent = opts.pathTree[v].id;
    if (parent !== u) {
      throw new Error("Back Edge");
    }
  }
  const pathTree = {};
  const state = {};
  for (const node of g) {
    if (!state[node.id] || state[node.id] === DiscoveryState.undiscovered) {
      dfs(g, node.id, {
        processVertexLate: processVertex,
        processEdge,
        pathTree,
        state,
      });
    }
  }

  return stack.reverse();
}
