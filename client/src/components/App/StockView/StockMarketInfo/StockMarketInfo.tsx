import React from "react";

function StockMarketInfo(props: any) {
  return (
    <div className="row w-100 mt-5 d-flex justify-content-around">
      <div className="col-10 market-info w-80 rounded d-flex">
        {props.marketInfo.map((market: any) => {
          const color = Number(market.percentage) < 0 ? "p-red" : "p-green";

          return (
            <div
              key={market.name}
              className="col-4 d-flex flex-column align-items-center pt-2 rounded-3"
            >
              <h6>{market.name}</h6>
              <p className="num">{market.index}</p>
              <p className={color}>{market.percentage}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StockMarketInfo;
