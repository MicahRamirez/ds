import Heap from "../heap";

describe("Heap", () => {
  describe("initialization", () => {
    it("should initialize with the expected size", () => {
      const heap = new Heap();

      expect(heap.size()).toEqual(0);
    });
  });

  describe("insertMany", () => {
    it("should insert many and get the same result as the sequential insertions", () => {
      const heap = new Heap();
      heap.insertMany(1, 2, 3, 0);
      const expectedResult = [0, 1, 2, 3];

      expectedResult.forEach((value) => {
        expect(value).toEqual(heap.extractMin());
      });
    });
  });

  describe("insert", () => {
    it("should insert items in the expected indices in order to preserve space with sparse input", () => {
      const heap = new Heap();
      heap.insert(1);
      heap.insert(2);
      heap.insert(3);
      heap.insert(0);
      expect(heap.peakContainer()).toEqual([0, 1, 3, 2]);
    });

    it("should support inserting complex types if given a comparator", () => {
      type UserWithPriority = { userPriority: number; id: number };
      const comparator = (userA: UserWithPriority, userB: UserWithPriority) => {
        const result = userA.userPriority - userB.userPriority;
        if (result === 0) {
          return 0;
        } else if (result > 0) {
          return 1;
        } else {
          return -1;
        }
      };
      const heap = new Heap(comparator);

      heap.insert({ userPriority: 5, id: 1 });
      heap.insert({ userPriority: 3, id: 1 });
      heap.insert({ userPriority: 2, id: 1 });
      heap.insert({ userPriority: 1, id: 1 });

      expect(heap.peakContainer()).toEqual([
        { userPriority: 1, id: 1 },
        { userPriority: 2, id: 1 },
        { userPriority: 3, id: 1 },
        { userPriority: 5, id: 1 },
      ]);
    });
  });

  describe("extractMin", () => {
    it("should throw an error extracting min from an empty heap", () => {
      const heap = new Heap();

      expect(() => heap.extractMin()).toThrow(Error);
    });

    it("should extract min and heapify correctly", () => {
      const heap = new Heap();
      heap.insert(1);
      heap.insert(2);
      heap.insert(3);
      heap.insert(0);

      expect(heap.peakContainer()).toEqual([0, 1, 3, 2]);
      const minValue = heap.extractMin();
      expect(minValue).toEqual(0);
      expect(heap.peakContainer()).toEqual([1, 2, 3]);
      const nextMin = heap.extractMin();
      expect(nextMin).toEqual(1);
      expect(heap.peakContainer()).toEqual([2, 3]);
    });

    it("should extractMin with the expected values for a set of numbers that strictly dominates", () => {
      const heap = new Heap();
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const reversedNumbers = [...numbers].reverse();
      reversedNumbers.forEach((number) => heap.insert(number));
      numbers.forEach((number) => {
        expect(heap.extractMin()).toEqual(number);
      });
    });

    it("should extractMin with the expected values for a set of numbers that dominates", () => {
      const heap = new Heap();
      const dominatingNumbers = [4, 4, 3, 3, 1, 1, 0, 0];

      dominatingNumbers.forEach((number) => {
        heap.insert(number);
      });

      const dominatingNumbersReversed = [...dominatingNumbers].reverse();
      dominatingNumbersReversed.forEach((number) => {
        expect(heap.extractMin()).toEqual(number);
      });
    });
  });
});
