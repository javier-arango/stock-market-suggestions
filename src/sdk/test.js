"use strict";
exports.__esModule = true;
exports.radixSort = void 0;
// Get the maximum value in the array
var getMax = function (arr, n) {
    // Find the max number
    var max = (arr[0].investmentRating * 1000) >>> 0;
    for (var i = 1; i < n; i++)
        if ((arr[i].investmentRating * 1000) >>> 0 > max)
            max = (arr[i].investmentRating * 1000) >>> 0;
    // Return the max numbe of the array
    return max;
};
// Add values to final array | Fix array
var addValuesToFixArr = function (arr, index, addFrom) {
    // Copy the output array to the unsorted array | Negative values
    for (var i = 0; i < addFrom.length; i++) {
        if (addFrom[i] !== undefined) {
            arr[index] = addFrom[i];
            index++;
        }
    }
};
// Fix final array just in case there are negatives numbers
var fixFinalArr = function (arr, type, n) {
    if (type === void 0) { type = "desc"; }
    if (n === void 0) { n = arr.length; }
    // Data to split the array between positive and negative
    var positiveArr = [];
    var negativeArr = [];
    // Split the output array between positive and negative arrays
    for (var i = 0; i < n; i++) {
        // Find positive numbers | if sign() is 1 the number is positive
        if (Math.sign(arr[i].investmentRating) === 1) {
            positiveArr.push(arr[i]);
        }
        // Find negative numbers | if sign() is 1 the number is positive
        else if (Math.sign(arr[i].investmentRating) === -1) {
            negativeArr.push(arr[i]);
        }
    }
    // Check if ascedning order
    if (type == "asc") {
        // Index to keep track of the real index of the final array
        var index = 0;
        // Copy the output array to the unsorted array | Negative values
        for (var i = 0; i < negativeArr.length; i++) {
            if (negativeArr[i] !== undefined) {
                arr[index] = negativeArr[i];
                index++;
            }
        }
        // Copy the output array to the unsorted array | Positive values
        for (var i = 0; i < positiveArr.length; i++) {
            if (positiveArr[i] !== undefined) {
                arr[index] = positiveArr[i];
                index++;
            }
        }
    }
    // Check if descending order
    else {
        // Index to keep track of the real index of the final array
        var index = 0;
        // Copy the output array to the unsorted array | Positive values
        for (var i = 0; i < positiveArr.length; i++) {
            if (positiveArr[i] !== undefined) {
                arr[index] = positiveArr[i];
                index++;
            }
        }
        // Copy the output array to the unsorted array | Negative values
        for (var i = 0; i < negativeArr.length; i++) {
            if (negativeArr[i] !== undefined) {
                arr[index] = negativeArr[i];
                index++;
            }
        }
    }
};
/**  Count the numbers inside the array depedning of their exponential */
var countSort = function (arr, n, exp, type) {
    if (type === void 0) { type = "desc"; }
    var outputArray = new Array(n);
    var countArray = new Array(10).fill(0);
    // Store the count in the count array
    for (var i = 0; i < n; i++) {
        // Ascending order
        if (type === "asc")
            countArray[Math.floor(((arr[i].investmentRating * 1000) >>> 0) / exp) % 10]++;
        // Descending order
        else
            countArray[9 - (Math.floor(((arr[i].investmentRating * 1000) >>> 0) / exp) % 10)]++;
    }
    // Change count values to have actual position of the digit in output array
    for (var i = 1; i < 10; i++) {
        countArray[i] += countArray[i - 1];
    }
    // Add values to the output array
    for (var i = n - 1; i >= 0; i--) {
        // Ascending order
        if (type === "asc") {
            outputArray[--countArray[Math.floor(((arr[i].investmentRating * 1000) >>> 0) / exp) % 10]] = arr[i];
        }
        // Descending order
        else
            outputArray[--countArray[9 - (Math.floor(((arr[i].investmentRating * 1000) >>> 0) / exp) % 10)]] = arr[i];
    }
    // Copy the output array to the unsorted array | Negative values
    for (var i = 0; i < n; i++) {
        arr[i] = outputArray[i];
    }
};
/** Radix Sort helper function */
var radixSortHelper = function (arr, type) {
    if (type === void 0) { type = "desc"; }
    var n = arr.length; // Array length
    var max = getMax(arr, n); // Find the maximum number to know number of digits
    // Do counting sort for every digit
    for (var exp = 1; Math.floor(max / exp) > 0; exp *= 10)
        countSort(arr, n, exp, type);
    // Fix the final array
    fixFinalArr(arr, type);
};
/** Radix Sort */
var radixSort = function (arr, type) {
    if (type === void 0) { type = "desc"; }
    var data = arr; // Unsorted data
    // Sort the array
    radixSortHelper(data, type);
    // Sorted data
    return data;
};
exports.radixSort = radixSort;
/** Run example */
var arr = [
    {
        investmentRating: 89.01,
        ticker: "APPL",
        name: "Apple",
        data: []
    },
    {
        investmentRating: 856.54,
        ticker: "CHI",
        name: "China",
        data: []
    },
    {
        investmentRating: 0.545,
        ticker: "TWI",
        name: "Twitter",
        data: []
    },
    {
        investmentRating: -5.8,
        ticker: "MCS",
        name: "Micrsoft",
        data: []
    },
    {
        investmentRating: 0.005,
        ticker: "FBC",
        name: "Facebook",
        data: []
    },
    {
        investmentRating: 0.003,
        ticker: "FBC",
        name: "Facebook",
        data: []
    },
    {
        investmentRating: -55.8,
        ticker: "ABC",
        name: "Google",
        data: []
    },
    {
        investmentRating: -60.8,
        ticker: "ABC",
        name: "Google",
        data: []
    },
];
// // Print unsorted array
console.log("Unsorted");
for (var i = 0; i < arr.length; i++)
    console.log(arr[i]);
var data = radixSort(arr);
console.log("\n");
console.log("Sorted");
// Print sorted array
for (var i = 0; i < data.length; i++)
    console.log(data[i]);
