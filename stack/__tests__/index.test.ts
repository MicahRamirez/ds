import { SimpleStack as Stack } from "../index";

describe("SimpleStack", () => {
  describe("initialization", () => {
    it("should initialize without any arguments", () => {
      const stack = new Stack();

      expect(stack.empty()).toEqual(true);
    });
  });

  describe("peek", () => {
    it("should throw an error if the stack is empty and it is peeked", () => {
      const stack = new Stack();

      expect(() => stack.peek()).toThrowError(RangeError);
    });

    it("should peek at the top of the stack", () => {
      const stack = new Stack();

      stack.push(undefined);
      stack.push(null);
      expect(stack.peek()).toEqual(null);
    });
  });

  describe("push", () => {
    it("should add items to the stack", () => {
      const stack = new Stack();

      stack.push(undefined);
      stack.push(null);
      stack.push(1);

      expect(stack.size()).toEqual(3);
      expect(stack.peek()).toEqual(1);
    });
  });

  describe("pop", () => {
    it("should pop items off of the stack", () => {
      const stack = new Stack();

      const items = [1, 2, 3, 4, 5];
      items.forEach((val) => stack.push(val));

      let removedItems = [];
      while (!stack.empty()) {
        removedItems.push(stack.pop());
        expect(stack.size()).toEqual(items.length - removedItems.length);
      }

      expect(removedItems).toEqual(items.reverse());
    });
  });

  describe("search", () => {
    it("should return -1 when the stack is empty", () => {
      const stack = new Stack();

      expect(stack.search(2)).toEqual(-1);
    });
    it("should return -1 when the item is not in the stack", () => {
      const stack = new Stack();
      stack.push(1);

      expect(stack.search(2));
    });

    it("should return the distance from the top of the stack", () => {
      const stack = new Stack();
      stack.push(1);
      stack.push(2);

      expect(stack.search(1)).toEqual(2);
    });
  });
});
