import LinkedList from "../index";

describe("LinkedList", () => {
  describe("initialization", () => {
    it("should have the expected initial state", () => {
      const ll = new LinkedList();

      expect(ll.size()).toBe(0);
      expect(ll.head).toBe(null);
      expect(ll.tail).toBe(null);
    });
  });
});
