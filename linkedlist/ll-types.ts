import type Node from "./node";

export interface LinkedListOperations<T> {
  add(value: T): void;
  addAtIndex(index: number, value: T): void;
  addAll(ll: this): void;
  addFirst(value: T);
  addLast(value: T);
  getHead(): Node<T>;
  getTail(): Node<T>;
  removeValue(value: T): boolean;
  removeIndex(index: number): T;
  removeFirst(): T;
  removeLast(): T;
}
