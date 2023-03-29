import Graph from "../graph";

describe("Graph", () => {
  describe("constructor", () => {
    it("should initialize", () => {
      const g = new Graph();

      expect(g).toBeDefined();
      expect(g.nVertices).toEqual(0);
      expect(g.nVertices).toEqual(0);
      expect(g.directed).toBe(false);
    });
  });

  describe("addNode", () => {
    it("should add a node", () => {
      const g = new Graph();

      g.addNode("newNode!");
      expect(g.nVertices).toEqual(1);
    });

    it("should throw an error if adding a node that already exists", () => {
      const g = new Graph();

      const nodeToAddName = "newNode!";
      g.addNode(nodeToAddName);
      expect(g.nVertices).toEqual(1);

      expect(() => g.addNode(nodeToAddName)).toThrow();
    });
  });

  describe("nodesToArray", () => {
    it("should return an array of all the nodes", () => {
      const g = new Graph();

      expect(g.nodesToArray()).toEqual([]);
    });

    it("should return an array with added nodes", () => {
      const g = new Graph();

      const nodesToAdd = ["newNode", "newNode2"];
      nodesToAdd.forEach((nodeId) => g.addNode(nodeId));

      const nodeIdArray = g.nodesToArray().map((node) => node.id);
      expect(nodeIdArray).toEqual(expect.arrayContaining(nodesToAdd));
    });
  });

  describe("addEdge", () => {
    it("Undirected: should throw when adding an edge to a vertex that does not exist", () => {
      const g = new Graph();

      expect(() => g.addEdge("dne1", "dne2")).toThrow();
    });

    it("Undirected: should add an edge to both adjacency lists when adding an edge between two lists", () => {
      const g = new Graph();

      const nodes = ["x", "y"];
      nodes.forEach((node) => g.addNode(node));

      g.addEdge(nodes[0], nodes[1]);

      expect(g.nEdges).toEqual(1);
      const nodeList = g.nodesToArray();
      nodeList.forEach((node) => {
        expect(node.edges).toHaveLength(1);
        expect(node.edges[0].id).not.toEqual(node.id);
      });
    });

    it("Undirected: should allow non simple graphs", () => {
      const g = new Graph();

      const nodes = ["x", "y"];
      nodes.forEach((node) => g.addNode(node));

      g.addEdge(nodes[0], nodes[1]);
      g.addEdge(nodes[1], nodes[0]);

      expect(g.nEdges).toEqual(2);
      const nodeList = g.nodesToArray();
      nodeList.forEach((node) => {
        expect(node.edges).toHaveLength(2);
        expect(node.edges[0].id).not.toEqual(node.id);
        expect(node.edges[1].id).toEqual(node.edges[0].id);
      });
    });

    it("Undirected: should allow self loops", () => {
      const g = new Graph();

      const nodes = ["x"];
      nodes.forEach((node) => g.addNode(node));

      g.addEdge(nodes[0], nodes[0]);
      expect(g.nEdges).toEqual(1);
      const nodeList = g.nodesToArray();
      expect(nodeList[0].edges).toHaveLength(1);
      expect(nodeList[0].edges[0].id).toEqual("x");
    });
  });

  describe("removeNode", () => {
    it("should return false if the node does not exist in the graph", () => {
      const g = new Graph();

      expect(g.removeNode("yo")).toEqual(false);
    });

    it("Undirected: should remove a node and its incident edges", () => {
      const g = new Graph();

      g.addNode("yo");
      g.addNode("brother");
      g.addEdge("yo", "brother");

      g.removeNode("yo");
      expect(g.nEdges).toEqual(0);
      expect(g.nVertices).toEqual(1);
    });

    it("Undirected: should remove loops if they exist in incident edges", () => {
      const g = new Graph();

      g.addNode("yo");
      g.addNode("brother");
      g.addEdge("yo", "brother");
      g.addEdge("yo", "brother");
      expect(g.nVertices).toEqual(2);
      g.removeNode("yo");
      expect(g.nVertices).toEqual(1);
      expect(g.nEdges).toEqual(0);
    });
  });

  describe("removeEdge", () => {
    it("should return true when removing an existing edge between a nodeX and nodeY", () => {
      const g = new Graph();

      const nodeX = "yo";
      const nodeY = "brother";
      g.addNode(nodeX);
      g.addNode(nodeY);
      g.addEdge(nodeX, nodeY);
      expect(g.nEdges).toEqual(1);

      expect(g.removeEdge(nodeX, nodeY)).toEqual(true);
      expect(g.nEdges).toEqual(0);
      expect(g.removeEdge(nodeX, nodeY)).toEqual(false);
    });

    it("should return false when removing an edge that does not exist", () => {
      const g = new Graph();

      expect(g.removeEdge("random", "edge")).toEqual(false);
    });
  });
});
