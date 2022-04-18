import { Datum, Stock } from "./data";
import { readFile } from "fs/promises";

/** Read JSON file */
const readJSON = async () => {
  // Get data from JSON file
  const buffer = await readFile("../data/stock_data.json", {
    encoding: "utf-8",
  });

  // Retrun unprocessed data
  return JSON.parse(buffer);
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

/** Process the data from json file */
const getProcessedData = async () => {
  // Unprocessed data
  const obj = await readJSON();

  // Varibales
  const dataMap = new Map(); // Map - (key: ticker, value: index)
  const stocks: Array<Stock> = []; // Store processed data

  // Add the stock data
  let index: number = 0; // Array index
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

  // Return processed data
  return stocks;
};

const printData = (data: Stock[], row: number, col: number) => {
  for (let i = 0; i < row; i++) {
    console.log(data[i].name, data[i].investmentRating);
    for (let j = 0; j < col; j++) {
      console.log(data[i].data[j]);
    }
  }
};

export default getProcessedData;
