import React from "react";

function StocksList({ listClickHandler, stocks = {} }: any) {
    /**
     * Method that handles stock click
     * 
     * @param listElement element that was clicked on
     * @param ticker company ticker
     */
    const handleCick = (listElement: any, ticker: string) => {
        // Remove previous active list element
        Array.from(
            document.querySelectorAll(".list-group-item.active")
        ).forEach((el) => el.classList.remove("active"));

        // Get the stock data
        listClickHandler(ticker);

        // Add class active to element
        listElement.classList.add("active");
    };

    return (
        <ul className="list-group" style={stockListStyle}>
            {stocks?.map((stock: any) => {
                // set base case
                if (!stock) return <></>;

                // extract necessary props
                const {
                    name,
                    ticker,
                    investmentRating,
                    data: [{ price: latestPrice }, { price: yesterdayPrice }],
                } = stock;

                // get price class name
                const classPrice =
                    latestPrice < yesterdayPrice ? "p-red" : "p-green";

                return (
                    <li
                        key={ticker}
                        className="list-group-item p-2"
                        onClick={(e) => handleCick(e.currentTarget, ticker)}
                    >
                        <div className="row">
                            <div className="col-8">
                                <h5 className="ticker">{ticker}</h5>
                                <small className="name">{name}</small>
                            </div>
                            <div className="col-4 d-flex flex-column align-items-end">
                                <h5 className={classPrice}>
                                    ${latestPrice?.toFixed(2)}
                                </h5>
                                <span
                                    className={`badge ${
                                        investmentRating < 0
                                            ? "badge-overpriced"
                                            : "badge-underpriced"
                                    }`}
                                >
                                    {investmentRating >= 0
                                        ? "underpriced"
                                        : "overpriced"}
                                </span>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

const stockListStyle = {
    height: "100%",
    background: "rgb(222, 222, 222)",
}

export default StocksList;
