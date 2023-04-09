import Graph from "../../graph";

import { hasCycle } from "../cycle-detection";

function initGraph(
  g: Graph,
  vertices: Array<string>,
  edges: Array<[string, string]>,
) {
  vertices.forEach((vertex) => {
    g.addNode(vertex);
  });
  edges.forEach(([x, y]) => {
    g.addEdge(x, y);
  });
}

describe("cycle-detection", () => {
  it("should return true if there is a cycle", () => {
    const g = new Graph();

    const vertices = ["a", "b", "c", "d"];
    const edges: Array<[string, string]> = [
      ["a", "b"],
      ["b", "c"],
      ["c", "d"],
      ["d", "a"],
    ];
    initGraph(g, vertices, edges);
    expect(hasCycle(g)).toEqual(true);
  });
  it("should return false if there is no cycle", () => {
    const g = new Graph();

    const vertices = ["a", "b", "c", "d"];
    const edges: Array<[string, string]> = [
      ["a", "b"],
      ["b", "c"],
      ["c", "d"],
    ];
    initGraph(g, vertices, edges);
    expect(hasCycle(g)).toEqual(false);
  });

  it("should return false for an unconnected graph", () => {
    const g = new Graph();

    const vertices = ["a", "b", "c", "d"];
    const edges: Array<[string, string]> = [];
    initGraph(g, vertices, edges);
    expect(hasCycle(g)).toEqual(false);
  });

  it("should return true for a graph with a component that has a cycle", () => {
    const g = new Graph();

    const vertices = ["a", "b", "c", "d", "e"];
    const edges: Array<[string, string]> = [
      ["b", "c"],
      ["c", "d"],
      ["d", "b"],
    ];

    initGraph(g, vertices, edges);
    expect(hasCycle(g)).toEqual(true);
  });
});
