import React from "react";

function SortSelection(props: any) {
	return (
		<div className="w-100 h-20 d-flex flex-column my-2">
			<div className="d-flex flex-row mx-4 align-items-center">
				<p style={{margin: 0}}>Sorting Method: </p>
				{props.algorithms.map((algorithm: string) => {
					return (
						<div key={algorithm}>
							<input
								type="radio"
								className="btn-check"
								name="algorithm"
								id={algorithm}
								autoComplete="off"
								checked={props.selAlgo === algorithm ? true : false}
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
			<br />
			<div className="d-flex flex-row mx-4 align-items-center">
				<p style={{margin: 0}}>Sorting Order: </p>
				{props.sortingOrders.map((order: string) => {
					return (
						<div key={order}>
							<input
								type="radio"
								className="btn-check"
								name="orders"
								id={order}
								autoComplete="off"
								checked={props.selOrder === order ? true : false}
								onChange={() => props.changeSortingOrder(order)}
							/>
							<label className="btn btn-outline-secondary ms-3" htmlFor={order}>
								{order === "asc" ? "Ascending" : "Descending"}
							</label>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SortSelection;
