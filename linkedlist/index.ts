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

  addAtIndex(index: number, value: T) {}

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

  #insertIndexRecur(index: number, value: T) {}

  #insertIndexIter(index: number, value: T) {}
  [Symbol.iterator]() {
    const length = this.length;
    let it = this.head;
    // TODO: What is the expectation on LL iterator with zero length. A little confused with this implementation
    // because it immediately iterates with value done true and value of
    // cases length 0
    // h -> dummy -/>
    // t -> dummy -/>

    return {
      next() {
        it = it.next;
        const isDone = length === 0 || it === null;

        return {
          done: isDone,
          value: it?.value,
        };
      },
    };
  }
}

export default LinkedList;
