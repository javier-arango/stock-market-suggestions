import React, { useState } from "react";

function StockMarketInfo(props: any) {
  return (
    <div className="row w-100 mt-5 d-flex justify-content-around">
      {props.marketInfo.map((market: any) => {
        const color = Number(market.percentage) < 0 ? "p-red" : "p-green";

        return (
          <div
            key={market.name}
            className="col-2 market-info d-flex flex-column align-items-center pt-2 rounded-3"
          >
            <h6>{market.name}</h6>
            <p className="num">{market.index}</p>
            <p className={color}>{market.percentage}%</p>
          </div>
        );
      })}
    </div>
  );
}

export default StockMarketInfo;
