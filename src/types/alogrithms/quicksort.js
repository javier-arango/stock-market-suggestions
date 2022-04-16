"use strict";
exports.__esModule = true;
/** Swap two elements */
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
/** Partition the array picking the last element as pivot */
function partition(arr, low, high) {
    var pivot = arr[high].investmentRating; // Pick the last element of the array
    var i = low - 1; // Index of the smallest element
    for (var j = low; j <= high - 1; j++) {
        if (arr[j].investmentRating < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}
/** Quick Sort */
function quickSort(arr, low, high, type) {
    /** Ascending sort */
    if (type === "ascending") {
        if (low < high) {
            // Partition index
            var pi = partition(arr, low, high);
            // Recursively partition of the array
            quickSort(arr, low, pi - 1, "ascending");
            quickSort(arr, pi + 1, high, "ascending");
        }
    }
    else {
        /** Descending sort */
        if (high < low) {
            // Partition index
            var pi = partition(arr, high, low);
            // Recursively partition of the array
            quickSort(arr, high, pi - 1, "descending");
            quickSort(arr, pi + 1, low, "descending");
        }
    }
}
/** Run example */
var arr = [
    {
        investmentRating: 89,
        ticker: "APPL",
        name: "Apple",
        data: [{ date: new Date(), price: 2, dcf: 2 }]
    },
    {
        investmentRating: 856,
        ticker: "CHI",
        name: "China",
        data: [{ date: new Date(), price: 2, dcf: 2 }]
    },
    {
        investmentRating: 45,
        ticker: "TWI",
        name: "Twitter",
        data: [{ date: new Date(), price: 2, dcf: 2 }]
    },
    {
        investmentRating: 1,
        ticker: "MCS",
        name: "Micrsoft",
        data: [{ date: new Date(), price: 2, dcf: 2 }]
    },
    {
        investmentRating: 3,
        ticker: "FBC",
        name: "Facebook",
        data: [{ date: new Date(), price: 2, dcf: 2 }]
    },
    {
        investmentRating: 5,
        ticker: "ABC",
        name: "Google",
        data: [{ date: new Date(), price: 2, dcf: 2 }]
    },
];
// Print unsorted array
for (var i = 0; i < arr.length; i++)
    console.log(arr[i]);
quickSort(arr, 0, arr.length - 1, "ascending");
// Print sorted array
for (var i = 0; i < arr.length; i++)
    console.log(arr[i]);
module.exports = quickSort;
