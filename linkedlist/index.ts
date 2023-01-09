class Node<T> {
  public value: T;
  public next: Node<T>;

  constructor(value: T, next: Node<T> = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList<T> {
  public head: Node<T> = null;
  public tail: Node<T> = null;
  public length: number = 0;
  constructor() {}

  add(value: T) {}

  add(index: number, value: T) {}

  addAll(ll: LinkedList<T>) {}

  addFirst(value: T) {}

  addLast(value: T) {}

  get(index: number) {}

  removeFirst(): T {}

  removeLast(): T {}

  removeFirstOccurrence(): T {}

  set(index: number, value: T) {}

  size(): number {
    return this.length;
  }

  #insertIndexRecur(index: number, value: T) {}

  #insertIndexIter(index: number, value: T) {}
}

export default LinkedList;
