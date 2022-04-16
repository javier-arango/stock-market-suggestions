import React from 'react';

function StockData() {

  return (
    <div className="row w-100 h-100 pb-5 mt-4 d-flex justify-content-center">
        <div className="col-10 chart-info w-80 rounded">
          <div className="d-flex flex-row justify-content-between border-bottom p-2">
            <div className="">
              <h5 className="sticker">AAPL</h5>
              <small className="name">Apple</small>
            </div>
            <div className="">
              <h5 className="rating">DCF</h5>
              <small className="recom">Apple</small>
            </div>
          </div>
          <div className=""></div>
          <div className="d-flex flex-row justify-content-end border-top p-2">
            <small className="t-frame t-active">1W</small>
            <small className="t-frame">1M</small>
            <small className="t-frame">3M</small>
            <small className="t-frame">6M</small>
            <small className="t-frame">1YR</small>
          </div>
        </div>
      </div>
  );
}

export default StockData;
