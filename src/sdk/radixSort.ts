/** Import data types */
import { Stocks } from "../types/data";

/** Sorting type */
type SortingType = "desc" | "asc";

// Get the maximum value in the array
const getMax = (arr: Stocks, n: number): number => {
  // FInd the max number
  let max = arr[0].investmentRating;
  for (let i = 1; i < n; i++)
    if (arr[i].investmentRating > max) max = arr[i].investmentRating;

  // Return the max numbe of the array
  return max;
};

/**  Count the numbers inside the array depedning of their exponential */
const countSort = (
  arr: Stocks,
  n: number,
  exp: number,
  type: SortingType = "desc"
): void => {
  let outputArray: Stocks = new Array(n);
  let countArray: Array<number> = new Array(10).fill(0);

  // Store the count in the count array
  for (let i = 0; i < n; i++) {
    // Ascending order
    if (type === "asc")
      countArray[Math.floor(arr[i].investmentRating / exp) % 10]++;
    // Descending order
    else countArray[9 - (Math.floor(arr[i].investmentRating / exp) % 10)]++;
  }

  // Change count values to have actual position of the digit in output array
  for (let i = 1; i < 10; i++) countArray[i] += countArray[i - 1];

  // Add values to the output array
  for (let i = n - 1; i >= 0; i--) {
    // Ascending order
    if (type === "asc") {
      outputArray[
        --countArray[Math.floor(arr[i].investmentRating / exp) % 10]
      ] = arr[i];
    }
    // Descending order
    else
      outputArray[
        --countArray[9 - (Math.floor(arr[i].investmentRating / exp) % 10)]
      ] = arr[i];
  }

  // Copy the output array to the unsorted array
  for (let i = 0; i < n; i++) arr[i] = outputArray[i];
};

/** Radix Sort helper function */
const radixSortHelper = (arr: Stocks, type: SortingType = "desc"): void => {
  let n = arr.length; // Array length
  let max = getMax(arr, n); // Find the maximum number to know number of digits

  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10)
    countSort(arr, n, exp, type);
};

/** Radix Sort */
const radixSort = (arr: Stocks, type: SortingType = "desc"): Stocks => {
  const data: Stocks = arr; // Unsorted data

  // Sort the array
  radixSortHelper(data, type);

  // Sorted data
  return data;
};

export { radixSort };
