// API inspired by
// https://github.com/anvaka/ngraph.graph

/**
 * Complete Undirected Simple
 * a  -   b
 *  \    /
 *    c
 *
 *  Node A: [NodeB (a, b), NodeC (a,c)]
 *  Node B: [NodeA (b, a), NodeC (b,c)]
 *  Node C: [NodeA (c, a), NodeB (c,b)]
 *  Space Complexity is  2|E|, so 2 * 3 = 6
 *
 *  deg(a) = 2 = edges.length
 *
 * Directed Simple
 *
 *  b <-  a
 *  a - > b
 *   ^   ^
 *  \ \  / /
 *  +     +
 *     c
 *
 * NOTES:
 *    Trying to determine if I can store edges in the same property between undirected and simple
 *  Analysis:
 *
 *  Node A: edges: [{NodeB, direction.out},{NodeC, direction.out} {NodeB, direction.in}, {NodeC, direction.in}]
 *  deg(a) = sum edges where direction.out + sum edges where direction.in = still edges.length
 *  Worst Case Runtime for Simple Complete Directed Graph
 *      Assume all in nodes come first then out nodes, then at least have to iterate V - 1 until
 *          we find outbound edges... NG
 *  Worst Case Storage for Simple Complete Directed Graph
 *  Node A: edges: [{NodeB, direction.out},{NodeC, direction.out} {NodeB, direction.in}, {NodeC, direction.in}]
 *  For each vertex |V|  * |V| - 1 * 2
 *                  3 * (2 * 2) = 12
 *  So here 3 * (3-1 * 2) 12 so basically V^2
 *  Conclusion:
 *    will split out edges
 */

enum Direction {
  in = "in",
  out = "out",
  undirected = "undirected",
}

export class Node {
  id: string;
  edges: Array<Edge> = [];
  weight: number;
  constructor(id: string) {
    this.id = id;
  }

  getEdge(id: string): Edge {
    const edgeNode = this.edges.find(({ node }) => node.id === id);
    return edgeNode ? edgeNode : null;
  }

  removeEdge(
    id: string,
    directionParam: Direction | undefined = Direction.undirected,
  ): boolean {
    const edge = this.edges.findIndex(
      ({ node, direction }) => direction === directionParam && node.id === id,
    );
    return edge === -1 ? false : this.edges.splice(edge, 1).length === 1;
  }

  addEdge(
    node: Node,
    { weight, direction }: Pick<Edge, "weight" | "direction"> = {
      weight: 0,
      direction: Direction.undirected,
    },
  ) {
    this.edges.push({ node, weight, direction });
  }

  listEdges(isDirected: boolean = false) {
    return isDirected
      ? this.edges.filter((edge) => edge.direction === Direction.out)
      : this.edges;
  }
}

/**
 * Can represent either
 * Represents edge {x,y} from the set of Undirected Edges in Graph G
 * Represents edge (x,y) from the set of Directed Edges in Graph G
 */
export interface Edge {
  direction: Direction;
  node: Node;
  weight: number;
}

interface GraphMethods {
  addNode: (nodeId: string) => void;
  /**
   * adds edge from nodeX -> nodeY
   * IF the graph is undirected this also adds edge nodeY -> nodeX
   */
  addEdge: (nodeIdX: string, nodeIdY: string) => void;
  /**
   * iterates through each node in the array
   */
  forEachNode: (node: Node) => void;
  /**
   * iterates through each edge in the array
   * IF the graph is undirected the edges (x,y) and (y,x) are deduped
   */
  forEachEdge: (edge: Edge) => void;
  /**
   * removes the node and incident edges
   */
  removeNode: (nodeId: string) => boolean;
  /**
   * removes the edge
   */
  removeEdge: (nodeIdX: string, nodeIdY: string) => boolean;
  /**
   * empties the graph
   */
  clear: () => void;
}

export default class Graph implements GraphMethods {
  /**
   * K is some unique identifier for the node
   * This will give us constant time access when accessing known nodes
   */
  nodeMap: Map<string, Node> = new Map();
  nVertices: number = 0;
  nEdges: number = 0;
  directed: boolean;
  constructor(isDirected: boolean = false) {
    this.directed = isDirected;
  }

