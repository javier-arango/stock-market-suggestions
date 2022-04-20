import React, { useState, useEffect } from "react";
import "./App.css";
import fakeData from "./fake-data.json";
import SideBar from "./SideBar/SideBar";
import StockView from "./StockView/StockView";

const markets = ["DOW JONES", "NASDAQ", "S&P 500"];
const algorithms = ["radix", "quick"];
const sortingOrders = ["asc", "dsc"];

// Get a random number from -20 to 20 for the percentage
const getRandomPercent = () => {
  const number = Math.random() * (20 - -20) + -20;
  return number.toFixed(2);
};

// Get a random number from 3000 to 16000 for the current value
const getRandomNumber = () => {
  const number = Math.random() * (16000 - 3000) + 3000;
  return number.toFixed(2);
};

// fakeData as Array<any>

function App() {
  const [sortAlgorithm, setSortAlgorithm] = useState("");
  const [time, setTime] = useState(0);
  const [sortingOrder, setSortingOrder] = useState("");
  const [stocks, setStocks] = useState([]);
  const [stockToView, setStockToView] = useState({});
  const [marketInfo, setMarketInfo] = useState(
    markets.map((market) => {
      return {
        name: market,
        index: getRandomNumber(),
        percentage: getRandomPercent(),
      };
    })
  );
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Array<any>>([]);

  // Get the data of the stocks
  useEffect(() => {
    let endpoint: string = "/api/data/";

    if (sortAlgorithm === "quick") {
      endpoint += "quicksort";
      if (sortingOrder === "asc") endpoint += "/asc";
    } else if (sortAlgorithm === "radix") {
      endpoint += "radixsort";
      if (sortingOrder === "asc") endpoint += "/asc";
    }

    // get the current time
    const start = new Date().getTime();
    fetch(endpoint)
      .then((res) => {
        // Get the current time
        const end = new Date().getTime();
        const timeElapsed = end - start;
        setTime(timeElapsed);
        return res.json();
      })
      .then((data) => {
        setStocks(data);
      });
  }, [sortAlgorithm, sortingOrder]);

  // Get the stock data needed for stockVIew When user clicks one stockk in the list
  const getStockData = (ticker: string) => {
    // Get the stock object from the stocks data
    // eslint-disable-next-line array-callback-return
    const stockData = stocks.filter((stock: any) => {
      if (stock.ticker === ticker) return stock;
    });

    // Update the stock to view state
    setStockToView(stockData[0]);
  };

  // Handle the click of the button to change the sorting algorithm
  const changeAlgorithm = (algo: string) => {
    setSortAlgorithm(() => algo);
  };

  // Handle the click of the button to change the sorting order
  const changeSortingOrder = (order: string) => {
    setSortingOrder(order);
  };

  // Perform search on the list of stocks and update the list with results of search
  const searchStock = (searchTerm: string) => {
    setSearchValue(searchTerm);
    setSearchResults([]);
    const results = stocks.filter((stock: any) => {
      if (
        stock.name.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1 ||
        stock.ticker.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
      ) {
        return true;
      }
      return false;
    });
    // Update result state
    setSearchResults(results);
  };

  return (
    <div id="container" className="app">
      <SideBar
        stocks={searchValue === "" ? stocks : searchResults}
        listClickHandler={getStockData}
        algorithms={algorithms}
        selAlgo={sortAlgorithm}
        sortingOrders={sortingOrders}
        selOrder={sortingOrder}
        changeAlgorithm={changeAlgorithm}
        changeSortingOrder={changeSortingOrder}
        searchStock={searchStock}
        stockSelected={stockToView}
        timeElapsed={time}
        searching={searchValue === "" ? false : true}
      />
      <StockView stock={stockToView} marketInfo={marketInfo} />
    </div>
  );
}

export default App;
