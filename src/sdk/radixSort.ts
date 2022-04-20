import { Datum } from "../types/data";

/**
 * Gets the latest date in the array of datum
 *
 * @param arr array with datum
 * @return maximum value in the array
 */
const getMaxDate = (arr: Array<Datum>): number => {
    // Find the max number
    let max = arr[0].date.getTime();
    for (let i = 1; i < arr.length; i++)
        if (arr[i].date.getTime() > max) max = arr[i].date.getTime();

    // Return the max numbe of the array
    return max;
};

/**
 * Count the numbers inside the array depedning of their exponential
 *
 * @param arr arry containing datum
 * @param exp exponential value
 */
const countSortDates = (arr: Array<Datum>, exp: number): void => {
    const outputArray: Array<Datum> = new Array(arr.length);
    const countArray: Array<number> = new Array(10).fill(0);

    // Store the count in the count array
    for (let i = 0; i < arr.length; i++) {
        // Descending order
        countArray[9 - (Math.floor(arr[i].date.getTime() / exp) % 10)]++;
    }

    // Change count values to have actual position of the digit in output array
    for (let i = 1; i < 10; i++) {
        countArray[i] += countArray[i - 1];
    }

    // Add values to the output array
    for (let i = arr.length - 1; i >= 0; i--) {
        // Descending order
        outputArray[
            --countArray[9 - (Math.floor(arr[i].date.getTime() / exp) % 10)]
        ] = arr[i];
    }

    // Copy the output array to the unsorted array | Negative values
    for (let i = 0; i < arr.length; i++) {
        arr[i] = outputArray[i];
    }
};

/**
 * Radix Sort helper function
 * 
 * @param arr array of datum
 */
const radixSortDatesHelper = (arr: Array<Datum>): void => {
    let max = getMaxDate(arr); // Find the maximum number to know number of digits

    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10)
        countSortDates(arr, exp);
};

/**
 * Radix Sort
 * 
 * @param arr array of datum
 * @return sorted array of datum by date
 */
const radixSortDates = (arr: Array<Datum>): Array<Datum> => {
    const data: Array<Datum> = arr; // Unsorted data

    // Sort the array
    radixSortDatesHelper(data);

    // Sorted data
    return data;
};

export { radixSortDates };
