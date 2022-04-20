import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./SideBar/SideBar";
import StockView from "./StockView/StockView";

const algorithms = ["radix", "quick"];
const sortingOrders = ["asc", "dsc"];

function App() {
    // state
    const [loading, setLoading] = useState(true); // determines if app is loading
    const [time, setTime] = useState(0); // time it took to get data
    const [stocks, setStocks] = useState<Array<any>>([]); // list of stocks
    const [sortAlgorithm, setSortAlgorithm] = useState("radix"); // algorithm to be used in processing
    const [sortingOrder, setSortingOrder] = useState(""); // sorting order in stock list
    const [stockToView, setStockToView] = useState({}); // stock in view
    const [searchValue, setSearchValue] = useState(""); // search string
    const [searchResults, setSearchResults] = useState<Array<any>>([]); // results of search

    // Gets the data with perfered date sorting method
    useEffect(() => {
        if (!loading) setLoading(true);
        let endpoint: string = "/api/data?method=";

        if (sortAlgorithm === "quick") {
            endpoint += "quicksort";
        } else if (sortAlgorithm === "radix") {
            endpoint += "radixsort";
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
                setLoading(false);
                setStocks(data);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortAlgorithm]);

    // sorts the stocks based on sorting order
    useEffect(() => {
        // sorts the stock data by investment rating based on order
        if (sortingOrder === "asc") {
            setStocks([
                ...stocks.sort((a, b) => {
                    return a.investmentRating - b.investmentRating;
                })
            ]);
        } else if (sortingOrder === "dsc") {
            setStocks([
                ...stocks.sort((a, b) => {
                    return b.investmentRating - a.investmentRating;
                }),
            ]);
        }
    }, [sortingOrder, stocks]);

    /**
     * Get the stock data needed for stockVIew When user clicks one stockk in the list
     *
     * @param ticker the ticker of the stock to view
     */
    const getStockData = (ticker: string) => {
        // Get the stock object from the stocks data
        // eslint-disable-next-line array-callback-return
        const stockData = stocks.filter((stock: any) => {
            if (stock.ticker === ticker) return stock;
        });

        // Update the stock to view state
        setStockToView(stockData[0]);
    };

    /**
     * Handle the click of the button to change the sorting algorithm\
     *
     * @param algo sorting algorithm to use in data processing
     */
    const changeAlgorithm = (algo: string) => {
        setSortAlgorithm(() => algo);
    };

    /**
     * Handle the click of the button to change the sorting orde
     *
     * @param order sorting order in stock list
     */
    const changeSortingOrder = (order: string) => {
        setSortingOrder(order);
    };

    /**
     * Perform search on the list of stocks and update the list with results of search
     *
     * @param searchTerm word to search stock array for
     */
    const searchStock = (searchTerm: string) => {
        setSearchValue(searchTerm);
        setSearchResults([]);
        const results = stocks.filter((stock: any) => {
            if (
                stock.name.toUpperCase().indexOf(searchTerm.toUpperCase()) >
                    -1 ||
                stock.ticker.toUpperCase().indexOf(searchTerm.toUpperCase()) >
                    -1
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
                loading={loading}
                selAlgo={sortAlgorithm}
                sortingOrders={sortingOrders}
                selOrder={sortingOrder}
                changeAlgorithm={changeAlgorithm}
                timeElapsed={time}
                changeSortingOrder={changeSortingOrder}
                searchStock={searchStock}
                stockSelected={stockToView}
            />
            <StockView stock={stockToView} />
        </div>
    );
}

export default App;
