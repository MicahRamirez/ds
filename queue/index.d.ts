export interface QueueOperations<T> {
  // O(1)
  enqueue: (value: T) => void;
  // O(1)
  dequeue: () => T;
  // O(1)
  peek: () => T;
  size: () => number;
}
