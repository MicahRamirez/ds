import { DoublyLinkedNode } from "./node";
import type { LinkedListOperations } from "./ll-types";

export default class DoublyLinkedList<T> implements LinkedListOperations<T> {
  #sentinel: DoublyLinkedNode<T> = new DoublyLinkedNode(null, null, null);
  #length: number;
  constructor() {
    this.#length = 0;
  }

  add(value: T) {
    if (this.#length === 0) {
      const newNode = new DoublyLinkedNode(value, null, null);
      this.#sentinel.next = newNode;
      this.#sentinel.prev = newNode;
    } else {
      const newNode = new DoublyLinkedNode(value, null, this.#sentinel.prev);
      this.#sentinel.prev.next = newNode;
      this.#sentinel.prev = newNode;
    }
    this.#length += 1;
    return;
  }

  #addAtIndexIter(index: number, value: T) {
    let it = this.#sentinel.next;
    let iterIndex = 0;
    while (iterIndex !== index) {
      it = it.next;
      iterIndex += 1;
    }

    // when inserting into an empty ll the prev value could be null
    const newNode = new DoublyLinkedNode(value, it, it?.prev);
    if (this.#length === 0) {
      this.#sentinel.next = newNode;
      this.#sentinel.prev = newNode;
      this.#length += 1;
      return;
    } else if (index === 0) {
      this.#sentinel.next = newNode;
    } else if (index === this.#length) {
      this.#sentinel.prev = newNode;
    }

    it.prev.next = newNode;
    it.prev = newNode;

    this.#length += 1;
  }

  addAtIndex(
    index: number,
    value: T,
    options = { implementation: "iterative" },
  ) {
    if (index > this.#length) {
      throw new RangeError("Index out of bounds.");
    }
    if (options.implementation === "recursive") {
      // TODO: Implement recursive implementation
    } else {
      this.#addAtIndexIter(index, value);
    }
  }

  removeValue(value: T) {
    return true;
  }

  // addAtIndex(index: number, value: T): void;
  // addAll(ll: this): void;
  // addFirst(value: T);
  // addLast(value: T);
  // getHead(): Node<T>;
  // getHead(): Node<T>;
  // removeValue(value: T): boolean;
  // removeIndex(index: number): T;
  // removeFirst(): T;
  // removeLast(): T;

  size() {
    return this.#length;
  }

  toArray() {
    let it = this.#sentinel.next;
    const items = [];
    while (it !== null) {
      items.push(it.value);
      it = it.next;
    }
    return items;
  }
}
