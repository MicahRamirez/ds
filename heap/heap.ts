import type { Comparator } from "../common";

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
 * TODO: add comparator support for non numerical types
 */
class Heap<T> {
  #container: Array<T>;
  #length = -1;
  #comparator: Comparator<T>;

  constructor(comparator?: Comparator<T>) {
    this.#container = [];
    this.#comparator = comparator;
  }

  #isLessThanOrEqualTo(value, otherValue) {
    if (this.#comparator) {
      return this.#comparator(value, otherValue) === -1;
    }
    return value <= otherValue;
  }

  #rootValue() {
    return null;
  }
  #isRoot(value: T | null) {
    return value === this.#rootValue();
  }

  /**
   * From an index get the parent
   *
   * EX:
   * arr [0, 1, 2, 3, 4]
   *  0  1  2  3  4
   * #parent(4) => floor(4 - 1) => 1 =>  arr[1] => 1
   *
   *       0
   *     /   \
   *   1      2
   *  / \    / \
   * 3   4
   *
   * @param index - current node index
   * @returns {Number}
   */
  #parent(index: number) {
    if (index === 0) {
      return this.#rootValue();
    }
    return Math.floor((index - 1) / 2);
  }

  /**
   * Get the left most child
   *
   * EX:
   * arr [0, 1, 2, 3, 4]
   *  0  1  2  3  4
   * #child(0) => 2 * (0 + 1) - 1 => 2 * 1 - 1 => arr[1] => 1
   *
   *       0
   *     /   \
   *   1      2
   *  / \    / \
   * 3   4
   *
   * @param index - current node index
   * @returns {Number}
   */
  #child(index: number) {
    const zeroBasedOffset = 1;
    const leftMostChildOffset = -1;
    return 2 * (index + zeroBasedOffset) + leftMostChildOffset;
  }

  /**
   * Heapify operation
   * Ensures that each node dominates its children
   * If the domination relationship (parent.value <= children[0] && parent.value <= children[1])
   * is broken then the parent must be swapped with the child that breaks the relationship
   * we keep swapping via recursion until there are no more children
   *
   * when swapping down the tree we heapify on the subtree that dominates (most min) between the two
   * children. This ensures that any heapify op done in that subtree preserves the domination relation
   * at the the previous level
   *
   * @param index - current node's index to heapify
   * @returns {void}
   */
  #heapify(index: number) {
    const childIndex = this.#child(index);
    // base case 1: no more children, nothing to swap with. must be dominated by parent
    if (childIndex > this.#length) {
      return;
    }
    const newRoot = this.#container[index];
    const leftChild = this.#container[childIndex];
    const rightChild = this.#container[childIndex + 1];
    // base case 2: when the current root is less than its children the heapify op is over
    // if we assume that all previous subtrees maintained the dominates relationship then if fixed
    // at some level the lower subtrees must resolved as well.
    if (
      this.#isLessThanOrEqualTo(newRoot, leftChild) &&
      this.#isLessThanOrEqualTo(newRoot, rightChild)
    ) {
      return;
      // choosing the subtree that dominates the most
    } else if (
      this.#isLessThanOrEqualTo(leftChild, newRoot) &&
      this.#isLessThanOrEqualTo(leftChild, rightChild)
    ) {
      this.#container[index] = leftChild;
      this.#container[childIndex] = newRoot;
      this.#heapify(childIndex);
      // choosing the subtree that dominates the most
    } else if (
      this.#isLessThanOrEqualTo(rightChild, newRoot) &&
      this.#isLessThanOrEqualTo(rightChild, leftChild)
    ) {
      this.#container[index] = rightChild;
      this.#container[childIndex + 1] = newRoot;
      this.#heapify(childIndex + 1);
    }
  }

  /**
   * Simply removes the root item which is the min value.
   * @returns {T}
   */
  extractMin(): T {
    if (this.isEmpty()) {
      throw new Error("Heap is empty");
    }
    const minValue = this.#container[0];
    this.#container[0] = this.#container[this.#length];
    this.#length -= 1;
    this.#heapify(0);
    return minValue;
  }

  /**
   * Used to restore dominates relationship upwards. Recursively swaps a child with parent
   * until the parent value dominates the child value
   *
   * @param index
   * @returns {void}
   */
  #bubbleUp(index: number) {
    const child = this.#container[index];
    const parentIndex = this.#parent(index);
    if (parentIndex === null) {
      return;
    }
    const parent = this.#container[parentIndex];
    if (this.#isLessThanOrEqualTo(parent, child)) {
      return;
    }
    this.#container[index] = parent;
    this.#container[parentIndex] = child;
    this.#bubbleUp(parentIndex);
  }

  /**
   * Inserts a new value at the deepest leftmost part of the heap
   * Bubbles up if the insertion breaks the dominates relation
   * @param value
   * @returns {void}
   */
  insert(value: T) {
    const insertionIndex = this.#length + 1;
    this.#container[insertionIndex] = value;
    this.#length += 1;
    const parentIndex = this.#parent(insertionIndex);
    const parent = this.#container[parentIndex];
    if (Boolean(parent) && !this.#isLessThanOrEqualTo(parent, value)) {
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

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.#length + 1;
  }
}

export default Heap;
