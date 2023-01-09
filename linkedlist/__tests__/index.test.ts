import LinkedList from "../index";

describe("LinkedList", () => {
  describe("initialization", () => {
    it("should have the expected initial state", () => {
      const ll = new LinkedList();

      expect(ll.size()).toBe(0);
      expect(ll.getHead().value).toBe(null);
      expect(ll.getTail().value).toBe(null);
    });
  });

  describe("iterability", () => {
    it("should not iterate once with only the sentinel node", () => {
      const ll = new LinkedList();
      let iterCount = 0;
      for (let i of ll) {
        iterCount += 1;
      }
      expect(iterCount).toBe(0);
    });

    it("should iterate once per element pushed", () => {
      const ll = new LinkedList();
      let iterCount = 0;

      ll.add(1);
      ll.add(2);
      for (let _i of ll) {
        iterCount += 1;
      }
      expect(iterCount).toBe(2);
    });
  });

  describe("add", () => {
    it("should add a value to the end of the list", () => {
      const ll = new LinkedList();
      ll.add(1);

      expect(ll.size()).toBe(1);
      expect(ll.getHead().next.value).toBe(1);
      expect(ll.getTail().value).toBe(1);
    });

    it("should add multiple values to the end of the list", () => {
      const ll = new LinkedList();
      ll.add(1);
      ll.add(2);
      ll.add(3);

      expect(ll.size()).toBe(3);
      let index = 0;
      const head = ll.getHead();
    });
  });

  describe("addAtIndex", () => {});
});
