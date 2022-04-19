import React from "react";

function SortSelection(props: any) {
  return (
    <div className="w-100 h-20 d-flex flex-column my-2">
      <div className="d-flex flex-row mx-4">
        <p className="">Sort Algorithm: </p>
        {props.algorithms.map((algorithm: string) => {
          return (
            <div key={algorithm}>
              <input
                type="radio"
                className="btn-check"
                name="algorithm"
                id={algorithm}
                autoComplete="off"
                checked={props.selAlgo == algorithm ? true : false}
                onChange={() => props.changeAlgorithm(algorithm)}
              />
              <label
                className="btn btn-outline-secondary ms-3"
                htmlFor={algorithm}
              >
                {algorithm}
              </label>
            </div>
          );
        })}
      </div>

      <div className="d-flex flex-row mx-4">
        <p className="">Sorting order: </p>
        {props.sortingOrders.map((order: string) => {
          return (
            <div key={order}>
              <input
                type="radio"
                className="btn-check"
                name="orders"
                id={order}
                autoComplete="off"
                checked={props.selOrder == order ? true : false}
                onChange={() => props.changeSortingOrder(order)}
              />
              <label
                className="btn btn-outline-secondary ms-3"
                htmlFor={order}
              >
                {order}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SortSelection;
