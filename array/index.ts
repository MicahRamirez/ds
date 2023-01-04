class ArrayList<T> implements Iterable<T> {
  private capacity: number;
  private size: number;
  private container: Array<T>;

  constructor(capacity = 10) {
    if (capacity < 0) {
      throw new Error("Capacity must be a nonnegative integer.");
    }
    this.capacity = capacity;
    this.size = 0;
    this.container = this._initializeContainer(capacity);
  }
  /***
   * Implementation of the Iterator Protocol
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
   *
   * @returns {Iterator<T, any, undefined>}
   */
  [Symbol.iterator](): Iterator<T, any, undefined> {
    let index = 0;
    let iterableContainer = this.container;
    return {
      next() {
        const iteratorResult = {
          done: index === iterableContainer.length,
          value: iterableContainer[index],
        };
        index += 1;
        return iteratorResult;
      },
    };
  }

  private _initializeContainer<T>(capacity: number): Array<T> {
    const container: Array<T> = Array(capacity);
    return container;
  }

  private _checkIndexValidity(index: number) {
    if (index < 0) {
      throw new Error("Illegal Access Exception.");
    }
    if (index >= this.size) {
      throw new Error("Out of Bounds Exception.");
    }
  }

  /**
   * Invariant
   * size stays the same.
   * Capacity increases
   *
   * Notes regarding resize operation
   * The operation is amortized O(1)
   * Typically insertions to the array will not require any resize operation.
   * Imagine cost of 1 given to elems in the array and 0 cost to empty slots
   * [1, 1, 0, 0]
   * add(value) // cost is zero because there is an empty slot
   * add(value) // cost is zero because there is an empty slot
   * add(value) // cost is O(N), 4 because we have to copy these 4 elements into a new array
   */
  private _resize(capacity: number) {
    const nextContainer: Array<T> = Array(capacity);
    for (let i = 0; i < this.container.length; i++) {
      nextContainer[i] = this.container[i];
    }
    this.container = nextContainer;
    this.capacity = capacity;
  }

  /**
   *
   * @param index negative index
   * @returns positive index
   */
  private convertNegativeToPositiveIndex(index: number) {
    if (index > 0) {
      throw RangeError("Index must be negative");
    }
    const positiveIndex = this.size + index;
    return positiveIndex;
  }

  /**
   * takes a number and returns the item at that index, allowing for positive and negative integers.
   * Negative integers count back from the last item in the array.
   * NOTE: node 16 behavior of [].at(-1) is equal to undefined rather than an error
   *
   * @returns {T | undefined} element in the array matching the given index.
   * Always returns undefined if index < -array.length or index >= array.length without attempting to access the corresponding property.
   */
  at(index: number) {
    const i = Math.trunc(index);
    const normalizedIndex = i < 0 ? this.convertNegativeToPositiveIndex(i) : i;
    if (normalizedIndex >= this.size) {
      return undefined;
    }

    return this.container[normalizedIndex];
  }

  /**
   * merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
   */
  concat(...arrays: ArrayList<T>[]): ArrayList<T> {
    const nextArrayList = new ArrayList<T>();
    for (let i = 0; i < this.size; i++) {
      nextArrayList.push(this.container[i]);
    }
    for (let i = 0; i < arrays.length; i++) {
      for (let j = 0; j < arrays[i].length; j++) {
        nextArrayList.push(arrays[i].get(j));
      }
    }
    return nextArrayList;
  }

  /**
   * method shallow copies part of an array to another location in the same array and returns it without modifying its length.
   */
  copyWithin() {}

  get(index: number) {
    this._checkIndexValidity(index);
    return this.container[index];
  }

  set(index: number, value: T) {
    this._checkIndexValidity(index);
    this.container[index] = value;
  }

  push(value: T) {
    if (this.capacity === 0 || this.size === this.capacity) {
      const nextCapacity = this.capacity === 0 ? 1 : this.capacity * 2;
      this._resize(nextCapacity);
    }
    this.container[this.size] = value;
    this.size += 1;
  }

  _capacity() {
    return this.capacity;
  }

  get length() {
    return this.size;
  }
}

export default ArrayList;
