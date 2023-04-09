import Graph, { Node, Edge } from "../graph";
import { dfs } from "./dfs";
import type { ProcessEdgeOptions } from "./traversal-types";

/**
 * Any "back" edge represents a cycle so we just need to use bfs. Check whether in
 * the edge (u,v) vertex U is already discovered and not processed THEN if V is NOT the parent (direct ancestor)
 * then the edge u to v must be a back edge.
 *
 * Basically if there are ANY back edges we must have a cycle
 * @param g
 */
export function hasCycle(g: Graph) {
  const graphNodes = g.nodesToArray();
  const visitedNodesSet = new Set();
  let hasCycle = false;
  const processVertex = (vertex: Node) => {
    visitedNodesSet.add(vertex.id);
  };
  const processEdge = (edge: Edge, options: ProcessEdgeOptions) => {
    if (!options) {
      return;
    }

    // from is the vertex we came from
    // pathTree should represent the node in the DFS tree
    // when we process an edge u to v and u is not the direct parent of v then
    // we must be on a back edge which denotes a cycle
    if (options.pathTree[options.from].id !== edge.node.id) {
      hasCycle = true;
    }
  };
  for (let vertex of graphNodes) {
    if (hasCycle) {
      return true;
    }
    if (!visitedNodesSet.has(vertex.id)) {
      dfs(g, vertex.id, { processEdge, processVertexLate: processVertex });
    }
  }
  return hasCycle;
}
