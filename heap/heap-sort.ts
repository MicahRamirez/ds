import { Comparator } from "../common";
import Heap from "./heap";

enum SortOrder {
  Ascending,
  Descending,
}

interface HeapSortOptions<T> {
  comparator?: Comparator<T>;
  sortOrder: SortOrder;
}

export function heapsort<T>(
  itemsToSort: Array<T>,
  { comparator, sortOrder }: HeapSortOptions<T> | undefined = {
    sortOrder: SortOrder.Ascending,
  },
) {
  if (sortOrder === SortOrder.Descending) {
    throw new Error("Not supported yet");
  }

  const heap = new Heap(comparator);
  heap.insertMany(itemsToSort);
  const sortedItems = [];
  while (heap.size() > 0) {
    sortedItems.push(heap.extractMin());
  }
  return sortedItems;
}
