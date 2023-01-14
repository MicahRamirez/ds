/**
 * LIFO structure containing stack of T
 * NOTE:
 *  Pretending that the js array is a java like array so will not be leveraging known methods
 *  on the array
 */
class SimpleStack<T> {
  #container: Array<T>;
  #length: number;

  constructor() {
    this.#container = [];
    this.#length = 0;
  }

  empty(): boolean {
    return this.#length === 0;
  }

  peek(): T {
    /**
     * Potential return values in this case are null or undefined.
     * But how would you then distinguish between a stack full of undefined or null.
     */
    if (this.empty()) {
      throw new RangeError("Stack is empty.");
    }
    return this.#container[this.#length - 1];
  }

  pop(): T {
    const itemToReturn = this.#container[this.#length - 1];
    this.#container[this.#length - 1] = null;
    this.#length -= 1;
    return itemToReturn;
  }

  push(value: T) {
    this.#container[this.#length] = value;
    this.#length += 1;
  }

  /**
   * Returns the distance from the top of the stack
   * Topmost item on the stack is at distance 1
   * Bottommost item is at N
   * @param value
   */
  search(value: T) {}

  size(): number {
    return this.#length;
  }
}

export { SimpleStack };
