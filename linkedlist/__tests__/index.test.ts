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
      expect(ll.getHead().value).toBe(1);
      expect(ll.getTail().value).toBe(1);
    });

    it("should add multiple values to the end of the list", () => {
      const ll = new LinkedList();
      const valuesToAdd = [1, 2, 3];
      valuesToAdd.forEach((val) => ll.add(val));

      expect(ll.size()).toBe(3);
      const llIterator = ll.iterator();
      let it = llIterator.next();
      let index = 0;
      while (!it.done) {
        expect(it.value).toBe(valuesToAdd[index]);
        index += 1;
        it = llIterator.next();
      }
      // terminates on 3
      expect(index).toBe(3);
    });
  });

  describe("addAtIndex", () => {
    it("should throw a RangeError if adding at an index that is out of bounds", () => {
      const ll = new LinkedList();

      expect(() => ll.addAtIndex(1, "ay")).toThrowError(RangeError);
    });

    it("should not throw a range error when adding at the zero index of an empty ll", () => {
      const ll = new LinkedList();

      expect(() => ll.addAtIndex(0, "ay")).not.toThrowError(RangeError);
      expect(ll.size()).toBe(1);
      expect(ll.getTail().value).toEqual("ay");
    });

    it("should add at some middle index", () => {
      const ll = new LinkedList();
      ll.add("ay");
      ll.add("yo");
      ll.addAtIndex(1, "sup");

      expect(ll.size()).toBe(3);
      expect(ll.toArray()).toEqual(["ay", "sup", "yo"]);
    });
  });

  describe("addFirst", () => {
    it("should addFirst to an empty ll", () => {
      const ll = new LinkedList();
      ll.addFirst(1);

      expect(ll.getHead().value).toEqual(1);
      expect(ll.getHead().value).toEqual(ll.getTail().value);
    });

    it("should addFirst to a ll with one or more nodes and updates the head", () => {
      const ll = new LinkedList();
      ll.add(1);
      ll.addFirst(2);

      expect(ll.getHead().value).toEqual(2);
    });
  });

  describe("addLast", () => {
    it("should addLast to an empty ll", () => {
      const ll = new LinkedList();
      ll.addLast(1);

      expect(ll.size()).toBe(1);
      expect(ll.getHead().value).toBe(1);
      expect(ll.getTail().value).toBe(1);
    });

    it("should addLast to an array with one or more nodes and update the tail", () => {
      const ll = new LinkedList();
      ll.addLast(1);
      ll.addLast(2);

      expect(ll.size()).toBe(2);
      expect(ll.getTail().value).toBe(2);
    });
  });

  describe("toArray", () => {
    it("should transform the ll to an array", () => {
      const ll = new LinkedList();
      const numbers = [1, 2, 3];
      numbers.forEach((val) => ll.add(val));

      expect(ll.toArray()).toEqual(numbers);
    });
  });
});
