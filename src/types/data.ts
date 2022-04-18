import { getData } from "./file-handling/readFile";

/** Datum object from "API" */
export type Datum = {
  date: Date;
  price: number;
  dcf: number;
};

// /** Extracted stock information from Data */
export type Stock = {
  investmentRating: number;
  ticker: string;
  name: string;
  data: Array<Datum>; // sorted by date
};

const filePath = "../data/stock_data.json";
getData(filePath);

// /** Processed data to be delivered to Frontend */
export type Stocks = Array<Stock>;
