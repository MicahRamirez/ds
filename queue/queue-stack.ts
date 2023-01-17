import type { QueueOperations } from "./index";

/**
 * implement queue with a stack
 * amortized dequeue operation O(1)
 * Reasoning:
 * each push operation adds 1 to the enqueue container O(1) and adds 1 to the cost of a dequeue operation IFF dequeue container
 * is empty
 * o.w. the dequeueContainer is not empty and each element dequeued costs O(1) until the transfer operation is required
 *
 * dequeue operation costs as follows:
 *  IF dequeue container is empty the the cost is the length enqueue container O(N)
 *  IF dequeue container is NOT empty, then the cost is O(1)
 */

export default class QueueStack<T> implements QueueOperations<T> {
  #enqueueContainer: Array<T>;
  #dequeueContainer: Array<T>;
  #length: number = 0;
  constructor() {
    this.#dequeueContainer = [];
    this.#enqueueContainer = [];
  }

  peek(): T {
    if (this.#dequeueContainer.length === 0) {
      return this.#enqueueContainer[0];
    }
    return this.#dequeueContainer[0];
  }

  enqueue(value: T) {
    this.#enqueueContainer.push(value);
    this.#length += 1;
  }

  dequeue() {
    if (this.size() === 0) {
      throw new RangeError("Queue is empty");
    }

    this.#length -= 1;
    if (this.#dequeueContainer.length === 0) {
      while (this.#enqueueContainer.length !== 0) {
        this.#dequeueContainer.push(this.#enqueueContainer.pop());
      }
      return this.#dequeueContainer.pop();
    }
    return this.#dequeueContainer.pop();
  }

  size() {
    return this.#length;
  }
}
