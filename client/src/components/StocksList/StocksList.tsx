import React from "react";

function StocksList(props: any) {
  const handleCick = (listElement: any, sticker: string) => {
    // Remove previous active list element
    Array.from(document.querySelectorAll(".list-group-item.active")).forEach(
      (el) => el.classList.remove("active")
    );

    // Get the stock data
    props.listClickHandler(sticker);

    // Add class active to element
    listElement.classList.add("active");
  };

  return (
    <ul className="list-group">
      {props.stocks.map((stock: any) => {
        const { name, ticker, investmentRating, data: [{ price: latestPrice }, { price: yesterdayPrice }] } = stock;
        const classPrice = latestPrice < yesterdayPrice ? "p-red" : "p-green";

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
                <h5 className={classPrice}>${latestPrice?.toFixed(2)}</h5>
                <span className={`badge ${classPrice}`}>
                  {investmentRating < 0 ? "underpriced" : "overpriced"}
                  <span className="badge">
                    {investmentRating.toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default StocksList;
