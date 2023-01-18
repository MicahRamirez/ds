export default class Node<T> {
  public value: T;
  public next: Node<T>;

  constructor(value: T, next: Node<T> = null) {
    this.value = value;
    this.next = next;
  }
}