  hasNode(nodeId: string) {
    return this.nodeMap.has(nodeId);
  }

  getNode(nodeId: string) {
    return this.nodeMap.get(nodeId);
  }

  nodesToArray() {
    const nodeArray: Array<Node> = [];
    for (const [, node] of this.nodeMap.entries()) {
      nodeArray.push(node);
    }
    return nodeArray;
  }

  addNode(nodeId: string) {
    if (this.hasNode(nodeId)) {
      throw new Error("Node Already Exists!");
    }
    this.nodeMap.set(nodeId, new Node(nodeId));
    this.nVertices += 1;
  }

  addEdge(nodeIdX: string, nodeIdY: string) {
    if (!this.nodeMap.has(nodeIdX) || !this.nodeMap.has(nodeIdY)) {
      throw new Error("Cannot add edges to vertices that DNE");
    }
    const nodeX = this.nodeMap.get(nodeIdX);
    const nodeY = this.nodeMap.get(nodeIdY);

    if (!this.directed) {
      // self loop {x,x}
      if (nodeX === nodeY) {
        nodeX.addEdge(nodeY);
      } else {
        // for now we dont need checks for existence on the edges we add as making a graph non simple is fine
        // TODO/QUESTION: Do we need to keep labels for edges? This would come into play when we are dealing
        // with non simple graphs. If I say remove (x,y) in a simple undirected graph does that mean I removal all
        // edges (x,y) or just one ? Not sure on the expected behavior...
        nodeX.addEdge(nodeY);
        nodeY.addEdge(nodeX);
      }

      // we add two edges but in an undirected graph x,y is the same as y,x because it is set like {x,y} <=> {y,x}
    } else {
      nodeX.addEdge(nodeY, { direction: Direction.out, weight: 0 });
      nodeY.addEdge(nodeX, { direction: Direction.in, weight: 0 });
    }
    this.nEdges += 1;
  }
  isDirected() {
    return this.directed;
  }

  forEachNode: (Node) => void;
  forEachEdge: (edge: Edge) => void;
  /**
   * thisVertex.e * otherVertex.e
   * for every edge in nodeId edges find this node in their adjacency list and remove
   * When graph is simple: O(v^2)
   * When graph is non simple: O(v * max(k.edges.length)) where k is some vertex
   */
  removeNode(nodeId: string): boolean {
    if (!this.nodeMap.has(nodeId)) {
      return false;
    }
    const nodeToRemove = this.nodeMap.get(nodeId);
    let edgesRemoved = 0;
    for (const { node: otherNode } of nodeToRemove.listEdges()) {
      // O(V^(loops)) if graph is complete and each connection has self loops
      // linear for simple graphs but non simple would be NG
      let hasEdgesToRemove = otherNode.removeEdge(nodeToRemove.id);
      while (hasEdgesToRemove) {
        hasEdgesToRemove = otherNode.removeEdge(nodeToRemove.id);
      }
      edgesRemoved += 1;
    }
    if (edgesRemoved > 0) {
      this.nEdges -= edgesRemoved;
    }
    this.nVertices -= 1;
    return true;
  }

  removeEdge(nodeIdX: string, nodeIdY: string) {
    const nodeX = this.nodeMap.get(nodeIdX);
    const nodeY = this.nodeMap.get(nodeIdY);
    if (!nodeX || !nodeY) {
      return false;
    }

    const xDirection = this.directed ? Direction.out : undefined;
    const yDirection = this.directed ? Direction.in : undefined;
    const isEdgeYRemoved = nodeX.removeEdge(nodeY.id, xDirection);
    const isEdgeXRemoved = nodeY.removeEdge(nodeX.id, yDirection);

    if (isEdgeYRemoved && isEdgeXRemoved) {
      this.nEdges -= 1;
      return true;
    } else if (!(isEdgeYRemoved && isEdgeXRemoved)) {
      return false;
    } else {
      throw new Error("Edges either need to both exist or not exist.");
    }
  }

  clear() {
    this.nodeMap.clear();
    this.nVertices = 0;
    this.nEdges = 0;
  }
  [Symbol.iterator]() {
    return this.nodeMap.values();
  }
}
