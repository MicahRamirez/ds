import DoublyLinkedList from "../doubly-linked-list";

describe("DoublyLinkedList", () => {
  describe("initialization", () => {
    it("should have the expected initial state", () => {
      const ll = new DoublyLinkedList();

      expect(ll.size()).toBe(0);
    });
  });

  describe("iterability", () => {
    it("should not iterate once with only the sentinel node", () => {
      const ll = new DoublyLinkedList();
      let iterCount = 0;
      for (let i of ll) {
        iterCount += 1;
      }
      expect(iterCount).toBe(0);
    });

    it("should iterate once per element pushed", () => {
      const ll = new DoublyLinkedList();
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
      const ll = new DoublyLinkedList();
      ll.add(1);

      expect(ll.size()).toBe(1);
      expect(ll.getHead().value).toBe(1);
      expect(ll.getTail().value).toBe(1);
    });

    it("should add multiple values to the end of the list", () => {
      const ll = new DoublyLinkedList();
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

  describe.only("addAtIndex", () => {
    it("should throw a RangeError if adding at an index that is out of bounds", () => {
      const ll = new DoublyLinkedList();

      expect(() => ll.addAtIndex(1, "ay")).toThrowError(RangeError);
    });

    it("should not throw a range error when adding at the zero index of an empty ll", () => {
      const ll = new DoublyLinkedList();

      expect(() => ll.addAtIndex(0, "ay")).not.toThrowError(RangeError);
      expect(ll.size()).toBe(1);
    });

    it("should add at some middle index", () => {
      const ll = new DoublyLinkedList();
      ll.add("ay");
      ll.add("yo");
      ll.addAtIndex(1, "sup");

      expect(ll.size()).toBe(3);
      expect(ll.toArray()).toEqual(["ay", "sup", "yo"]);
    });
  });

  describe("addFirst", () => {
    it("should addFirst to an empty ll", () => {
      const ll = new DoublyLinkedList();
      ll.addFirst(1);

      expect(ll.getHead().value).toEqual(1);
      expect(ll.getHead().value).toEqual(ll.getTail().value);
    });

    it("should addFirst to a ll with one or more nodes and updates the head", () => {
      const ll = new DoublyLinkedList();
      ll.add(1);
      ll.addFirst(2);

      expect(ll.getHead().value).toEqual(2);
    });
  });

  describe("addLast", () => {
    it("should addLast to an empty ll", () => {
      const ll = new DoublyLinkedList();
      ll.addLast(1);

      expect(ll.size()).toBe(1);
      expect(ll.getHead().value).toBe(1);
      expect(ll.getTail().value).toBe(1);
    });

    it("should addLast to an array with one or more nodes and update the tail", () => {
      const ll = new DoublyLinkedList();
      ll.addLast(1);
      ll.addLast(2);

      expect(ll.size()).toBe(2);
      expect(ll.getTail().value).toBe(2);
    });
  });

  describe("removeIndex", () => {
    it("should remove the node at some internal index", () => {
      const ll = new DoublyLinkedList();
      ll.add(1);
      ll.add(2);
      ll.add(3);
      expect(ll.removeIndex(1)).toEqual(2);
      expect(ll.size()).toEqual(2);
    });

    it("should remove nodes correctly at terminal indexes", () => {
      const ll = new DoublyLinkedList();
      ll.add(1);
      ll.add(2);
      expect(ll.removeIndex(1)).toEqual(2);
      expect(ll.getTail().value).toEqual(1);
      expect(ll.size()).toEqual(1);

      expect(ll.removeIndex(0)).toEqual(1);
      expect(ll.size()).toEqual(0);
      expect(ll.getTail()).toEqual(ll.getHead());
    });
  });

  describe("removeValue", () => {
    it("should return true if the value was removed", () => {
      const ll = new DoublyLinkedList();
      ll.add(1);
      ll.add(2);

      expect(ll.removeValue(2)).toEqual(true);
      expect(ll.size()).toEqual(1);
      expect(ll.toArray()).toEqual([1]);
    });

    it("should only remove the first occurrence", () => {
      const ll = new DoublyLinkedList();
      ll.add(1);
      ll.add(1);

      expect(ll.removeValue(1)).toEqual(true);
      expect(ll.size()).toEqual(1);
      expect(ll.toArray()).toEqual([1]);
    });

    it("should return false if it cant find an occurrence to remove", () => {
      const ll = new DoublyLinkedList();
      ll.add(1);
      ll.add(1);

      expect(ll.removeValue(0)).toEqual(false);
      expect(ll.size()).toEqual(2);
      expect(ll.toArray()).toEqual([1, 1]);
    });

    it("should support value removal of complex types", () => {
      const ll = new DoublyLinkedList<{ userId: number }>((userA, userB) => {
        if (userA.userId === userB.userId) {
          return 0;
        } else if (userA.userId > userB.userId) {
          return 1;
        } else {
          return -1;
        }
      });
      ll.add({ userId: 100 });
      ll.add({ userId: 200 });

      expect(ll.removeValue({ userId: 200 }));
      expect(ll.size()).toEqual(1);
      expect(ll.toArray()).toEqual([{ userId: 100 }]);
    });
  });

  describe("toArray", () => {
    it.only("should transform the ll to an array", () => {
      const ll = new DoublyLinkedList();
      const numbers = [1, 2, 3];
      numbers.forEach((val) => ll.add(val));

      expect(ll.toArray()).toEqual(numbers);
    });
  });
});
