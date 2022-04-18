import React from "react";
import StocksList from "../StocksList/StocksList";
import logo from "./../../assets/logo.svg";
import "./sidebar.css";

function SideBar(props: any) {
  return (
    <div id="sidebar" className="col-4 h-100 p-0">
      <div className="w-100 my-2 d-flex justify-content-center">
        <img src={logo} width="150" alt="logo" />
      </div>
      <div className="form-floating m-3">
        <input type="text" className="form-control" placeholder="Apple" />
        <label htmlFor="floatingInput">Search for a stock</label>
      </div>

      <div className="w-100 h-20 d-flex ms-3 my-5">
        <p className="d-flex align-items-center">Sort Algorithm:</p>
        <input
          type="radio"
          className="btn-check"
          name="options-outlined"
          id="merge-sort"
          autoComplete="off"
          checked
        />
        <label className="btn btn-outline-secondary ms-3" htmlFor="merge-sort">
          Merge Sort
        </label>

        <input
          type="radio"
          className="btn-check"
          name="options-outlined"
          id="quick-sort"
          autoComplete="off"
        />
        <label className="btn btn-outline-secondary ms-3" htmlFor="quick-sort">
          Quick Sort
        </label>
      </div>
      {props.stocks.length == 0 ? (
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
