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
});
