/** Import data types */
import { Stocks } from "../data";

// Get the maximum value in the array
function getMax(arr: Stocks, n: number) {
  // FInd the max number
  let mx = arr[0].investmentRating;
  for (let i = 1; i < n; i++)
    if (arr[i].investmentRating > mx) mx = arr[i].investmentRating;

  // Return the max numbe of the array
  return mx;
}

/**  Count the numbers inside the array depedning of their exponential */
function countSort(arr: Stocks, n: number, exp: number): void {
  let output: Stocks = new Array(n); // output array
  let i: number;
  let count: Array<number> = new Array(10);

  for (let i = 0; i < 10; i++) count[i] = 0;

  // Store count of occurrences in count[]
  for (i = 0; i < n; i++)
    count[Math.floor(arr[i].investmentRating / exp) % 10]++;

  // Change count[i] so that count[i] now contains
  // actual position of this digit in output[]
  for (i = 1; i < 10; i++) count[i] += count[i - 1];

  // Build the output array
  for (i = n - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i].investmentRating / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i].investmentRating / exp) % 10]--;
  }

  // Copy the output array to arr[], so that arr[] now
  // contains sorted numbers according to current digit
  for (i = 0; i < n; i++) arr[i] = output[i];
}

/** Radix Sort */
function radixsort(arr: Stocks, n: number): void {
  // Find the maximum number to know number of digits
  let m = getMax(arr, n);

  // Do counting sort for every digit. Note that
  // instead of passing digit number, exp is passed.
  // exp is 10^i where i is current digit number
  for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) countSort(arr, n, exp);
}

// /** Run example */
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

// // Print unsorted array
// console.log("Unsorted");
// for (let i = 0; i < arr.length; i++) console.log(arr[i]);

// radixsort(arr, arr.length);

// console.log("\n");
// console.log("Sorted");
// // Print sorted array
// for (let i = 0; i < arr.length; i++) console.log(arr[i]);

export default radixsort;
