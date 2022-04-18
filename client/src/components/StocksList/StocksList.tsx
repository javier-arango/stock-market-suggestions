import React from "react";

function StocksList(props: any) {
  const handleCick = (listElement: any, sticker: string) => {
    // Remove previous active list element
    Array.from(document.querySelectorAll(".list-group-item.active")).forEach((el) =>
      el.classList.remove("active")
    );

    // Get the stock data
    props.listClickHandler(sticker);

    // Add class active to element
    listElement.classList.add("active");
  };

  return (
    <ul className="list-group">
      {props.stocks.map((stock: any) => {
        return (
          <li
            key={stock.sticker}
            className="list-group-item p-2"
            onClick={(e) => handleCick(e.currentTarget, stock.sticker)}
          >
            <div className="row">
              <div className="col-8">
                <h5 className="sticker">{stock.sticker}</h5>
                <small className="name">{stock.name}</small>
              </div>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <h5 className="p-red">${stock.price}</h5>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default StocksList;
