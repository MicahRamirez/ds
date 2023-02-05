import Heap from "../heap";

describe("Heap", () => {
  describe("initialization", () => {
    it("stuff", () => {
      const heap = new Heap();
      heap.insert(1);
      heap.insert(2);
      heap.insert(3);
      heap.insert(0);
      expect(heap.peakContainer()).toEqual([0, 1, 3, 2]);
    });
  });
  describe("extractMin", () => {
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

    it("more tests", () => {
      const heap = new Heap();
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const reversedNumbers = [...numbers].reverse();
      reversedNumbers.forEach((number) => heap.insert(number));
      numbers.forEach((number) => {
        expect(heap.extractMin()).toEqual(number);
      });
    });
  });
});
