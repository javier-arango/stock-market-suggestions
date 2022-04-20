import React, { useState, useEffect } from "react";
import StockMarketInfo from "./StockMarketInfo/StockMarketInfo";
import StockData from "./StockData/StockData";
import "./stockview.css";

function StockView(props: any) {
    const [currentTime, setCurrentTime] = useState(4);
    const [range, setRange] = useState([0, 100]);
    const [framedRating, setFrameRating] = useState(
        props?.stock?.investmentRating
    );
    const [framedData, setFramedData] = useState<Array<any>>([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const timeFrame = ["1M", "3M", "6M", "1YR", "5YR"];

    useEffect(() => {
        if (!props?.stock || !props.stock.data?.length) return;

        // Get the data of the stocks
        let increment: number, daysToRender: number;

        // get the time frame
        switch (timeFrame[currentTime]) {
            case "3M":
                increment = 3;
                daysToRender = 90;
                break;
            case "6M":
                increment = 6;
                daysToRender = 180;
                break;
            case "1YR":
                increment = 5;
                daysToRender = 365;
                break;
            case "5YR":
                increment = 25;
                daysToRender = 1825;
                break;
            default:
                increment = 1;
                daysToRender = 30;
                break;
        }

        // get the data
        fetch(`/api/rating?company=${props.stock.ticker}&range=${daysToRender}`)
            .then((res) => res.json())
            .then((data) => setFrameRating(data.investmentRating));

        // populate the data
        let min = props.stock.data[0],
            max = 0;
        const data: Array<any> = [];
        for (let i = 0; i < daysToRender; i += increment) {
            const { price, dcf, date } = props.stock.data[i];
            min = Math.min(min, price, dcf);
            max = Math.max(max, price, dcf);
            data.push({
                price: price.toFixed(2),
                dcf: dcf.toFixed(2),
                date: new Date(date).toLocaleDateString("en-US", {
                    day: "numeric",
                    year: "2-digit",
                    month: "short",
                }),
            });
        }

        // set the framed data
        const offset = max * 0.3;
        min = Math.floor(min - offset > 0 ? min - offset : 0);
        max = Math.ceil(max + offset);
        setFramedData(data.reverse());
        setRange([min, max]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime, props.stock.data]);

    return (
        <div
            id="stock-view"
            className="col d-flex flex-column align-items-center justify-content-center"
        >
            <StockMarketInfo
                marketInfo={props.marketInfo}
                framedRating={framedRating}
                timeFrame={timeFrame}
                currentTime={currentTime}
            />
            <StockData
                stock={props.stock}
                changeTime={setCurrentTime}
                currentTime={currentTime}
                timeFrame={timeFrame}
                range={range}
                framedRating={framedRating}
                framedData={framedData}
            />
        </div>
    );
}

export default StockView;
