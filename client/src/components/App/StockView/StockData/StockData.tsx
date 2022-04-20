import React, { CSSProperties } from "react";
import {
    LineChart,
    ResponsiveContainer,
    Line,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
} from "recharts";

function StockData({
    stock,
    currentTime,
    changeTime,
    timeFrame,
    framedRating,
    framedData,
    range,
}: any) {
    return (
        <div className="row w-100 d-flex justify-content-center">
            <div className="col-10 chart-info w-80 rounded">
                {Object.keys(stock).length === 0 ? (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center no-stock-selected">
                        Select a stock from the list
                    </div>
                ) : (
                    <>
                        <div className="d-flex flex-row justify-content-between border-bottom pt-2 pb-2 align-items-center">
                            <div className="">
                                <h4 className="sticker" style={startTextStyle}>
                                    {stock.ticker}
                                </h4>
                                <small className="name" style={startTextStyle}>
                                    {stock.name}
                                </small>
                            </div>
                            <div style={endTextContainerStyle}>
                                <p style={endTextTitleStyle}>Current Price</p>
                                <h4
                                    className={
                                        framedRating < 0 ? "p-red" : "p-green"
                                    }
                                    style={endTextPriceStyle}
                                >
                                    ${stock.data?.[0].price.toFixed(2)}
                                </h4>
                            </div>
                        </div>
                        <div style={graphWrapperStyle}>
                            <ResponsiveContainer height={400} width="100%">
                                <LineChart data={framedData}>
                                    <XAxis dataKey="date" stroke="white" />
                                    <YAxis stroke="white" domain={range} />
                                    <Legend />
                                    <Tooltip />
                                    <Line
                                        dot={false}
                                        strokeWidth={2}
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#8884d8"
                                    />
                                    <Line
                                        dot={false}
                                        strokeWidth={2}
                                        type="monotone"
                                        dataKey="dcf"
                                        stroke="#82ca9d"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="d-flex flex-row justify-content-end border-top p-2">
                            {timeFrame.map((time: string, index: number) => {
                                const isActive =
                                    index === currentTime ? "t-active" : "";
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

const startTextStyle: CSSProperties = {
    margin: 0,
};

const endTextContainerStyle: CSSProperties = {
    color: "white",
};

const endTextTitleStyle: CSSProperties = {
    margin: 0,
    fontSize: "0.8rem",
    fontWeight: "bold",
    textAlign: "end",
};

const endTextPriceStyle: CSSProperties = {
    margin: 0,
    textAlign: "end",
};

const graphWrapperStyle: CSSProperties = {
    paddingTop: 20,
    paddingBottom: 20,
};

export default StockData;
