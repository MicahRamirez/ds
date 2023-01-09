class Node<T> {
  public value: T;
  public next: Node<T>;

  constructor(value: T, next: Node<T> = null) {
    this.value = value;
    this.next = next;
  }
}

// Access	Search	Insertion	Deletion
// O(n)	O(n)	O(1)	O(n)
/**
 * SinglyLinkedList
 */
class LinkedList<T> implements Iterable<T> {
  private head: Node<T>;
  private tail: Node<T>;
  public length: number = 0;
  constructor() {
    const headNode = new Node(null, null);
    this.head = headNode;
    this.tail = headNode;
  }

  /**
   * should be a O(1) op
   */
  add(value: T) {
    const newNode = new Node(value, null);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length += 1;
  }

  addAtIndex(index: number, value: T) {
    if (index > this.size() || index < 0) {
      throw new RangeError("Index out of bounds.");
    }
    let precedingIndex = index - 1;
    let currentIndex = 0;
    let it = this.head;
    while (currentIndex <= precedingIndex) {
      it = it.next;
      currentIndex += 1;
    }
    const nodeAfterNew = it.next;
    it.next = new Node(value, nodeAfterNew);
    this.length += 1;
    if (nodeAfterNew === null) {
      this.tail = it.next;
    }
  }

  addAll(ll: LinkedList<T>) {}

  addFirst(value: T) {}

  addLast(value: T) {}

  get(index: number) {}

  getHead(): Node<T> {
    return this.head;
  }

  getTail(): Node<T> {
    return this.tail;
  }

  removeFirst(): T {}

  removeLast(): T {}

  removeFirstOccurrence(): T {}

  set(index: number, value: T) {}

  size(): number {
    return this.length;
  }

  toArray(): Array<T> {
    const array = [];
    let it = this.head.next;
    while (it !== null) {
      array.push(it.value);
      it = it.next;
    }
    return array;
  }

  #insertIndexRecur(index: number, value: T) {}

  #insertIndexIter(index: number, value: T) {}
  iterator(): IterableIterator<T> {
    const length = this.length;
    let it = this.head;
    return {
      next() {
        it = it.next;
        const isDone = length === 0 || it === null;
        return {
          done: isDone,
          value: it?.value,
        };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
  [Symbol.iterator](): IterableIterator<T> {
    return this.iterator();
  }
}

export default LinkedList;
