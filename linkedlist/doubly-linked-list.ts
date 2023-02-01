import { DoublyLinkedNode } from "./node";
import type { LinkedListOperations } from "./ll-types";

export default class DoublyLinkedList<T> implements LinkedListOperations<T> {
  #sentinel: DoublyLinkedNode<T> = new DoublyLinkedNode(null, null, null);
  #length: number;
  constructor() {
    this.#length = 0;
  }

  add(value: T) {
    if (this.size() === 0) {
      const newNode = new DoublyLinkedNode(
        value,
        this.#sentinel,
        this.#sentinel,
      );
      this.#sentinel.next = newNode;
      this.#sentinel.prev = newNode;
    } else {
      const newNode = new DoublyLinkedNode(
        value,
        this.#sentinel,
        this.#sentinel.prev,
      );
      this.#sentinel.prev.next = newNode;
      this.#sentinel.prev = newNode;
    }
    this.#length += 1;
  }

  #addAtIndexIter(index: number, value: T) {
    let it = this.#sentinel;
    let iterIndex = -1;
    while (iterIndex !== index) {
      it = it.next;
      iterIndex += 1;
    }

    if (this.#length === 0) {
      const newNode = new DoublyLinkedNode(
        value,
        this.#sentinel,
        this.#sentinel,
      );
      this.#sentinel.next = newNode;
      this.#sentinel.prev = newNode;
    } else {
      const newNode = new DoublyLinkedNode(value, it, it.prev);
      it.prev.next = newNode;
      it.prev = newNode;
    }
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

  getHead() {
    return this.#sentinel.next;
  }

  getTail() {
    return this.#sentinel.prev;
  }

  addFirst(value: T) {
    this.addAtIndex(0, value);
  }

  addLast(value: T) {
    this.addAtIndex(this.size(), value);
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
    while (it !== this.#sentinel) {
      items.push(it.value);
      it = it.next;
    }
    return items;
  }
}
