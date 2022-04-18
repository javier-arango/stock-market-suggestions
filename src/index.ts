import express, { Request, Response } from "express";
import { Datum, Stock } from "./types/data";
import data from './data/stock_data.json';
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import quickSort from "./types/alogrithms/quickSort";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

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
    let dayGap: number = data.dcf - data.price;
    rating += dayGap;
    dayCount++;
  });

  return rating / dayCount;
};

/** Process the data from json file */
const getProcessedData = () => {
  // Unprocessed data
  const obj: Array<Datum> = data as Array<Datum>;

  // Varibales
  const dataMap = new Map(); // Map - (key: ticker, value: index)
  const stocks: Array<Stock> = []; // Store processed data

  // Add the stock data
  let index: number = 0; // Array index
  obj.forEach((datum: any) => {
    if (!dataMap.has(datum.ticker)) {
      // Add value if the key is not in the map
      dataMap.set(datum.ticker, index);

      // Add values to the stock obj
      stocks.push({
        investmentRating: index,
        ticker: datum.ticker!,
        name: datum.name!,
        data: [],
      });

      index++;
    }

    // Add values to the datum obj
    stocks[dataMap.get(datum.ticker)].data.push({
      name: datum.name,
      ticker: datum.ticker,
      date: datum.date,
      price: datum.price,
      dcf: datum.dcf,
    });
  });

  // Calculate the investing rating
  dataMap.forEach((data: any) => {
    stocks[data].investmentRating = findInvestmentRating(stocks[data].data);
  });

  // Return processed data
  return stocks;
};

let stocks: Array<Stock> = getProcessedData();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/data", (req: Request, res: Response) => {
  res.send(stocks);
});

app.get("/api/data/quicksort", (req: Request, res: Response) => {
  // Sort the data
  quickSort(stocks)
  res.send(stocks);
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));