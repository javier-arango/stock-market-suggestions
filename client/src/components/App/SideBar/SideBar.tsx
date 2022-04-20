import React from "react";
import StocksList from "./StocksList/StocksList";
import SearchStock from "./SearchStock/SearchStock";
import SortSelection from "./SortSelection/SortSelection";
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
      <SearchStock searchStock={props.searchStock} />
      {props.stocks.length === 0 ? (
        <div className="w-100 h-50 d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <StocksList
          stocks={props.stocks}
          listClickHandler={props.listClickHandler}
        />
      )}
    </div>
  );
}

export default SideBar;
