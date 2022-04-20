/** Import data types */
import { Datum, Stock, Stocks } from "../types/data";

/** Sorting type */
type SortingType = "desc" | "asc";

// Get the maximum value in the array
const getMax = (arr: Stocks, n: number): number => {
  // Find the max number
  let max = (arr[0].investmentRating * 1000) >>> 0;
  for (let i = 1; i < n; i++)
    if ((arr[i].investmentRating * 1000) >>> 0 > max)
      max = (arr[i].investmentRating * 1000) >>> 0;

  // Return the max numbe of the array
  return max;
};

/** Swap two elements */
const swap = (arr: Stocks, from: number, to: number): void => {
  let temp = arr[from];
  arr[from] = arr[to];
  arr[to] = temp;
};

// Fix final array just in case there are negatives numbers
const fixFinalArr = (
  arr: Stocks,
  type: SortingType = "desc",
  n: number = arr.length
) => {
  // Data to split the array between positive and negative
  const copyOfData: Map<number, Stock> = new Map();
  let positiveCount = 0; // Total positives numbers in the array
  let negativeCount = 0; // Total negative numbers in the array
  let index = 0; // Index for positive numbers
  let changeCount = 0; // Change count for negative number

  // Split the output array between positive and negative arrays
  for (let i = 0; i < n; i++) {
    // Find positive numbers | if sign() is 1 the number is positive
    if (Math.sign(arr[i].investmentRating) >= 0) positiveCount++;
    // Find negative numbers | if sign() is 1 the number is positive
    else if (Math.sign(arr[i].investmentRating) === -1) negativeCount++;

    // Copy data to map with corresponing index
    copyOfData.set(i, arr[i]);
  }

  // Add values to corresponding place
  for (let i = 0; i < n; i++) {
    // Fix sort for descedning
    if (type === "desc") {
      // Move negative that are on top to the bottom
      if (negativeCount !== 0 && changeCount < negativeCount) {
        arr[positiveCount] = copyOfData.get(i)!;
        positiveCount++;
        changeCount++;
      }
      // Move positive to the correct place
      else {
        arr[index] = copyOfData.get(i)!;
        index++;
      }
    }
    // Fix sort for ascending
    else {
      // Move negative that are on bottom to the top
      if (negativeCount !== 0 && changeCount < negativeCount) {
        arr[i] = copyOfData.get(positiveCount)!; // Change values
        positiveCount++;
        changeCount++;
      }
      // Move positive to the correct place
      else {
        arr[i] = copyOfData.get(index)!; // Change values
        index++;
      }
    }
  }
};

/**  Count the numbers inside the array depedning of their exponential */
const countSort = (
  arr: Stocks,
  n: number,
  exp: number,
  type: SortingType = "desc"
): void => {
  const outputArray: Stocks = new Array(n);
  const countArray: Array<number> = new Array(10).fill(0);

  // Store the count in the count array
  for (let i = 0; i < n; i++) {
    // Ascending order
    if (type === "asc")
      countArray[
        Math.floor(((arr[i].investmentRating * 1000) >>> 0) / exp) % 10
      ]++;
    // Descending order
    else
      countArray[
        9 - (Math.floor(((arr[i].investmentRating * 1000) >>> 0) / exp) % 10)
      ]++;
  }

  // Change count values to have actual position of the digit in output array
  for (let i = 1; i < 10; i++) {
    countArray[i] += countArray[i - 1];
  }

  // Add values to the output array
  for (let i = n - 1; i >= 0; i--) {
    // Ascending order
    if (type === "asc") {
      outputArray[
        --countArray[
          Math.floor(((arr[i].investmentRating * 1000) >>> 0) / exp) % 10
        ]
      ] = arr[i];
    }
    // Descending order
    else
      outputArray[
        --countArray[
          9 - (Math.floor(((arr[i].investmentRating * 1000) >>> 0) / exp) % 10)
        ]
      ] = arr[i];
  }

  // Copy the output array to the unsorted array | Negative values
  for (let i = 0; i < n; i++) {
    arr[i] = outputArray[i];
  }
};

/** Radix Sort helper function */
const radixSortHelper = (arr: Stocks, type: SortingType = "desc"): void => {
  let n = arr.length; // Array length
  let max = getMax(arr, n); // Find the maximum number to know number of digits

  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10)
    countSort(arr, n, exp, type);

  // Fix the final array
  fixFinalArr(arr, type);
};

/** Radix Sort */
const radixSort = (arr: Stocks, type: SortingType = "desc"): Stocks => {
  const data: Stocks = arr; // Unsorted data

  // Sort the array
  radixSortHelper(data, type);

  // Sorted data
  return data;
};

/** Run example */
const arr: Stocks = [
  {
    investmentRating: 89.01,
    ticker: "APPL",
    name: "Apple",
    data: [],
  },
  {
    investmentRating: 0,
    ticker: "APPL",
    name: "Apple",
    data: [],
  },
  {
    investmentRating: 856.54,
    ticker: "CHI",
    name: "China",
    data: [],
  },
  {
    investmentRating: 0.545,
    ticker: "TWI",
    name: "Twitter",
    data: [],
  },
  {
    investmentRating: 0,
    ticker: "APPL",
    name: "Apple",
    data: [],
  },
  {
    investmentRating: 5.8,
    ticker: "MCS",
    name: "Micrsoft",
    data: [],
  },
  {
    investmentRating: 0.005,
    ticker: "FBC",
    name: "Facebook",
    data: [],
  },
  {
    investmentRating: 0.003,
    ticker: "FBC",
    name: "Facebook",
    data: [],
  },
  {
    investmentRating: 55.8,
    ticker: "ABC",
    name: "Google",
    data: [],
  },
  {
    investmentRating: 60.8,
    ticker: "ABC",
    name: "Google",
    data: [],
  },
];

// // Print unsorted array
console.log("Unsorted");
for (let i = 0; i < arr.length; i++) console.log(arr[i]);

const data = radixSort(arr, "asc");

console.log("\n");
console.log("Sorted");
// Print sorted array
for (let i = 0; i < data.length; i++) console.log(data[i]);

export { radixSort };
