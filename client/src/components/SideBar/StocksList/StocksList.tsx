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
        const name = stock.name;
        const ticker = stock.ticker;
        const price = stock.data?.[0]?.price.toFixed(2);
        const dcf = stock.data?.[0]?.dcf;
        const classRating = dcf < 0 ? "badge-underpriced" : "badge-overpriced";
        const classPrice = stock.data?.[0]?.price < stock.data?.[1]?.price ? "p-red" : "p-green";
        const isActive = stock.ticker == props.stockSelected ? "active" : "";

        return (
          <li
            key={ticker}
            className={`list-group-item p-2 ${isActive}`}
            onClick={(e) => handleCick(e.currentTarget, ticker)}
          >
            <div className="row">
              <div className="col-8">
                <h5 className="ticker">{ticker}</h5>
                <small className="name">{name}</small>
              </div>
              <div className="col-4 d-flex flex-column align-items-end">
                <h5 className={classPrice}>${price}</h5>
                <span className={`badge ${classRating}`}>
                  {dcf < 0 ? "underpriced" : "overpriced"}
                  <span className="badge">{dcf.toFixed(2)}</span>
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
