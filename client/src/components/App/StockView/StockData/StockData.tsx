import React from "react";
import {
    LineChart,
    ResponsiveContainer,
    Line,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
} from "recharts";

function StockData(props: any) {
    return (
        <div className="row w-100 d-flex justify-content-center">
            <div className="col-10 chart-info w-80 rounded">
                {Object.keys(props.stock).length === 0 ? (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center no-stock-selected">
                        Select a stock from the list
                    </div>
                ) : (
                    <>
                        <div className="d-flex flex-row justify-content-between border-bottom pt-2 pb-2 align-items-center">
                            <div className="">
                                <h4 className="sticker" style={{ margin: 0 }}>
                                    {props.stock.ticker}
                                </h4>
                                <small className="name" style={{ margin: 0 }}>
                                    {props.stock.name}
                                </small>
                            </div>
                            <div style={{ color: "white" }}>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "0.8rem",
                                        fontWeight: "bold",
                                        textAlign: "end",
                                    }}
                                >
                                    Current Price
                                </p>
                                <h4
                                    className={
                                        props.framedRating < 0
                                            ? "p-red"
                                            : "p-green"
                                    }
                                    style={{ margin: 0, textAlign: "end" }}
                                >
                                    ${props.stock.data?.[0].price.toFixed(2)}
                                </h4>
                            </div>
                        </div>
                        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <ResponsiveContainer height={400} width="100%">
                                <LineChart data={props.framedData}>
                                    <XAxis dataKey="date" stroke="white" />
                                    <YAxis
                                        stroke="white"
                                        domain={props.range}
                                    />
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
                            {props.timeFrame.map(
                                (time: string, index: number) => {
                                    const isActive =
                                        index === props.currentTime
                                            ? "t-active"
                                            : "";
                                    return (
                                        <small
                                            key={index}
                                            className={`t-frame ${isActive}`}
                                            onClick={() =>
                                                props.changeTime(index)
                                            }
                                        >
                                            {time}
                                        </small>
                                    );
                                }
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default StockData;
