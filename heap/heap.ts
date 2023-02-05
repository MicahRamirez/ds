/**
 * Reference Skiena: Alg Design Manual
 *
 * root at a[0]
 *
 * 2^l keys of the lth level of a complete binary tree from left to right in positions
 * 2^(l-1) to 2^l - 1
 *
 *  0  1  2
 * [0, 1, 2]
 * Tree
 *      0
 *    1  2
 *
 * Storage occurs ltr on positions 2^(l-1) to 2^l - 1
 *
 * extractMin
 * #initialize
 */
class Heap<T> {
  #container: Array<T>;
  #length = -1;
  constructor() {
    this.#container = [];
  }

  #rootValue() {
    return null;
  }
  #isRoot(value: T | null) {
    return value === this.#rootValue();
  }

  #parent(level: number) {
    if (level === 0) {
      return this.#rootValue();
    }
    return Math.floor(level / 2);
  }

  #child(level: number) {
    return 2 * (level + 1) - 1;
  }

  #heapify(index: number) {
    const childIndex = this.#child(index);
    if (childIndex > this.#length) {
      return;
    }
    const newRoot = this.#container[index];
    const leftChild = this.#container[childIndex];
    const rightChild = this.#container[childIndex + 1];
    if (newRoot < leftChild && newRoot < rightChild) {
      return;
    } else if (leftChild < newRoot && leftChild < rightChild) {
      this.#container[index] = leftChild;
      this.#container[childIndex] = newRoot;
      this.#heapify(childIndex);
    } else if (rightChild < newRoot && rightChild < leftChild) {
      if (newRoot === 9) {
        debugger;
      }
      this.#container[index] = rightChild;
      this.#container[childIndex + 1] = newRoot;
      this.#heapify(childIndex + 1);
    }
  }

  extractMin(): T {
    const minValue = this.#container[0];
    this.#container[0] = this.#container[this.#length];
    this.#length -= 1;
    this.#heapify(0);
    return minValue;
  }

  #bubbleUp(index: number) {
    const swp = this.#container[index];
    const parentIndex = this.#parent(index);
    if (parentIndex === null) {
      return;
    }
    const parentValue = this.#container[parentIndex];
    if (parentValue > swp) {
      this.#container[index] = parentValue;
      this.#container[parentIndex] = swp;
      this.#bubbleUp(parentIndex);
    }
  }

  insert(value: T) {
    const insertionIndex = this.#length + 1;
    this.#container[insertionIndex] = value;
    this.#length += 1;
    const parentIndex = this.#parent(insertionIndex);
    const parentValue = this.#container[parentIndex];
    if (this.#isRoot(parentValue)) {
      return true;
    }
    if (parentValue > value) {
      // time to get bubbly
      this.#bubbleUp(insertionIndex);
    }
  }
  peakContainer() {
    const container = [];
    for (let i = 0; i <= this.#length; i++) {
      container.push(this.#container[i]);
    }
    return container;
  }

  size() {
    return this.#length;
  }
}

export default Heap;
