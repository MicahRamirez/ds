export type ComparatorResult = 0 | 1 | -1;
export type Comparator<T> = (a: T, b: T) => ComparatorResult;
