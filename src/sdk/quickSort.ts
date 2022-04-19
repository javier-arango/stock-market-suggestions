/** Import data types */
import { Stocks } from "../types/data";

/** Sorting type */
type SortingType = "desc" | "asc";

/** Swap two elements */
const swap = (arr: Stocks, from: number, to: number): void => {
  let temp = arr[from];
  arr[from] = arr[to];
  arr[to] = temp;
};

/** Partition the array picking the last element as pivot */
const partition = (
  arr: Stocks,
  low: number,
  high: number,
  type: SortingType = "desc"
): number => {
  let pivot: number = arr[high].investmentRating; // Pick the last element of the array
  let from = low - 1; // Index of the smallest element

  for (let to = low; to <= high - 1; to++) {
    // Ascending order
    if (type === "asc") {
      if (arr[to].investmentRating < pivot) {
        from++;
        swap(arr, from, to);
      }
    } else {
      // Descending order
      if (arr[to].investmentRating > pivot) {
        from++;
        swap(arr, from, to);
      }
    }
  }
  swap(arr, from + 1, high);

  return from + 1;
};

/** Quick Sort helper funciton */
const quickSortHelper = (
  arr: Stocks,
  type: SortingType = "desc",
  low: number = 0,
  high: number = arr.length - 1
): void => {
  if (low < high) {
    // Partition index
    let pivot = partition(arr, low, high, type);

    // Recursively partition of the array
    quickSortHelper(arr, type, low, pivot - 1);
    quickSortHelper(arr, type, pivot + 1, high);
  }
};

/** Quick Sort */
const quickSort = (arr: Stocks, type: SortingType = "desc"): Stocks => {
  const data: Stocks = arr; // Unsorted data

  // Sort the array
  quickSortHelper(data, type);

  // Sorted data
  return data;
};

export { quickSort };
