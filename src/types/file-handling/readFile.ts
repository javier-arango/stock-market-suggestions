import { readFile } from "fs";
import { Datum, Stock } from "../data";
const fs = require("fs"); /** Read data from JSON file */

/** Process the data from json file */
const processData = (obj: any, stocks: Stock[]) => {
  try {
    //const stocks: Array<Stock> = [];
    const dataMap = new Map(); // Map - (key: ticker, value: index)
    let index: number = 0; // Array index

    // Add the stock data
    obj.forEach((data: any) => {
      if (!dataMap.has(data.ticker)) {
        // Add value if the key is not in the map
        dataMap.set(data.ticker, index);

        // Add values to the stock obj
        stocks.push({
          investmentRating: index,
          ticker: data.ticker!,
          name: data.name!,
          data: [],
        });

        index++;
      }

      // Add values to the datum obj
      stocks[dataMap.get(data.ticker)].data.push({
        date: data.date,
        price: data.price,
        dcf: data.dcf,
      });
    });

    // Calculate the investing rating
    dataMap.forEach((data: any) => {
      stocks[data].investmentRating = findInvestmentRating(stocks[data].data);
    });
  } catch (err) {
    console.log(err);
  }
};

/** Find the investment ating  */
const findInvestmentRating = (datum: Datum[]) => {
  // Stock rating
  let rating: number = 0;
  let dayCount: number = 0;

  // Find stock rating
  datum.forEach((data: Datum) => {
    let dayGap: number = data.price - data.dcf;
    rating += dayGap;
    dayCount++;
  });

  return rating / dayCount;
};

/** Read JSON file */
const getData = (filePath: string): any => {
  fs.readFile(
    filePath, // File path
    "utf-8", // Encoding
    (err: Error, fileData: string) => {
      if (err) console.log(err); // Check is there is an error

      try {
        // Try to get the data
        const obj = JSON.parse(fileData); // Data object form JSON file

        // Process data
        const stocks: Array<Stock> = [];
        processData(obj, stocks);

        console.log(stocks); // Return data
      } catch (err) {
        // Catch error if any
        console.log("Error parsing JSON", err);
      }
    }
  );
};

export { getData as getData };
