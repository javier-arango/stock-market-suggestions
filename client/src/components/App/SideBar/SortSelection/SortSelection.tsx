import React from "react";

function SortSelection(props: any) {
  return (
    <div className="w-100 d-flex flex-column">
      <div className="d-flex flex-row mx-4 align-items-center">
        <p style={{ margin: 0 }}>Sorting Method: </p>
        <select
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
          defaultValue=""
          onChange={(e) => props.changeAlgorithm(e.target.value)}
        >
          <option value="">Select sorting algorithm</option>
          {props.algorithms.map((algorithm: string) => (
            <option key={algorithm} value={algorithm}>
              {algorithm}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div className="d-flex flex-row mx-4 align-items-center">
        <p style={{ margin: 0 }}>Sorting Order: </p>
        <select
          className="form-select form-select-sm ms-2"
          aria-label=".form-select-sm example"
          defaultValue=""
          onChange={(e) => props.changeSortingOrder(e.target.value)}
        >
          <option value="">select sorting order</option>
          {props.sortingOrders.map((order: string) => (
            <option key={order} value={order}>
              {order === "asc" ? "Ascending" : "Descending"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SortSelection;
