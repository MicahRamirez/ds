import Graph from "../../graph";
import topologicalSort from "../topological-sort";

describe("dfs algos", () => {
  describe("dfs", () => {
    it("should return the expected path", () => {
      const g = new Graph(true);

      const vertices = ["a", "b", "c"];
      vertices.forEach((vertexId) => {
        g.addNode(vertexId);
      });
      const edges = [
        ["a", "b"],
        ["b", "c"],
      ];
      edges.forEach(([x, y]) => {
        g.addEdge(x, y);
      });
      expect(topologicalSort(g)).toEqual(["a", "b", "c"]);
    });

    it("should throw if there is a cycle", () => {
      const g = new Graph(true);

      const vertices = ["a", "b", "c"];
      vertices.forEach((vertexId) => {
        g.addNode(vertexId);
      });
      const edges = [
        ["a", "b"],
        ["b", "c"],
        ["c", "a"],
      ];
      edges.forEach(([x, y]) => {
        g.addEdge(x, y);
      });
      expect(() => topologicalSort(g)).toThrow();
    });
    it("should handle nodes u,z that are not connected but are dependencies of v for (u,v) and (z,v)", () => {
      const g = new Graph(true);

      const vertices = ["5", "7", "11"];
      vertices.forEach((vertexId) => {
        g.addNode(vertexId);
      });
      const edges = [
        ["5", "7"],
        ["7", "11"],
      ];
      edges.forEach(([x, y]) => {
        g.addEdge(x, y);
      });
      expect(topologicalSort(g)).toEqual(["5", "7", "11"]);
    });
  });
});
