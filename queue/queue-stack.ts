import type { QueueOperations } from "./index";

/**
 * TODO: Maybe some more rigor with this analysis is required : )
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

  #checkAndFillDequeueContainer() {
    if (this.#dequeueContainer.length > 0) {
      return;
    }
    while (this.#enqueueContainer.length !== 0) {
      this.#dequeueContainer.push(this.#enqueueContainer.pop());
    }
  }

  #checkSizePrecondition() {
    if (this.size() === 0) {
      throw new RangeError("Queue is empty");
    }
  }

  peek(): T {
    this.#checkSizePrecondition();
    this.#checkAndFillDequeueContainer();

    // using js array as the stack which doesnt have a peek op
    return this.#dequeueContainer[this.#dequeueContainer.length - 1];
  }

  enqueue(value: T) {
    this.#enqueueContainer.push(value);
    this.#length += 1;
  }

  dequeue() {
    this.#checkSizePrecondition();
    this.#checkAndFillDequeueContainer();
    const item = this.#dequeueContainer.pop();
    this.#length -= 1;
    return item;
  }

  size() {
    return this.#length;
  }
}
