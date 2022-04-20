import React from "react";

function Toast(props: any) {
  const time = props.timeElapsed;
  const selAlgo = props.selAlgo;
  const selOrder = props.selOrder;
  let message = "";

  if (!selAlgo) {
    message = `It took ${time} milliseconds to get the unsorted data.`;
  } else {
    message = `Using the ${
      selAlgo == "quick" ? "Quick Sort" : "Radix Sort"
    } in the ${
      selOrder == "" || selOrder == "desc" ? "descending" : "ascending"
    } order, it took ${time} milliseconds`;
  }

  return (
    <div
      className="toast m-auto mt-3 mb-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ display: "block" }}
    >
      {/* <div className="toast-header">
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            </div> */}
      <div className="toast-body text-center">{message}</div>
    </div>
  );
}

export default Toast;
