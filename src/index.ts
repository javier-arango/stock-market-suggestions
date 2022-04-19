import express, { Request, Response } from "express";
import { fileURLToPath } from "url";
import path from "path";
import { getProcessedData, findInvestmentRating } from "./sdk/getData";
import { quickSort } from "./sdk/quickSort";
import { radixSort } from "./sdk/radixSort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello there welcome to our API !!!");
});

// Send unsorted data
app.get("/api/data", (req: Request, res: Response) => {
  const stocks = getProcessedData(); // Unsorted data
  res.send(stocks);
});

// Send data sorted using quickSort in descending order
app.get("/api/data/quicksort", (req: Request, res: Response) => {
  const stocks = getProcessedData(); // Unsorted data
  res.send(quickSort(stocks));
});

// Send data sorted using quickSort in ascending order
app.get("/api/data/quicksort/asc", (req: Request, res: Response) => {
  const stocks = getProcessedData(); // Unsorted data
  res.send(quickSort(stocks, "asc"));
});

// Send data sorted using radixSort in descending order
app.get("/api/data/radixsort", (req: Request, res: Response) => {
  const stocks = getProcessedData(); // Unsorted data
  res.send(radixSort(stocks));
});

// Send data sorted using radixSort in ascending order
app.get("/api/data/radixsort/asc", (req: Request, res: Response) => {
  const stocks = getProcessedData(); // Unsorted data
  res.send(radixSort(stocks, "asc"));
});

app.get("/api/rating", (req: Request, res: Response) => {
  const stocks = getProcessedData(); // Unsorted data
  const { range, company } = req.query;
  const stock = stocks.find((stock) => stock.ticker === company);
  if (!stock) {
    res.send({ error: "Company not found" });
    return;
  }

  const rangeNum = range ? parseInt(range as string) : -1;

  res.send({ investmentRating: findInvestmentRating(stock?.data, rangeNum) });
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
