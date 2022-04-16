/** Import data types */
import { Stocks } from "../data";

/** Swap two elements */
function swap(arr: Stocks, i: number, j: number): void {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/** Partition the array picking the last element as pivot */
function partition(arr: Stocks, low: number, high: number): number {
  let pivot: number = arr[high].investmentRating; // Pick the last element of the array
  let i = low - 1; // Index of the smallest element

  for (let j = low; j <= high - 1; j++) {
    if (arr[j].investmentRating < pivot) {
      i++;
      swap(arr, i, j);
    }
  }

  swap(arr, i + 1, high);

  return i + 1;
}

/** Quick Sort */
function quickSort(arr: Stocks, low: number, high: number): void {
  if (low < high) {
    // Partition index
    let pi = partition(arr, low, high);

    // Recursively partition of the array
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

module.exports = quickSort;
