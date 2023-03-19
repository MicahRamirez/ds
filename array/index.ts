enum SortDirection {
  ASC,
  DESC,
}

/**
 * NONSPARSE!
 */
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
   * @param index negative index
   * @returns positive index
   */
  private convertNegativeToPositiveIndex(index: number) {
    const positiveIndex = this.size + index;
    return index < 0 ? positiveIndex : index;
  }

  private sanitizeIndexToInteger(num: number) {
    return Math.trunc(num);
  }

  private sanitizeIndexesToInteger(...indexes: Array<number>) {
    return indexes.map((index) => this.sanitizeIndexToInteger(index));
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
    const i = this.sanitizeIndexToInteger(index);
    const normalizedIndex = i < 0 ? this.convertNegativeToPositiveIndex(i) : i;
    if (normalizedIndex >= this.size) {
      return undefined;
    }

    return this.container[normalizedIndex];
  }

  /**
   * Arrays and/or values to concatenate into a new array.
   * If all valueN parameters are omitted, concat returns a shallow copy of the existing array on which it is called
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
  copyWithin(
    targetIndexParam: number,
    startParam = 0,
    endParam = this.length - 1,
  ) {
    // TODO: both index sanitization and conversion should be encapsulated better
    const integerIndexes = this.sanitizeIndexesToInteger(
      targetIndexParam,
      startParam,
      endParam,
    );
    const [targetIndex, start, end] = integerIndexes.map((index) =>
      this.convertNegativeToPositiveIndex(index),
    );

    let sequenceStart = targetIndex;
    for (let i = start; i < end; i++) {
      this.container[sequenceStart] = this.container[i];
      sequenceStart += 1;
    }
  }

  /**
   * Array Iterator
   * iterable iterator object that yields the value of each index in the array.
   */
  entries(): IterableIterator<[number, T]> {
    let index = 0;
    const container = this.container;
    const iterator = {
      next() {
        const iteratorResult: { done: boolean; value: [number, T] } = {
          done: index === container.length,
          value: [index, container[index]],
        };
        index += 1;
        return iteratorResult;
      },
    };
    return {
      ...iterator,
      [Symbol.iterator](): IterableIterator<[number, T]> {
        return this;
      },
    };
  }

  every(
    callback: (value: T, index: number, array: ArrayList<T>) => boolean,
  ): boolean {
    const length = this.length;
    for (let i = 0; i < length; i++) {
      const callbackResult = callback(this.container[i], i, this);
      if (!callbackResult) {
        return false;
      }
    }
    return true;
  }

  /**
   * fill(value)
   * fill(value, start)
   * fill(value, start, end)
   * @returns {this}
   */
  fill(value: T, start = 0, end = this.length - 1): this {
    for (let i = start; i < end; i++) {
      this.container[i] = value;
    }
    return this;
  }

  /**
   * filter(element, index, array)
   */
  filter(
    callbackFunction: (element: T, index: number, arrayList: this) => boolean,
  ) {
    const thisArray = this;
    const thisLength = thisArray.length;
    const nextArrayList = new ArrayList(this.length);
    for (let i = 0; i < thisLength; i++) {
      if (callbackFunction(this.container[i], i, this)) {
        nextArrayList.push(this.container[i]);
      }
    }
    return nextArrayList;
  }

  get(index: number) {
    this._checkIndexValidity(index);
    return this.container[index];
  }

  #mergeSortComparison(a: any, b: any, direction: SortDirection) {
    if (a === b) {
      return 0;
    } else if (a - b < 0) {
      return direction === SortDirection.ASC ? 1 : -1;
    } else {
      return direction === SortDirection.ASC ? -1 : 1;
    }
  }

  #mergeSortHelper(
    startIndex: number,
    endIndex: number,
    direction: SortDirection,
  ): Array<T> {
    if (endIndex - startIndex === 0) {
      return [this.container[startIndex]];
    }
    const middle = Math.floor((endIndex + startIndex) / 2);
    const bufferOne = this.#mergeSortHelper(startIndex, middle, direction);
    const bufferTwo = this.#mergeSortHelper(middle + 1, endIndex, direction);
    const newBuffer = [];
    let bufferOneIndex = 0;
    let bufferTwoIndex = 0;
    while (
      bufferOneIndex < bufferOne.length &&
      bufferTwoIndex < bufferTwo.length
    ) {
      const bufferOneElem = bufferOne[bufferOneIndex];
      const bufferTwoElem = bufferTwo[bufferTwoIndex];
      if (
        this.#mergeSortComparison(bufferOneElem, bufferTwoElem, direction) === 0
      ) {
        newBuffer.push(bufferOneElem);
        newBuffer.push(bufferTwoElem);
        bufferOneIndex += 1;
        bufferTwoIndex += 1;
      } else if (
        this.#mergeSortComparison(bufferOneElem, bufferTwoElem, direction) === 1
      ) {
        newBuffer.push(bufferOneElem);
        bufferOneIndex += 1;
      } else {
        newBuffer.push(bufferTwoElem);
        bufferTwoIndex += 1;
      }
    }

    while (bufferOneIndex < bufferOne.length) {
      newBuffer.push(bufferOne[bufferOneIndex]);
      bufferOneIndex += 1;
    }

    while (bufferTwoIndex < bufferTwo.length) {
      newBuffer.push(bufferTwo[bufferTwoIndex]);
      bufferTwoIndex += 1;
    }

    return newBuffer;
  }

  mergeSort(direction: SortDirection = SortDirection.ASC) {
    return this.#mergeSortHelper(0, this.length - 1, direction);
  }

  set(index: number, value: T) {
    this._checkIndexValidity(index);
    this.container[index] = value;
  }

  push(...values: T[]) {
    const itemsToPush = values.length;
    let pushIndex = 0;
    while (pushIndex < itemsToPush) {
      if (this.capacity === 0 || this.size === this.capacity) {
        const nextCapacity = this.capacity === 0 ? 1 : this.capacity * 2;
        this._resize(nextCapacity);
      }
      this.container[this.size] = values[pushIndex];
      pushIndex += 1;
      this.size += 1;
    }
  }

  _capacity() {
    return this.capacity;
  }

  get length() {
    return this.size;
  }

  toNativeArray() {
    return this.container;
  }
}

export default ArrayList;
