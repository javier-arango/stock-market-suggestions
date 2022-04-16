import React from 'react';
import logo from './../../assets/logo.svg';
import './sidebar.css';

function SideBar() {

  return (
    <div id="sidebar" className="col-4 h-100 p-0">
        <div className="w-100 my-2 d-flex justify-content-center">
            <img src={logo}  width="150" alt="logo" />
        </div>
        <div className="form-floating m-3">
        <input type="text" className="form-control" placeholder="Apple"/>
        <label htmlFor="floatingInput">Search for a stock</label>
        </div>

        <div className="w-100 h-20 d-flex ms-3 my-5">
        <p className="d-flex align-items-center">Sort Algorithm:</p>
        <input type="radio" className="btn-check" name="options-outlined" id="merge-sort" autoComplete="off" checked />
        <label className="btn btn-outline-secondary ms-3" htmlFor="merge-sort">Merge Sort</label>

        <input type="radio" className="btn-check" name="options-outlined" id="quick-sort" autoComplete="off" />
        <label className="btn btn-outline-secondary ms-3" htmlFor="quick-sort">Quick Sort</label>
        </div>

        <ul className="list-group">
            <li className="list-group-item active p-2">
            <div className="row">
                <div className="col-8">
                <h5 className="sticker">AAPL</h5>
                <small className="name">Apple</small>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                <h5 className="p-green">$240.00</h5>
                </div>
            </div>
            </li>
            <li className="list-group-item p-2">
            <div className="row">
                <div className="col-8">
                <h5 className="sticker">AAPL</h5>
                <small className="name">Apple</small>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                <h5 className="p-red">$240.00</h5>
                </div>
            </div>
            </li>
        </ul>
    </div>
  );
}

export default SideBar;
