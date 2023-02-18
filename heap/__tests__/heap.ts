import Heap from "../heap";

describe("Heap", () => {
  describe("initialization", () => {
    it("should initialize with the expected size", () => {
      const heap = new Heap();

      expect(heap.size()).toEqual(0);
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
