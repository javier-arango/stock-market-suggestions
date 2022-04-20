import React, { useState, useEffect } from "react";
import "./App.css";
import fakeData from './fake-data.json'
import SideBar from "./SideBar/SideBar";
import StockView from "./StockView/StockView";

const algorithms = ["radix", "quick"];
const sortingOrders = ["asc", "dsc"];

function App() {
  const [sortAlgorithm, setSortAlgorithm] = useState("");
  const [sortingOrder, setSortingOrder] = useState("");
  const [stocks, setStocks] = useState(fakeData as Array<any>);
  const [stockToView, setStockToView] = useState({});
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
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
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
        />
        <StockView stock={stockToView} />
    </div>
  );
};

export default App;
