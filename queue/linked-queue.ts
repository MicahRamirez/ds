import LinkedList from "../linkedlist/index";
import type { QueueOperations } from "./index";

export default class LinkedQueue<T> implements QueueOperations<T> {
  #container: LinkedList<T>;
  #length: number = 0;
  constructor() {
    this.#container = new LinkedList<T>();
  }

  enqueue(value: T) {
    this.#container.addLast(value);
    this.#length += 1;
  }

  dequeue(): T {
    if (this.size() === 0) {
      throw new RangeError("Queue is empty");
    }
    const value = this.#container.removeFirst();
    this.#length -= 1;
    return value;
  }

  peek(): T {
    return this.#container.getHead().value;
  }

  size() {
    return this.#length;
  }
}
