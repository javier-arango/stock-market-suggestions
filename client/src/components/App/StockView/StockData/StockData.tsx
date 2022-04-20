import React, { useState, useEffect } from "react";
import { LineChart, ResponsiveContainer, Line, Tooltip, XAxis, YAxis, Legend } from 'recharts';

function StockData(props: any) {
  const [currentTime, setCurrentTime] = useState(0);
  const [range, setRange] = useState([0, 100]);
  const [framedRating, setFrameRating] = useState(props?.stock?.investmentRating);
  const [framedData, setFramedData] = useState<Array<any>>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const timeFrame = ["1M", "3M", "6M", "1YR", "5YR"];

  useEffect(() => {
    if (!props?.stock || !props.stock.data?.length) return;

    // Get the data of the stocks
    let increment: number, daysToRender: number;

    // get the time frame
    switch (timeFrame[currentTime]) {
      case "3M": increment = 3; daysToRender = 90; break;
      case "6M": increment = 6; daysToRender = 180; break;
      case "1YR": increment = 5; daysToRender = 365; break;
      case "5YR": increment = 25; daysToRender = 1825; break;
      default: increment = 1; daysToRender = 30; break;
    }

    // get the data
    fetch(`/api/rating?company=${props.stock.company}&range=${daysToRender}`)
      .then(res => res.json())
      .then(data => setFrameRating(data.investmentRating));

    // populate the data
    let min = props.stock.data[0], max = 0;
    const data: Array<any> = [];
    for (let i = 0; i < daysToRender; i += increment) {
      const { price, dcf, date } = props.stock.data[i];
      min = Math.min(min, price, dcf);
      max = Math.max(max, price, dcf);
      data.push({
        price: price.toFixed(2),
        dcf: dcf.toFixed(2),
        date: new Date(date).toLocaleDateString("en-US", {day: "numeric", year: "2-digit", month: "short"}),
      });
    }

    // set the framed data
    const offset = max * .3;
    min = Math.floor(min - offset > 0 ? min - offset : 0);
    max = Math.ceil(max + offset);
    setFramedData(data.reverse());
    setRange([min, max]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime, props.stock.data]);

  const changeTime = (index: number) => {
    setCurrentTime(() => {
      return index;
    });
  };

  return (
    <div className="row w-100 pb-5 mt-4 d-flex justify-content-center">
      <div className="col-10 chart-info w-80 rounded">
        {Object.keys(props.stock).length === 0 ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center no-stock-selected">
            Select a stock from the list
          </div>
        ) : (
          <>
            <div className="d-flex flex-row justify-content-between border-bottom p-2">
              <div className="">
                <h5 className="sticker">{props.stock.ticker}</h5>
                <small className="name">{props.stock.name}</small>
              </div>
              <div className="">
                <span
                  className={`badge ${
                    props.stock?.investmentRating > 0
                      ? "badge-underpriced"
                      : "badge-overpriced"
                  }`}
                >
                  {props.stock?.investmentRating > 0
                    ? "underpriced"
                    : "overpriced"}
                  <span className="badge">
                    {props.stock?.investmentRating?.toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
            <div style={{paddingTop: 20, paddingBottom: 20 }}>
              <ResponsiveContainer height={450} width="100%">
                <LineChart data={framedData}>
                  <XAxis dataKey="date" stroke="white"/>
                  <YAxis stroke="white" domain={range}/>
                  <Legend />
                  <Tooltip />
                    <Line dot={false} strokeWidth={2} type="monotone" dataKey="price" stroke="#8884d8" />
                    <Line dot={false} strokeWidth={2} type="monotone" dataKey="dcf" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="d-flex flex-row justify-content-end border-top p-2">
              {timeFrame.map((time: string, index) => {
                const isActive = index === currentTime ? "t-active" : "";
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
