import { DoublyLinkedNode } from "./node";
import type { LinkedListOperations } from "./ll-types";
import type { Comparator } from "../common";

type ImplementationOptions = {
  implementation: "iterative" | "recursive";
};

export default class DoublyLinkedList<T> implements LinkedListOperations<T> {
  #sentinel: DoublyLinkedNode<T> = new DoublyLinkedNode(null, null, null);
  #length: number;
  #comparator: Comparator<T>;
  constructor(comparator?: Comparator<T>) {
    this.#length = 0;
    if (comparator) {
      this.#comparator = comparator;
    }
  }

  #equals(itemA: T, itemB: T) {
    if (this.#comparator) {
      return this.#comparator(itemA, itemB) === 0;
    }
    return itemA === itemB;
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

  removeValue(
    value: T,
    options: ImplementationOptions = { implementation: "recursive" },
  ) {
    if (options.implementation === "recursive") {
      return this.#removeValueRecursive(value, this.#sentinel.next);
    }
    return false;
  }

  #removeValueRecursive(value: T, node: DoublyLinkedNode<T>) {
    if (this.#equals(node.value, value)) {
      // special case for when deleting a single item
      if (node.prev === this.#sentinel && node.next === this.#sentinel) {
        this.#sentinel.next = null;
        this.#sentinel.prev = null;
      } else {
        node.prev.next = node.next;
        node.next.prev = node.prev;
      }

      // clean up references
      node.next = null;
      node.prev = null;
      this.#length -= 1;
      return true;
    }
    // end of traversal
    if (node.next === this.#sentinel) {
      return false;
    }
    return this.#removeValueRecursive(value, node.next);
  }

  // addAll(ll: this): void;
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
