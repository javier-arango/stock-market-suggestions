import React from "react";

function StockMarketInfo(props: any) {
    const { framedRating } = props;
    let windowOfTime: string;

    switch (props.timeFrame[props.currentTime]) {
        case "3M":
            windowOfTime = "3 months";
            break;
        case "6M":
            windowOfTime = "6 months";
            break;
        case "1YR":
            windowOfTime = "1 year";
            break;
        case "5YR":
            windowOfTime = "5 years";
            break;
        default:
            windowOfTime = "month";
            break;
    }

    console.log(framedRating);

    return (
        <div className="row w-100 mb-3 d-flex justify-content-around">
            <div className="col-10 market-info w-80 rounded pt-2 pb-2">
                {framedRating !== undefined ? (
                    <div
                        className="border-bottom"
                        style={{ color: "white", marginBottom: 10 }}
                    >
                        <h4>
                            Investment Rating:{" "}
                            <span
                                className={`${
                                    framedRating < 0 ? "p-red" : "p-green"
                                }`}
                            >
                                {framedRating}
                            </span>
                        </h4>
                        <p>
                            This stock has on average been{" "}
                            <strong>
                                {framedRating < 0
                                    ? "over-priced"
                                    : "under-priced"}
                            </strong>{" "}
                            for the past {windowOfTime} and it seems to be a{" "}
                            <strong>{framedRating < 0 ? "bad" : "good"}</strong>{" "}
                            stock to buy for the given time frame.
                        </p>
                    </div>
                ) : null}
                <p style={{ color: "white", margin: 0, marginBottom: 5 }}>
                    We derive what we call the{" "}
                    <strong>investment rating</strong> of a stock from the
                    relationship between its intrinsic (or discounted cashflow),
                    and market value. By getting the average gap between these
                    two values and dividing it by its average price, we are able
                    to get a number representative of how good of it is as an
                    investment. The higher the rating the better.
                </p>
                <p style={{ color: "white", margin: 0 }}>
                    <strong>Note:</strong> This rating is a percentage, meaning it
					can go past 100 or below 0.
                </p>
            </div>
        </div>
    );
}

export default StockMarketInfo;
