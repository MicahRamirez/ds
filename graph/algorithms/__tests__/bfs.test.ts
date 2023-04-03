import Graph from "../../graph";
import { shortestUnweightedPath } from "../bfs";

describe("bfs algos", () => {
  describe("shortest unweighted path", () => {
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

      const path = shortestUnweightedPath(g, "a", "d");
      expect(path).toEqual("abd");
    });
  });
});
