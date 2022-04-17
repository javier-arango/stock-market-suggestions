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
  /** Ascending sort */
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
  /** Ascending sort */
  if (low < high) {
    // Partition index
    let pi = partition(arr, low, high);

    // Recursively partition of the array
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

// // /** Run example */
// const arr: Stocks = [
//   {
//     investmentRating: 89,
//     ticker: "APPL",
//     name: "Apple",
//     data: [{ date: new Date(), price: 51, dcf: 78 }],
//   },
//   {
//     investmentRating: 856,
//     ticker: "CHI",
//     name: "China",
//     data: [{ date: new Date(), price: 51, dcf: 78 }],
//   },
//   {
//     investmentRating: 45,
//     ticker: "TWI",
//     name: "Twitter",
//     data: [{ date: new Date(), price: 51, dcf: 78 }],
//   },
//   {
//     investmentRating: 89,
//     ticker: "MCS",
//     name: "Micrsoft",
//     data: [{ date: new Date(), price: 51, dcf: 78 }],
//   },
//   {
//     investmentRating: 3,
//     ticker: "FBC",
//     name: "Facebook",
//     data: [{ date: new Date(), price: 51, dcf: 78 }],
//   },
//   {
//     investmentRating: 5,
//     ticker: "ABC",
//     name: "Google",
//     data: [{ date: new Date(), price: 51, dcf: 78 }],
//   },
// ];

// Print unsorted array
// console.log("Unsorted");
// for (let i = 0; i < arr.length; i++) console.log(arr[i]);

// quickSort(arr, 0, arr.length - 1);

// console.log("\n");
// console.log("Sorted");
// // Print sorted array
// for (let i = 0; i < arr.length; i++) console.log(arr[i]);

export default quickSort;
