/** Datum object from "API" */
export type Datum = {
  date: string;
  price: number;
  dcf: number;
  name: string;
  ticker: string;
};

/** Extracted stock information from Data */
export type Stock = {
  investmentRating: number;
  ticker: string;
  name: string;
  data: Array<Datum>; // sorted by date
};

/** Processed data to be delivered to Frontend */
export type Stocks = Array<Stock>;
