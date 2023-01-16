import LinkedList from "../linkedlist/index";

interface QueueOperations<T> {
  // O(1)
  enqueue: (value: T) => void;
  // O(1)
  dequeue: () => T;
  // O(1)
  peek: () => T;
}

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
