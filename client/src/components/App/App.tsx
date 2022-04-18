import React, { useState, useEffect } from "react";
import "./app.css";
import SideBar from "../SideBar/SideBar";
import StockView from "../StockView/StockView";

const markets = ["DOW JONES", "NASDAQ", "S&P 500"];
const algorithms = ["merge", "quick"];

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

function App() {
    const [sortAlgorithm, setSortAlgorithm] = useState(algorithms[0]);
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

    useEffect(() => {
        fetch("/api/data")
            .then((res) => res.json())
            .then((data) => setStocks(data));
    }, []);

    // Get the list of stocks for the stockList component
    const getStocks = () => {
        // Will perform a request to server to get the list of stocks
        // See template of Data to be returned about the component function
        // Will use the sortAlgorithm state to know which sort algorith to use
    };

    // Get the stock data needed for stockVIew When user clicks one stockk in the list
    const getStockData = (sticker: string) => {
        // Debugging
        console.log(sticker + " is requesting to be viewed");

        // Test setting template data
        setStockToView(() => {
            return {
                investmentRating: 23,
                name: "Palantir",
                sticker: "PLTR",
                data: [{ date: "2022-01-01", price: 20.9, dcf: 23.4 }],
            };
        });
    };

    // Handle the click of the button to change the sorting algorithm
    const changeAlgorithm = (algo: string) => {
        // DEbugging
        console.log(algo);
        setSortAlgorithm(() => algo);
    };

  const searchStock = (searchValue: string) => {
    
  };

  return (
    <div id="container" className="container-fluid vh-100">
      <div className="row vh-100">
        <SideBar
          stocks={stocks}
          listClickHandler={getStockData}
          algorithms={algorithms}
          selAlgo={sortAlgorithm}
          changeAlgorithm={changeAlgorithm}
        />
        <StockView stock={stockToView} marketInfo={marketInfo} />
      </div>
    </div>
  );
}

export default App;
