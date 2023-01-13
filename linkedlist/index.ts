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

  /**
   *  O(N)
   * @param index index to insert at
   * @param value value to insert
   */
  addAtIndex(index: number, value: T) {
    this.#insertIndexRecur(index, value);
  }

  addAll(ll: LinkedList<T>) {}

  addFirst(value: T) {
    this.addAtIndex(0, value);
  }

  addLast(value: T) {
    this.addAtIndex(this.length, value);
  }

  get(index: number) {}

  getHead(): Node<T> {
    // head is a sentinel which is an implementation detail that should not be exposed!
    return this.head.next;
  }

  getTail(): Node<T> {
    if (this.head === this.tail) {
      return this.getHead();
    }
    return this.tail;
  }

  removeValue(value: T): boolean {
    return this.#removeValueIterative(value);
  }

  #nodeDeletion(precedingNode, nodeToDelete): Node<T> {
    if (nodeToDelete === this.tail) {
      this.tail = precedingNode;
    }
    precedingNode.next = nodeToDelete.next;
    this.length -= 1;
    return nodeToDelete;
  }

  #removeValueIterative(value: T) {
    let it = this.head.next;
    let trailingNode = this.head;
    while (it !== null) {
      if (it.value === value) {
        return Boolean(this.#nodeDeletion(trailingNode, it));
      }
      it = it.next;
      trailingNode = trailingNode.next;
    }
    return false;
  }

  removeIndex(index: number): T {
    const normalizedIndex = this.#indexRangeCheck(index);
    const precedingIndex = normalizedIndex - 1;
    return this.#removeRecurHelper(this.head, precedingIndex);
  }

  #removeRecurHelper(node: Node<T>, index: number) {
    if (index < 0) {
      const nodeToDelete = node.next;
      return this.#nodeDeletion(node, nodeToDelete).value;
    }
    return this.#removeRecurHelper(node.next, index - 1);
  }

  removeFirst(): T {
    return this.removeIndex(0);
  }

  removeLast(): T {
    return this.removeIndex(this.size() - 1);
  }

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

  #indexRangeCheck(index: number) {
    const normalizedIndex = Math.trunc(index);
    if (normalizedIndex > this.size() || normalizedIndex < 0) {
      throw new RangeError("Index out of bounds.");
    }
    return normalizedIndex;
  }
  /**
   * TODO cleanup
   * @param insertIndex
   * @param node
   * @param value
   * @returns
   */
  #insertRecur(insertIndex: number, node: Node<T>, value: T): Node<T> {
    if (insertIndex === 0) {
      const newNode = new Node(value, node);
      if (newNode.next === null) {
        this.tail = newNode;
      }
      this.length += 1;
      return newNode;
    }
    node.next = this.#insertRecur(insertIndex - 1, node.next, value);
    return node;
  }

  #insertIndexRecur(indexParam: number, value: T) {
    const index = this.#indexRangeCheck(indexParam);
    this.head.next = this.#insertRecur(index, this.head.next, value);
  }

  #insertIndexIter(indexParam: number, value: T) {
    const index = this.#indexRangeCheck(indexParam);

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
