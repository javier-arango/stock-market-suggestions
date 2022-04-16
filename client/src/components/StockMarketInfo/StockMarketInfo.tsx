import React from 'react';

function StockMarketInfo() {

  return (
    <div className="row w-100 mt-5 d-flex justify-content-around">
        <div className="col-2 market-info d-flex flex-column align-items-center pt-2 rounded-3">
          <h6>DOW JONES</h6>
          <p className="num">3456.00</p>
          <p className="p-green">+1.75%</p>
        </div>
        <div className="col-2 market-info d-flex flex-column align-items-center pt-2 rounded">
          <h6>NASDAQ</h6>
          <p className="num">3456.00</p>
          <p className="p-red">+1.75%</p>
        </div>
        <div className="col-2 market-info d-flex flex-column align-items-center pt-2 rounded">
          <h6>S&P 500</h6>
          <p className="num">3456.00</p>
          <p className="p-green">+1.75%</p>
        </div>
      </div>
  );
}

export default StockMarketInfo;
