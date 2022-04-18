import React, { useState, useEffect } from "react";

function StockData(props: any) {
  const [currentTime, setCurrentTime] = useState(1);
  const timeFrame = ["1M", "3M", "6M", "1YR", "5YR"];

  const changeTime = (index: number) => {
    setCurrentTime(() => {
      return index;
    });
  };

  return (
    <div className="row w-100 h-100 pb-5 mt-4 d-flex justify-content-center">
      <div className="col-10 chart-info w-80 rounded">
        {Object.keys(props.data).length === 0 ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center no-stock-selected">
            Select a stock from the list
          </div>
        ) : (
          <>
            <div className="d-flex flex-row justify-content-between border-bottom p-2">
              <div className="">
                <h5 className="sticker">{props.data.sticker}</h5>
                <small className="name">{props.data.name}</small>
              </div>
              <div className="">
                <h5 className="rating">Investment Rating</h5>
                <small className="recom">Apple</small>
              </div>
            </div>
            <div className=""></div>
            <div className="d-flex flex-row justify-content-end border-top p-2">
              {timeFrame.map((time: string, index) => {
                const isActive = index == currentTime ? "t-active" : "";
                return (
                  <small
                    key={index}
                    className={`t-frame ${isActive}`}
                    onClick={() => changeTime(index)}
                  >
                    {time}
                  </small>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StockData;
