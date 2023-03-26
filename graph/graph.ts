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

interface Node {
  id: string;
  edges: Array<Node>;
  inEdges: Array<Node>;
  outEdges: Array<Node>;
}

/**
 * Can represent either
 * Represents edge {x,y} from the set of Undirected Edges in Graph G
 * Represents edge (x,y) from the set of Directed Edges in Graph G
 */
interface Edge {
  direction: Direction;
  nodeX: Node;
  nodeY: Node;
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

class Graph implements GraphMethods {
  /**
   * K is some unique identifier for the node
   * This will give us constant time access when accessing known nodes
   */
  nodeMap: Map<string, Node>;
  nVertices: number = 0;
  nEdges: number = 0;
  directed: boolean = false;

  constructor(isDirected?: boolean) {
    this.directed = isDirected;
  }
  addNode: (nodeId: string) => void;
  addEdge: (nodeIdX: string, nodeIdY: string) => void;
  forEachNode: (Node) => void;
  forEachEdge: (edge: Edge) => void;
  removeNode: (nodeId: string) => boolean;
  removeEdge: (nodeIdX: string, nodeIdY: string) => boolean;
  clear: () => void;
}
