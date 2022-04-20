import React, { CSSProperties } from "react";

function SortSelection({
    changeAlgorithm,
    algorithms,
    changeSortingOrder,
    sortingOrders,
}: any) {
    return (
        <div className="w-100 d-flex flex-column">
            <div className="d-flex flex-row mx-4 align-items-center">
                <p style={labelTextStyle}>Processing Method: </p>
                <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    defaultValue="radix"
                    onChange={(e) => changeAlgorithm(e.target.value)}
                >
                    {algorithms.map((algorithm: string) => (
                        <option key={algorithm} value={algorithm}>
                            {algorithm === "radix" ? "Radix Sort" : "Quick Sort"}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <div className="d-flex flex-row mx-4 align-items-center">
                <p style={labelTextStyle}>List Order: </p>
                <select
                    className="form-select form-select-sm ms-2"
                    aria-label=".form-select-sm example"
                    defaultValue=""
                    onChange={(e) => changeSortingOrder(e.target.value)}
                >
                    <option value="">select sorting order</option>
                    {sortingOrders.map((order: string) => (
                        <option key={order} value={order}>
                            {order === "asc" ? "Ascending" : "Descending"}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

const labelTextStyle: CSSProperties = {
    margin: 0,
}

export default SortSelection;
