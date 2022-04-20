import React from "react";
import StocksList from "./StocksList/StocksList";
import SearchStock from "./SearchStock/SearchStock";
import SortSelection from "./SortSelection/SortSelection";
import Toast from "./Toast/Toast";
import logo from "./../../../assets/logo.svg";
import "./sidebar.css";

function SideBar(props: any) {
  return (
    <div
      id="sidebar"
      className="col-4 h-100 p-0 d-flex flex-column overflow-hidden"
    >
      <div className="w-100 my-2 d-flex justify-content-center">
        <img src={logo} width="150" alt="logo" />
      </div>
      <SortSelection
        algorithms={props.algorithms}
        sortingOrders={props.sortingOrders}
        selAlgo={props.selAlgo}
        changeAlgorithm={props.changeAlgorithm}
        selOrder={props.selOrder}
        changeSortingOrder={props.changeSortingOrder}
      />
      <Toast
        selAlgo={props.selAlgo}
        selOrder={props.selOrder}
        timeElapsed={props.timeElapsed}
      />
      <SearchStock searchStock={props.searchStock} />
      {props.stocks.length === 0 ? (
        <div className="w-100 h-50 d-flex justify-content-center align-items-center">
          {
            // Toggle between loader or empty search result
            props.searching == false ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <p style={{ color: "#ec2020" }}>No result for your search</p>
            )
          }
        </div>
      ) : (
        <StocksList
          stocks={props.stocks}
          stockSelected={props.stockSelected}
          listClickHandler={props.listClickHandler}
        />
      )}
    </div>
  );
}

export default SideBar;
