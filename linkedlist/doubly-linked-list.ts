import { DoublyLinkedNode } from "./node";
import type { LinkedListOperations } from "./ll-types";

export default class DoublyLinkedList<T> implements LinkedListOperations<T> {
  #head: DoublyLinkedNode<T> = new DoublyLinkedNode(null, null, null);
  #length: number;
  constructor() {
    this.#length = 0;
  }

  add(value: T) {
    if (this.#length === 0) {
      const newNode = new DoublyLinkedNode(value, null, null);
      this.#head.next = newNode;
      this.#head.prev = newNode;
    } else {
      const newNode = new DoublyLinkedNode(value, null, this.#head.prev);
      this.#head.prev.next = newNode;
      this.#head.prev = newNode;
    }
    this.#length += 1;
    return;
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
    let it = this.#head.next;
    const items = [];
    while (it !== null) {
      items.push(it.value);
      it = it.next;
    }
    return items;
  }
}
