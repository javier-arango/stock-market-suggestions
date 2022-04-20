import React, { CSSProperties } from "react";
import StocksList from "./StocksList/StocksList";
import SearchStock from "./SearchStock/SearchStock";
import SortSelection from "./SortSelection/SortSelection";
import Toast from "./Toast/Toast";
import logo from "./../../../assets/logo.svg";
import "./sidebar.css";

function SideBar({
    algorithms,
    sortingOrders,
    selAlgo,
    changeAlgorithm,
    selOrder,
    changeSortingOrder,
    loading,
    timeElapsed,
    searchStock,
    stocks,
    stockSelected,
    listClickHandler,
}: any) {
    return (
        <div
            id="sidebar"
            className="col-4 h-100 p-0 d-flex flex-column overflow-hidden"
        >
            <div className="w-100 my-2 d-flex justify-content-center">
                <img src={logo} width="150" alt="logo" />
            </div>
            <SortSelection
                algorithms={algorithms}
                sortingOrders={sortingOrders}
                selAlgo={selAlgo}
                changeAlgorithm={changeAlgorithm}
                selOrder={selOrder}
                changeSortingOrder={changeSortingOrder}
            />
            {!loading ? (
                <Toast
                    selAlgo={selAlgo}
                    selOrder={selOrder}
                    timeElapsed={timeElapsed}
                />
            ) : null}
            <SearchStock searchStock={searchStock} />
            {stocks.length === 0 || loading ? (
                <div className="w-100 h-50 d-flex justify-content-center align-items-center">
                    {
                        // Toggle between loader or empty search result
                        loading ? (
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                        ) : (
                            <p style={notFoundTextStyle}>
                                No result for your search
                            </p>
                        )
                    }
                </div>
            ) : (
                <StocksList
                    stocks={stocks}
                    stockSelected={stockSelected}
                    listClickHandler={listClickHandler}
                />
            )}
        </div>
    );
}

const notFoundTextStyle: CSSProperties = {
    color: "#ec2020",
};

export default SideBar;
