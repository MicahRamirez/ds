export default class Node<T> {
  public value: T;
  public next: Node<T>;

  constructor(value: T, next: Node<T> = null) {
    this.value = value;
    this.next = next;
  }
}

export class DoublyLinkedNode<T> {
  public value: T;
  public next: DoublyLinkedNode<T>;
  public prev: DoublyLinkedNode<T>;

  constructor(
    value: T,
    next: DoublyLinkedNode<T> = null,
    prev: DoublyLinkedNode<T> = null,
  ) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
