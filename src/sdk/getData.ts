import { Datum, Stock, Stocks } from "../types/data";
import { quickSortDates } from "./quickSort";
import { radixSortDates } from "./radixSort";
import data from "../data/stock_data.json";

/** Object containing all stock information by ticker */
type StockObject = { [ticker: string]: Stock }

/**
 * Gets the investment rating of a stock
 * 
 * @param data array of Datum from a given stock
 * @param range the time range to estimate the investment rating
 * @return investment rating
 */
const findInvestmentRating = (data: Array<Datum>, range = 30): number => {
    // If range is not set, set it to the last index
    let end = range === -1 ? data.length - 1 : range;

    // Stock rating
    let sumGap: number = 0;
    let dayCount: number = 0;
    let sumPrice = 0;

    // Find stock sumGap
    for (let i = 0; i < end; i++) {
        const { dcf, price } = data[i];
        sumGap += dcf - price;
        sumPrice += price;
        dayCount++;
    }

    // calculate investment rating
    const averageGap = sumGap / dayCount;
    const averagePrice = sumPrice / dayCount;
    const investmentRating = (averageGap / averagePrice) * 100;

    // Calculate the investment rating
    return parseFloat(investmentRating.toFixed(2));
};

/**
 * Formats raw data to be processed
 * 
 * @param method sorting method to process dates
 * @return array of Datum
 */
const getRawData = (method: string = "quicksort"): Array<Datum> => {
    // get raw data
    const rawData = data as Array<any>;

    // convert raw data to expected format
    const stocks: Array<Datum> = [];
    rawData.forEach((datum: any) => {
        stocks.push({
            ticker: datum.ticker,
            name: datum.name,
            price: parseFloat(datum.price.toFixed(2)), // round to 2 decimal places
            dcf: parseFloat(datum.dcf.toFixed(2)), // round to 2 decimal places
            date: new Date(datum.date), // convert date string to date object
        });
    });

    // sort data by dates
    return method === "quicksort"
        ? quickSortDates(stocks)
        : radixSortDates(stocks);
};

/**
 * Processes processed raw data and returns a array of stocks
 * 
 * @param sortingMethod sorting method to process dates
 * @return array of Datum
 */
const getProcessedData = (sortingMethod: string = "radixsort"): Stocks => {
    // Unprocessed data
    const raw: Array<Datum> = getRawData(sortingMethod); // Load json data

    // Varibales
    const stockObject: StockObject = {}; // Stock object

    // Add the stock data
    raw.forEach((datum: Datum) => {
        // get ticker from datum
        const { ticker } = datum;

        // If the stock is not in the object, add it
        if (!stockObject[ticker]) {
            stockObject[ticker] = {
                investmentRating: 0,
                ticker,
                name: datum.name,
                data: [],
            };
        }

        // Add the data to the stock
        stockObject[ticker].data.push(datum);
    });

    // Add the investment rating to the stock
    Object.keys(stockObject).forEach((ticker: string) => {
        stockObject[ticker].investmentRating = findInvestmentRating(
            stockObject[ticker].data
        );
    });

    return Object.values(stockObject);
};

export { getProcessedData, findInvestmentRating };
