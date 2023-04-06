import Graph from "../../graph";
import { dfs } from "../dfs";

describe("dfs algos", () => {
  describe("dfs", () => {
    it("should return the expected path", () => {
      const g = new Graph();

      const vertices = ["a", "b", "c", "d"];
      vertices.forEach((vertexId) => {
        g.addNode(vertexId);
      });
      const edges = [
        ["a", "c"],
        ["a", "b"],
        ["c", "b"],
        ["b", "d"],
      ];
      edges.forEach(([x, y]) => {
        g.addEdge(x, y);
      });
    });
  });
});
