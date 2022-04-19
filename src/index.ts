import express, { Request, Response } from "express";
import { fileURLToPath } from "url";
import path from "path";
import { getProcessedData } from "./sdk/getData";
import { quickSort } from "./sdk/quickSort";
import { radixSort } from "./sdk/radixSort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Unsorted data
const stocks = getProcessedData();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello there welcome to our API !!!");
});

// Send unsorted data
app.get("/api/data", (req: Request, res: Response) => {
  res.send(stocks);
});

// Send data sorted using quickSort in descending order
app.get("/api/data/quicksort", (req: Request, res: Response) => {
  res.send(quickSort(stocks));
});

// Send data sorted using quickSort in ascending order
app.get("/api/data/quicksort/asc", (req: Request, res: Response) => {
  res.send(quickSort(stocks, "asc"));
});

// Send data sorted using radixSort in descending order
app.get("/api/data/radixsort", (req: Request, res: Response) => {
  res.send(radixSort(stocks));
});

// Send data sorted using radixSort in ascending order
app.get("/api/data/radixsort/asc", (req: Request, res: Response) => {
  res.send(radixSort(stocks, "asc"));
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
