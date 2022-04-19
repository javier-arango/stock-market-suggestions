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
    const [stocks, setStocks] = useState([
      {
        name: "Apple",
        ticker: "AAPL",
        data: [
          {
            price: 23.45657657,
            dcf: -2.34543543,
          },
        ],
      },
      {
        name: "Palantir",
        ticker: "PLTR",
        data: [
          {
            price: 23.45657657,
            dcf: -2.34543543,
          },
        ],
      },
      {
        name: "Sofi",
        ticker: "SOFI",
        data: [
          {
            price: 23.45657657,
            dcf: 2.34543543,
          },
        ],
      },
      {
        name: "Nio car",
        ticker: "NIO",
        data: [
          {
            price: 23.45657657,
            dcf: -2.34543543,
          },
        ],
      },
      {
        name: "Snapchat",
        ticker: "SNAP",
        data: [
          {
            price: 23.45657657,
            dcf: -2.34543543,
          },
        ],
      },
    ]);
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

    // Get the data of the stocks
    // useEffect(() => {
    //     fetch("/api/data")
    //         .then((res) => res.json())
    //         .then((data) => setStocks(data));
    // }, []);

    // Get the stock data needed for stockVIew When user clicks one stockk in the list
    const getStockData = (ticker: string) => {
        // Get the stock object from the stocks data
        const stockData = stocks.filter((stock:any) => {
          if(stock.ticker == ticker) return stock;
        });

        // Update the stock to view state
        setStockToView(stockData[0]);
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
