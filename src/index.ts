import express, { Request, Response } from "express";
import getProcessedData from "./types/readFile";
import { fileURLToPath } from "url";
import path from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

// // Have Node serve the files for our built React app
app.use(express.static("public"));
app.use(express.static(path.resolve(__dirname, "../client/build")));

// app.get("/api", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });

// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Hello from your Express.js server!!</h1>");
});

const getData = async (res_: any) => {
  const data = await getProcessedData();

  res_.send(data);
};

// console.log(getData());

// Stocks route | GET requests is used for retrieving resources from a server
app.get("/stocks", (req, res) => {
  getData(res);
});

// Where the server is listening for new requests
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
