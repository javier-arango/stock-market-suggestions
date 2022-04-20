import express, { Request, Response } from "express";
import { fileURLToPath } from "url";
import path from "path";
import { getProcessedData, findInvestmentRating } from "./sdk/getData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// this is the route to our api :)
app.get("/api", (req: Request, res: Response) => {
    res.send("Hello there welcome to our API !!!");
});

// Send unsorted data
app.get("/api/data", (req: Request, res: Response) => {
    const { method } = req.query; // get sorting method

	// catch invalid messages
    if (method && method !== "quicksort" && method !== "radixsort") {
        res.status(400).send("Invalid sorting method");
    }

    res.send(getProcessedData(method as string));
});

// gets the rating given a time frame in days
app.get("/api/rating", (req: Request, res: Response) => {
    const stocks = getProcessedData(); // Unsorted data
    const { range, company } = req.query;
    const stock = stocks.find((stock) => stock.ticker === company);
    if (!stock) {
        res.send({ error: "Company not found" });
        return;
    }

    let rangeNum = 30;
    try {
        rangeNum = parseInt(range as string);
    } catch (err) {
        res.send({ error: "Invalid range" });
        return;
    }

    res.send({ investmentRating: findInvestmentRating(stock?.data, rangeNum) });
});

// hosts our frontend on the route of localhost:8000
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Listening on port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
