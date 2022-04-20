import { Datum } from "../types/data";

/**
 * Swap two elements
 *
 * @param arr array of datum
 * @param from from position to swap
 * @param to to position to swap
 */
const swapDates = (arr: Array<Datum>, from: number, to: number): void => {
    let temp = arr[from];
    arr[from] = arr[to];
    arr[to] = temp;
};

/**
 * Partition the array picking the last element as pivot
 *
 * @param arr array of datum
 * @param low low index
 * @param high high index
 * @return partition of dates
 */
const partitionDates = (
    arr: Array<Datum>,
    low: number,
    high: number
): number => {
    let pivot: Date = arr[high].date; // Pick the last element of the array
    let from = low - 1; // Index of the smallest element

    for (let to = low; to <= high - 1; to++) {
        // Descending order
        if (arr[to].date > pivot) {
            from++;
            swapDates(arr, from, to);
        }
    }

    swapDates(arr, from + 1, high);

    return from + 1;
};

/**
 * Quick sort helper function
 *
 * @param arr array of datum
 * @param low low index
 * @param high high index
 */
const quickSortDatesHelper = (
    arr: Array<Datum>,
    low: number = 0,
    high: number = arr.length - 1
): void => {
    if (low < high) {
        // Partition index
        let pivot = partitionDates(arr, low, high);

        // Recursively partition of the array
        quickSortDatesHelper(arr, low, pivot - 1);
        quickSortDatesHelper(arr, pivot + 1, high);
    }
};

/**
 * Quick sort
 *
 * @param arr array of datum
 * @return sorted array of datum by date
 */
const quickSortDates = (arr: Array<Datum>): Array<Datum> => {
    const data: Array<Datum> = arr; // Unsorted data

    // Sort the array
    quickSortDatesHelper(data);

    // Sorted data
    return data;
};

export { quickSortDates };
